import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';

const ReactElementPrinter = forwardRef(
  (
    {
      children,
      documentTitle = 'Print',
      onBeforePrint,
      onAfterPrint,
      printStyles = '', // Optional custom styles
    },
    ref
  ) => {
    const contentRef = useRef(null);

    const handlePrint = useCallback(() => {
      if (!contentRef.current) {
        console.error('No content to print');
        return;
      }

      onBeforePrint?.();

      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow) {
        console.error('Failed to open print window. Please allow pop-ups.');
        return;
      }

      const doc = printWindow.document;

      doc.open();
      doc.write('<!DOCTYPE html><html><head><title>' + documentTitle + '</title>');

      // Copy all current styles
      const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
      styles.forEach((node) => {
        const clone = node.cloneNode(true);
        doc.head.appendChild(clone);
      });

      // Add built-in print styles
      doc.write(`
        <style>
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .page-break {
              page-break-after: always;
            }
          }
        </style>
      `);

      // Add custom styles
      if (printStyles) {
        const allStyles = Array.isArray(printStyles) ? printStyles.join('\n') : printStyles;
        doc.write(`<style>${allStyles}</style>`);
      }

      doc.write('</head><body>');
      doc.write(contentRef.current.innerHTML);
      doc.write('</body></html>');
      doc.close();

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
          onAfterPrint?.();
        };
      };
    }, [documentTitle, onBeforePrint, onAfterPrint, printStyles]);

    useImperativeHandle(ref, () => ({ print: handlePrint }), [handlePrint]);

    return <div ref={contentRef} style={{ display: 'none' }}>{children}</div>; // hide from normal UI
  }
);

ReactElementPrinter.displayName = 'ReactElementPrinter';
export default ReactElementPrinter;
