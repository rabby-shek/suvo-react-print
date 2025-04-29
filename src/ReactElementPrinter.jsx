// src/ReactElementPrinter.jsx
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { createRoot } from 'react-dom/client';

const ReactElementPrinter = forwardRef(
  (
    {
      children,
      documentTitle = 'Print',
      onBeforePrint,
      onAfterPrint,
      printStyles = '',
    },
    ref
  ) => {
    const contentRef = useRef(null);
    const [container, setContainer] = useState(null);

    const handlePrint = useCallback(() => {
      onBeforePrint?.();

      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow || !printWindow.document) {
        console.error('Print window failed to open.');
        return;
      }

      const printDoc = printWindow.document;
      const rootDiv = printDoc.createElement('div');
      rootDiv.id = 'print-root';
      printDoc.body.appendChild(rootDiv);

      // Inject styles
      const styleTag = printDoc.createElement('style');
      styleTag.type = 'text/css';
      styleTag.innerHTML = `
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        ${printStyles}
      `;
      printDoc.head.appendChild(styleTag);

      // Clone original styles
      document.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
        printDoc.head.appendChild(node.cloneNode(true));
      });

      const renderRoot = createRoot(rootDiv);
      renderRoot.render(
        <div ref={contentRef}>
          {children}
        </div>
      );

      // Wait a tick before printing
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();

        printWindow.onafterprint = () => {
          printWindow.close();
          onAfterPrint?.();
        };
      }, 500);
    }, [children, printStyles, documentTitle, onBeforePrint, onAfterPrint]);

    useImperativeHandle(ref, () => ({
      print: handlePrint,
    }));

    return null;
  }
);

ReactElementPrinter.displayName = 'ReactElementPrinter';
export default ReactElementPrinter;
