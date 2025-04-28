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
    onAfterPrint = _ref.onAfterPrint;
  var contentRef = (0, _react.useRef)(null);
  var handlePrint = (0, _react.useCallback)(function () {
    if (!contentRef.current) {
      console.error('No content to print');
      return;
    }
    onBeforePrint === null || onBeforePrint === void 0 || onBeforePrint();
    var printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      console.error('Failed to open print window. Please allow pop-ups.');
      return;
    }
    var doc = printWindow.document;

    // Properly create HTML
    doc.open();
    doc.write('<!DOCTYPE html>');
    var html = doc.createElement('html');
    var head = doc.createElement('head');
    var body = doc.createElement('body');

    // Set title
    var title = doc.createElement('title');
    title.innerText = documentTitle;
    head.appendChild(title);

    // Copy styles
    var styleSheets = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
    styleSheets.forEach(function (styleSheet) {
      head.appendChild(styleSheet.cloneNode(true));
    });

    // Add print specific styles
    var printStyle = doc.createElement('style');
    printStyle.textContent = "\n      @media print {\n        body {\n          -webkit-print-color-adjust: exact;\n          print-color-adjust: exact;\n        }\n        .page-break {\n          page-break-after: always;\n        }\n      }\n    ";
    head.appendChild(printStyle);

    // Set content
    body.innerHTML = contentRef.current.innerHTML;
    html.appendChild(head);
    html.appendChild(body);
    doc.appendChild(html);
    doc.close();
    printWindow.focus();
    printWindow.onload = function () {
      printWindow.print();
      printWindow.onafterprint = function () {
        printWindow.close();
        onAfterPrint === null || onAfterPrint === void 0 || onAfterPrint();
      };
    };
  }, [documentTitle, onBeforePrint, onAfterPrint]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      print: handlePrint
    };
  }, [handlePrint]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: contentRef
  }, children);
});
ReactElementPrinter.displayName = 'ReactElementPrinter';
var _default = exports["default"] = ReactElementPrinter;