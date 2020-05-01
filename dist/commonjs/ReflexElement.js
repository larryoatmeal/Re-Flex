"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ReflexHandle = _interopRequireDefault(require("./ReflexHandle"));

var _utilities = require("./utilities");

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _reactMeasure = _interopRequireDefault(require("react-measure"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SizeAwareReflexElement = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(SizeAwareReflexElement, _React$Component);

  var _super = _createSuper(SizeAwareReflexElement);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function SizeAwareReflexElement(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SizeAwareReflexElement);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onResize", function (rect) {
      var _this$props = _this.props,
          resizeHeight = _this$props.resizeHeight,
          resizeWidth = _this$props.resizeWidth;
      var height = Math.floor(rect.bounds.height);
      var width = Math.floor(rect.bounds.width);

      _this.setDimensions((0, _objectSpread2.default)({}, resizeHeight && {
        height: height
      }, resizeWidth && {
        width: width
      }));
    });
    _this.setDimensions = (0, _lodash.default)(function (dimensions) {
      _this.setState(dimensions);
    }, _this.props.propagateDimensionsRate / 1000);
    _this.state = {
      height: "100%",
      width: "100%"
    };
    return _this;
  } /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  (0, _createClass2.default)(SizeAwareReflexElement, [{
    key: "renderChildren",
    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////
    value: function renderChildren() {
      var _this2 = this;

      var propagateDimensions = this.props.propagateDimensions;
      return _react.default.Children.map(this.props.children, function (child) {
        if (_this2.props.withHandle || _ReflexHandle.default.isA(child)) {
          return _react.default.cloneElement(child, (0, _objectSpread2.default)({
            dimensions: propagateDimensions && _this2.state
          }, child.props, {
            index: _this2.props.index - 1,
            events: _this2.props.events
          }));
        }

        if (propagateDimensions) {
          return _react.default.cloneElement(child, (0, _objectSpread2.default)({}, child.props, {
            dimensions: _this2.state
          }));
        }

        return child;
      });
    } /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/_react.default.createElement(_reactMeasure.default, {
        bounds: true,
        onResize: this.onResize
      }, function (_ref) {
        var measureRef = _ref.measureRef;
        return /*#__PURE__*/_react.default.createElement("div", {
          ref: measureRef,
          className: "reflex-size-aware"
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: _this3.state
        }, _this3.renderChildren()));
      });
    }
  }]);
  return SizeAwareReflexElement;
}(_react.default.Component);

var ReflexElement = /*#__PURE__*/function (_React$Component2) {
  (0, _inherits2.default)(ReflexElement, _React$Component2);

  var _super2 = _createSuper(ReflexElement);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexElement(props) {
    var _this4;

    (0, _classCallCheck2.default)(this, ReflexElement);
    _this4 = _super2.call(this, props);
    _this4.state = {
      size: props.size
    };
    return _this4;
  } /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////


  (0, _createClass2.default)(ReflexElement, [{
    key: "componentDidUpdate",
    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////
    value: function () {
      var _componentDidUpdate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(prevProps, prevState, snapshot) {
        var directions, _iterator, _step, direction;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(prevState.size !== this.state.size)) {
                  _context.next = 19;
                  break;
                }

                directions = this.toArray(this.props.direction);
                _iterator = _createForOfIteratorHelper(directions);
                _context.prev = 3;

                _iterator.s();

              case 5:
                if ((_step = _iterator.n()).done) {
                  _context.next = 11;
                  break;
                }

                direction = _step.value;
                _context.next = 9;
                return this.props.events.emit('element.size', {
                  index: this.props.index,
                  size: this.props.size,
                  direction: direction
                });

              case 9:
                _context.next = 5;
                break;

              case 11:
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](3);

                _iterator.e(_context.t0);

              case 16:
                _context.prev = 16;

                _iterator.f();

                return _context.finish(16);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 13, 16, 19]]);
      }));

      function componentDidUpdate(_x, _x2, _x3) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }() /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "toArray",
    value: function toArray(obj) {
      return obj ? Array.isArray(obj) ? obj : [obj] : [];
    } /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var _this5 = this;

      return _react.default.Children.map(this.props.children, function (child) {
        if (_this5.props.withHandle || _ReflexHandle.default.isA(child)) {
          return _react.default.cloneElement(child, (0, _objectSpread2.default)({}, child.props, {
            index: _this5.props.index - 1,
            events: _this5.props.events
          }));
        }

        return child;
      });
    } /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: "render",
    value: function render() {
      var className = [].concat((0, _toConsumableArray2.default)(this.props.className.split(' ')), [this.props.orientation, 'reflex-element']).join(' ').trim();
      var style = (0, _objectSpread2.default)({}, this.props.style, {
        flex: this.props.flex
      });
      return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({}, (0, _utilities.getDataProps)(this.props), {
        className: className,
        style: style
      }), this.props.propagateDimensions ? /*#__PURE__*/_react.default.createElement(SizeAwareReflexElement, this.props) : this.renderChildren());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.size !== prevState.size) {
        return (0, _objectSpread2.default)({}, prevState, {
          size: nextProps.size
        });
      }

      return null;
    }
  }]);
  return ReflexElement;
}(_react.default.Component);

exports.default = ReflexElement;
(0, _defineProperty2.default)(ReflexElement, "propTypes", {
  renderOnResizeRate: _propTypes.default.number,
  propagateDimensions: _propTypes.default.bool,
  resizeHeight: _propTypes.default.bool,
  resizeWidth: _propTypes.default.bool,
  className: _propTypes.default.string,
  size: _propTypes.default.number
});
(0, _defineProperty2.default)(ReflexElement, "defaultProps", {
  propagateDimensionsRate: 100,
  propagateDimensions: false,
  resizeHeight: true,
  resizeWidth: true,
  direction: [1],
  className: ''
});