"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// src/ReactElementPrinter.jsx

var ReactElementPrinter = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
    _ref$documentTitle = _ref.documentTitle,
    documentTitle = _ref$documentTitle === void 0 ? 'Print' : _ref$documentTitle,
    onBeforePrint = _ref.onBeforePrint,
    onAfterPrint = _ref.onAfterPrint,
    _ref$printStyles = _ref.printStyles,
    printStyles = _ref$printStyles === void 0 ? '' : _ref$printStyles,
    _ref$externalStyleshe = _ref.externalStylesheets,
    externalStylesheets = _ref$externalStyleshe === void 0 ? [] : _ref$externalStyleshe;
  var contentRef = (0, _react.useRef)(null);
  var handlePrint = (0, _react.useCallback)(function () {
    onBeforePrint === null || onBeforePrint === void 0 || onBeforePrint();
    var printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow || !printWindow.document) {
      console.error('Print window failed to open.');
      return;
    }
    var printDoc = printWindow.document;

    // Set title
    printDoc.title = documentTitle;

    // Inject external stylesheets
    externalStylesheets.forEach(function (href) {
      var link = printDoc.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      printDoc.head.appendChild(link);
    });

    // Add print-specific styles
    var styleTag = printDoc.createElement('style');
    styleTag.type = 'text/css';
    styleTag.innerHTML = "\n        @media print {\n          * {\n            -webkit-print-color-adjust: exact !important;\n            print-color-adjust: exact !important;\n          }\n        }\n        ".concat(printStyles, "\n      ");
    printDoc.head.appendChild(styleTag);

    // Create root container
    var rootDiv = printDoc.createElement('div');
    printDoc.body.appendChild(rootDiv);

    // Render the content
    _reactDom["default"].render(/*#__PURE__*/_react["default"].createElement("div", {
      ref: contentRef
    }, children), rootDiv);
    setTimeout(function () {
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = function () {
        printWindow.close();
        onAfterPrint === null || onAfterPrint === void 0 || onAfterPrint();
      };
    }, 500);
  }, [children, printStyles, documentTitle, onBeforePrint, onAfterPrint, externalStylesheets]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      print: handlePrint
    };
  });
  return null;
});
ReactElementPrinter.displayName = 'ReactElementPrinter';
var _default = exports["default"] = ReactElementPrinter;