'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesAutoPrefix = require('../styles/auto-prefix');

var _stylesAutoPrefix2 = _interopRequireDefault(_stylesAutoPrefix);

var _stylesTransitions = require('../styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var SlideInChild = _react2['default'].createClass({
  displayName: 'SlideInChild',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  propTypes: {
    children: _react2['default'].PropTypes.node,
    direction: _react2['default'].PropTypes.string,
    enterDelay: _react2['default'].PropTypes.number,
    //This callback is needed bacause
    //the direction could change when leaving the dom
    getLeaveDirection: _react2['default'].PropTypes.func.isRequired,
    style: _react2['default'].PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      enterDelay: 0
    };
  },

  componentWillEnter: function componentWillEnter(callback) {
    var _this = this;

    var style = _reactDom2['default'].findDOMNode(this).style;
    var x = this.props.direction === 'left' ? '100%' : this.props.direction === 'right' ? '-100%' : '0';
    var y = this.props.direction === 'up' ? '100%' : this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    _stylesAutoPrefix2['default'].set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(function () {
      if (_this.isMounted()) callback();
    }, this.props.enterDelay);
  },

  componentDidEnter: function componentDidEnter() {
    var style = _reactDom2['default'].findDOMNode(this).style;
    style.opacity = '1';
    _stylesAutoPrefix2['default'].set(style, 'transform', 'translate3d(0,0,0)');
  },

  componentWillLeave: function componentWillLeave(callback) {
    var _this2 = this;

    var style = _reactDom2['default'].findDOMNode(this).style;
    var direction = this.props.getLeaveDirection();
    var x = direction === 'left' ? '-100%' : direction === 'right' ? '100%' : '0';
    var y = direction === 'up' ? '-100%' : direction === 'down' ? '100%' : '0';

    style.opacity = '0';
    _stylesAutoPrefix2['default'].set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(function () {
      if (_this2.isMounted()) callback();
    }, 450);
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var enterDelay = _props.enterDelay;
    var getLeaveDirection = _props.getLeaveDirection;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['children', 'enterDelay', 'getLeaveDirection', 'style']);

    var mergedRootStyles = this.prepareStyles({
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      transition: _stylesTransitions2['default'].easeOut(null, ['transform', 'opacity'])
    }, style);

    return _react2['default'].createElement(
      'div',
      _extends({}, other, { style: mergedRootStyles }),
      children
    );
  }

});

exports['default'] = SlideInChild;
module.exports = exports['default'];