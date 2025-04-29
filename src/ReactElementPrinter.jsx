import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react';

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

    const handlePrint = useCallback(() => {
      if (!contentRef.current) {
        console.error('No content to print');
        return;
      }

      onBeforePrint?.();

      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow) {
        console.error('Failed to open print window');
        return;
      }

      const doc = printWindow.document;
      doc.open();

      // Start building the document
      doc.write(`
        <html>
          <head>
            <title>${documentTitle}</title>
            <style>
              @media print {
                * {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
              }

              ${printStyles}
            </style>
      `);

      // Try to include parent styles
      Array.from(document.styleSheets).forEach((styleSheet) => {
        try {
          if (styleSheet.href) {
            doc.write(`<link rel="stylesheet" href="${styleSheet.href}">`);
          } else if (styleSheet.cssRules) {
            const css = Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n');
            doc.write(`<style>${css}</style>`);
          }
        } catch (e) {
          // Ignore cross-origin errors
        }
      });

      doc.write(`
          </head>
          <body>
            <div id="print-root">${contentRef.current.innerHTML}</div>
          </body>
        </html>
      `);

      doc.close();

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
          onAfterPrint?.();
        };
      };
    }, [documentTitle, printStyles, onBeforePrint, onAfterPrint]);

    useImperativeHandle(ref, () => ({ print: handlePrint }), [handlePrint]);

    return <div ref={contentRef} style={{ display: 'none' }}>{children}</div>;
  }
);

ReactElementPrinter.displayName = 'ReactElementPrinter';
export default ReactElementPrinter;
