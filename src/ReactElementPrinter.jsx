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

      let styles = '';

      Array.from(document.styleSheets).forEach((styleSheet) => {
        try {
          if (styleSheet.href) {
            // External stylesheets (like Bootstrap, Tailwind, etc.)
            styles += `<link rel="stylesheet" href="${styleSheet.href}" />`;
          } else if (styleSheet.cssRules) {
            // Inline stylesheets
            const css = Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join(' ');
            styles += `<style>${css}</style>`;
          }
        } catch (e) {
          console.warn('Error accessing stylesheet:', e);
        }
      });

      doc.write(`
        <html>
          <head>
            <title>${documentTitle}</title>
            ${styles}
            <style>
              @media print {
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              }
            </style>
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
