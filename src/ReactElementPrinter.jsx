// import React, { useRef, forwardRef, useImperativeHandle, useCallback } from 'react';

// const ReactElementPrinter = forwardRef(({
//   children,
//   documentTitle = 'Print',
//   onBeforePrint,
//   onAfterPrint,
// }, ref) => {
//   const contentRef = useRef(null);

//   const handlePrint = useCallback(() => {
//     if (!contentRef.current) {
//       console.error('No content to print');
//       return;
//     }

//     onBeforePrint?.();

//     const printWindow = window.open('', '_blank', 'width=800,height=600');
//     if (!printWindow) {
//       console.error('Failed to open print window. Please allow pop-ups.');
//       return;
//     }

//     const doc = printWindow.document;

//     // Properly create HTML
//     doc.open();
//     doc.write('<!DOCTYPE html>');
//     const html = doc.createElement('html');
//     const head = doc.createElement('head');
//     const body = doc.createElement('body');

//     // Set title
//     const title = doc.createElement('title');
//     title.innerText = documentTitle;
//     head.appendChild(title);

//     // Copy styles
//     const styleSheets = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
//     styleSheets.forEach((styleSheet) => {
//       head.appendChild(styleSheet.cloneNode(true));
//     });

//     // Add print specific styles
//     const printStyle = doc.createElement('style');
//     printStyle.textContent = `
//       @media print {
//         body {
//           -webkit-print-color-adjust: exact;
//           print-color-adjust: exact;
//         }
//         .page-break {
//           page-break-after: always;
//         }
//       }
//     `;
//     head.appendChild(printStyle);

//     // Set content
//     body.innerHTML = contentRef.current.innerHTML;

//     html.appendChild(head);
//     html.appendChild(body);
//     doc.appendChild(html);
//     doc.close();

//     printWindow.focus();
//     printWindow.onload = () => {
//       printWindow.print();
//       printWindow.onafterprint = () => {
//         printWindow.close();
//         onAfterPrint?.();
//       };
//     };
//   }, [documentTitle, onBeforePrint, onAfterPrint]);

//   useImperativeHandle(ref, () => ({ print: handlePrint }), [handlePrint]);

//   return <div ref={contentRef}>{children}</div>;
// });

// ReactElementPrinter.displayName = 'ReactElementPrinter';

// export default ReactElementPrinter;
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
      printStyles = '', // string or array of style strings
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

      // Copy existing styles
      const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
      styles.forEach((node) => {
        const clone = node.cloneNode(true);
        doc.head.appendChild(clone);
      });

      // Add default print styles
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

      // Add custom styles from props
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

    return <div ref={contentRef}>{children}</div>;
  }
);

ReactElementPrinter.displayName = 'ReactElementPrinter';
export default ReactElementPrinter;


