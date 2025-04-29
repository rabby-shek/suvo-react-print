"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _client = require("react-dom/client");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // src/ReactElementPrinter.jsx
var ReactElementPrinter = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
    _ref$documentTitle = _ref.documentTitle,
    documentTitle = _ref$documentTitle === void 0 ? 'Print' : _ref$documentTitle,
    onBeforePrint = _ref.onBeforePrint,
    onAfterPrint = _ref.onAfterPrint,
    _ref$printStyles = _ref.printStyles,
    printStyles = _ref$printStyles === void 0 ? '' : _ref$printStyles;
  var contentRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    container = _useState2[0],
    setContainer = _useState2[1];
  var handlePrint = (0, _react.useCallback)(function () {
    onBeforePrint === null || onBeforePrint === void 0 || onBeforePrint();
    var printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow || !printWindow.document) {
      console.error('Print window failed to open.');
      return;
    }
    var printDoc = printWindow.document;
    var rootDiv = printDoc.createElement('div');
    rootDiv.id = 'print-root';
    printDoc.body.appendChild(rootDiv);

    // Inject styles
    var styleTag = printDoc.createElement('style');
    styleTag.type = 'text/css';
    styleTag.innerHTML = "\n        @media print {\n          * {\n            -webkit-print-color-adjust: exact !important;\n            print-color-adjust: exact !important;\n          }\n        }\n        ".concat(printStyles, "\n      ");
    printDoc.head.appendChild(styleTag);

    // Clone original styles
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach(function (node) {
      printDoc.head.appendChild(node.cloneNode(true));
    });
    var renderRoot = (0, _client.createRoot)(rootDiv);
    renderRoot.render(/*#__PURE__*/_react["default"].createElement("div", {
      ref: contentRef
    }, children));

    // Wait a tick before printing
    setTimeout(function () {
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = function () {
        printWindow.close();
        onAfterPrint === null || onAfterPrint === void 0 || onAfterPrint();
      };
    }, 500);
  }, [children, printStyles, documentTitle, onBeforePrint, onAfterPrint]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      print: handlePrint
    };
  });
  return null;
});
ReactElementPrinter.displayName = 'ReactElementPrinter';
var _default = exports["default"] = ReactElementPrinter;