"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ReactElementPrinter = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
    _ref$documentTitle = _ref.documentTitle,
    documentTitle = _ref$documentTitle === void 0 ? 'Print' : _ref$documentTitle,
    onBeforePrint = _ref.onBeforePrint,
    onAfterPrint = _ref.onAfterPrint,
    _ref$printStyles = _ref.printStyles,
    printStyles = _ref$printStyles === void 0 ? '' : _ref$printStyles;
  var contentRef = (0, _react.useRef)(null);
  var handlePrint = (0, _react.useCallback)(function () {
    if (!contentRef.current) {
      console.error('No content to print');
      return;
    }
    onBeforePrint === null || onBeforePrint === void 0 || onBeforePrint();
    var printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      console.error('Failed to open print window');
      return;
    }
    var doc = printWindow.document;
    doc.open();

    // Start document
    doc.write("\n        <html>\n          <head>\n            <title>".concat(documentTitle, "</title>\n            <style>\n              @media print {\n                * {\n                  -webkit-print-color-adjust: exact !important;\n                  print-color-adjust: exact !important;\n                }\n              }\n              ").concat(printStyles, "\n            </style>\n      "));

    // Add stylesheets from parent
    Array.from(document.styleSheets).forEach(function (styleSheet) {
      try {
        if (styleSheet.href) {
          doc.write("<link rel=\"stylesheet\" href=\"".concat(styleSheet.href, "\">"));
        } else if (styleSheet.cssRules) {
          var css = Array.from(styleSheet.cssRules).map(function (rule) {
            return rule.cssText;
          }).join('\n');
          doc.write("<style>".concat(css, "</style>"));
        }
      } catch (e) {
        // Ignore cross-origin issues
      }
    });

    // Close head and add body
    doc.write("\n          </head>\n          <body>\n            <div id=\"print-root\">".concat(contentRef.current.innerHTML, "</div>\n          </body>\n        </html>\n      "));
    doc.close();
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = function () {
        printWindow.close();
        onAfterPrint === null || onAfterPrint === void 0 || onAfterPrint();
      };
    };
  }, [documentTitle, printStyles, onBeforePrint, onAfterPrint]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      print: handlePrint
    };
  }, [handlePrint]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: contentRef,
    style: {
      display: 'none'
    }
  }, children);
});
ReactElementPrinter.displayName = 'ReactElementPrinter';
var _default = exports["default"] = ReactElementPrinter;