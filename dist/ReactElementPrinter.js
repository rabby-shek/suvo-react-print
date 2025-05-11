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
        var styles = '';
        Array.from(document.styleSheets).forEach(function (styleSheet) {
          try {
            if (styleSheet.href) {
              // External stylesheets (like Bootstrap, Tailwind, etc.)
              styles += "<link rel=\"stylesheet\" href=\"".concat(styleSheet.href, "\" />");
            } else if (styleSheet.cssRules) {
              // Inline stylesheets
              var css = Array.from(styleSheet.cssRules).map(function (rule) {
                return rule.cssText;
              }).join(' ');
              styles += "<style>".concat(css, "</style>");
            }
          } catch (e) {
            console.warn('Error accessing stylesheet:', e);
          }
        });
        doc.write("\n        <html>\n          <head>\n            <title>".concat(documentTitle, "</title>\n            ").concat(styles, "\n            <style>\n              @media print {\n                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }\n              }\n            </style>\n          </head>\n          <body>\n            <div>").concat(contentRef.current.innerHTML, "</div>\n          </body>\n        </html>\n      "));
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