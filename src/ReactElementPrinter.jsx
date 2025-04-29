// src/ReactElementPrinter.jsx
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';

const ReactElementPrinter = forwardRef(
  (
    {
      children,
      documentTitle = 'Print',
      onBeforePrint,
      onAfterPrint,
      printStyles = '',
      externalStylesheets = [],
    },
    ref
  ) => {
    const contentRef = useRef(null);

    const handlePrint = useCallback(() => {
      onBeforePrint?.();

      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow || !printWindow.document) {
        console.error('Print window failed to open.');
        return;
      }

      const printDoc = printWindow.document;

      // Set title
      printDoc.title = documentTitle;

      // Inject external stylesheets
      externalStylesheets.forEach(href => {
        const link = printDoc.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        printDoc.head.appendChild(link);
      });

      // Add print-specific styles
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

      // Create root container
      const rootDiv = printDoc.createElement('div');
      printDoc.body.appendChild(rootDiv);

      // Render the content
      ReactDOM.render(
        <div ref={contentRef}>{children}</div>,
        rootDiv
      );

      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
          onAfterPrint?.();
        };
      }, 500);
    }, [children, printStyles, documentTitle, onBeforePrint, onAfterPrint, externalStylesheets]);

    useImperativeHandle(ref, () => ({
      print: handlePrint,
    }));

    return null;
  }
);

ReactElementPrinter.displayName = 'ReactElementPrinter';
export default ReactElementPrinter;
