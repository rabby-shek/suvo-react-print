"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// import React, {
//   forwardRef,
//   useImperativeHandle,
//   useRef,
//   useCallback,
// } from 'react';

// const ReactElementPrinter = forwardRef(
//   (
//     {
//       children,
//       documentTitle = 'Print',
//       onBeforePrint,
//       onAfterPrint,
//       printStyles = '',
//     },
//     ref
//   ) => {
//     const contentRef = useRef(null);

//     const handlePrint = useCallback(() => {
//       if (!contentRef.current) {
//         console.error('No content to print');
//         return;
//       }

//       onBeforePrint?.();

//       const printWindow = window.open('', '_blank', 'width=800,height=600');
//       if (!printWindow) {
//         console.error('Failed to open print window');
//         return;
//       }

//       const doc = printWindow.document;
//       doc.open();

//       // Start document
//       doc.write(`
//         <html>
//           <head>
//             <title>${documentTitle}</title>
//             <style>
//               @media print {
//                 * {
//                   -webkit-print-color-adjust: exact !important;
//                   print-color-adjust: exact !important;
//                 }
//                 ${printStyles}
//               }
//             </style>
//       `);

//       // Add stylesheets from the parent document
//       Array.from(document.styleSheets).forEach((styleSheet) => {
//         try {
//           if (styleSheet.href) {
//             doc.write(`<link rel="stylesheet" href="${styleSheet.href}">`);
//           } else if (styleSheet.cssRules) {
//             const css = Array.from(styleSheet.cssRules)
//               .map(rule => rule.cssText)
//               .join('\n');
//             doc.write(`<style>${css}</style>`);
//           }
//         } catch (e) {
//           // Ignore cross-origin issues
//         }
//       });

//       // Inject inline styles for the print window
//       doc.write(`
//             </head>
//             <body>
//               <div id="print-root" style="width: 100%; padding: 10px; box-sizing: border-box;">
//                 ${contentRef.current.innerHTML}
//               </div>
//             </body>
//           </html>
//         `);

//       doc.close();

//       printWindow.onload = () => {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.onafterprint = () => {
//           printWindow.close();
//           onAfterPrint?.();
//         };
//       };
//     }, [documentTitle, printStyles, onBeforePrint, onAfterPrint]);

//     useImperativeHandle(ref, () => ({ print: handlePrint }), [handlePrint]);

//     return <div ref={contentRef} style={{ display: 'none' }}>{children}</div>;
//   }
// );

// ReactElementPrinter.displayName = 'ReactElementPrinter';
// export default ReactElementPrinter;

var ReactElementPrinter = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
    _ref$documentTitle = _ref.documentTitle,
    documentTitle = _ref$documentTitle === void 0 ? 'Print' : _ref$documentTitle;
  var contentRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      print: function print() {
        if (!contentRef.current) {
          console.error('No content to print');
          return;
        }
        var printWindow = window.open('', '_blank', 'width=800,height=600');
        if (!printWindow) {
          console.error('Failed to open print window');
          return;
        }
        var doc = printWindow.document;
        doc.open();
        doc.write("\n        <html>\n          <head>\n            <title>".concat(documentTitle, "</title>\n            <style>\n              @media print {\n                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }\n              }\n            </style>\n          </head>\n          <body>\n            <div>").concat(contentRef.current.innerHTML, "</div>\n          </body>\n        </html>\n      "));
        doc.close();
        printWindow.onload = function () {
          printWindow.focus();
          printWindow.print();
          printWindow.onafterprint = function () {
            printWindow.close();
          };
        };
      }
    };
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: contentRef,
    style: {
      display: 'none'
    }
  }, children);
});
ReactElementPrinter.displayName = 'ReactElementPrinter';
var _default = exports["default"] = ReactElementPrinter;