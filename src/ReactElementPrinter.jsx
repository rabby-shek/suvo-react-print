

//===================
// version 3
//===================
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const ReactElementPrinter = forwardRef(({ children, documentTitle = 'Print' }, ref) => {
  const contentRef = useRef(null);

  useImperativeHandle(ref, () => ({
    print: () => {
      if (!contentRef.current) {
        console.error('No content to print');
        return;
      }

      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow) {
        console.error('Failed to open print window');
        return;
      }

      const doc = printWindow.document;
      doc.open();
      doc.write(`
        <html>
          <head>
            <title>${documentTitle}</title>
            <style>
              @media print {
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              }
            </style>
      `);

      // Copy external styles
      Array.from(document.styleSheets).forEach(styleSheet => {
        try {
          if (styleSheet.href) {
            doc.write(`<link rel="stylesheet" href="${styleSheet.href}">`);
          }
        } catch (err) {
          // Ignore cross-origin styles
        }
      });

      doc.write(`
          </head>
          <body>
            <div>${contentRef.current.innerHTML}</div>
          </body>
        </html>
      `);
      doc.close();

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      };
    }
  }));

  return <div ref={contentRef} style={{ display: 'none' }}>{children}</div>;
});

ReactElementPrinter.displayName = 'ReactElementPrinter';

export default ReactElementPrinter;
