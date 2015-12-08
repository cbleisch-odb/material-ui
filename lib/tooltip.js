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

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _stylesColors = require('./styles/colors');

var _stylesColors2 = _interopRequireDefault(_stylesColors);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var Tooltip = _react2['default'].createClass({
  displayName: 'Tooltip',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    className: _react2['default'].PropTypes.string,
    horizontalPosition: _react2['default'].PropTypes.oneOf(['left', 'right', 'center']),
    label: _react2['default'].PropTypes.node.isRequired,
    show: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    touch: _react2['default'].PropTypes.bool,
    verticalPosition: _react2['default'].PropTypes.oneOf(['top', 'bottom'])
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

  componentDidMount: function componentDidMount() {
    this._setRippleSize();
    this._setTooltipPosition();
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    this._setTooltipPosition();

    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  componentDidUpdate: function componentDidUpdate() {
    this._setRippleSize();
  },

  getInitialState: function getInitialState() {
    return {
      offsetWidth: null,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  getStyles: function getStyles() {
    var verticalPosition = this.props.verticalPosition;
    var horizontalPosition = this.props.horizontalPosition;
    var touchMarginOffset = this.props.touch ? 10 : 0;
    var touchOffsetTop = this.props.touch ? -20 : -10;
    var offset = verticalPosition === 'bottom' ? 14 + touchMarginOffset : -14 - touchMarginOffset;

    var styles = {
      root: {
        position: 'absolute',
        fontFamily: this.state.muiTheme.rawTheme.fontFamily,
        fontSize: '10px',
        lineHeight: '22px',
        padding: '0 8px',
        color: _stylesColors2['default'].white,
        overflow: 'hidden',
        top: -10000,
        borderRadius: 2,
        userSelect: 'none',
        opacity: 0,
        right: horizontalPosition === 'left' ? 12 : null,
        left: horizontalPosition === 'center' ? (this.state.offsetWidth - 48) / 2 * -1 : null,
        transition: _stylesTransitions2['default'].easeOut('0ms', 'top', '450ms') + ',' + _stylesTransitions2['default'].easeOut('450ms', 'transform', '0ms') + ',' + _stylesTransitions2['default'].easeOut('450ms', 'opacity', '0ms')
      },
      label: {
        position: 'relative',
        whiteSpace: 'nowrap'
      },
      ripple: {
        position: 'absolute',
        left: horizontalPosition === 'center' ? '50%' : horizontalPosition === 'left' ? '100%' : '0%',
        top: verticalPosition === 'bottom' ? 0 : '100%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        transition: _stylesTransitions2['default'].easeOut('0ms', 'width', '450ms') + ',' + _stylesTransitions2['default'].easeOut('0ms', 'height', '450ms') + ',' + _stylesTransitions2['default'].easeOut('450ms', 'backgroundColor', '0ms')
      },
      rootWhenShown: {
        top: verticalPosition === 'top' ? touchOffsetTop : 36,
        opacity: 0.9,
        transform: 'translate3d(0px, ' + offset + 'px, 0px)',
        transition: _stylesTransitions2['default'].easeOut('0ms', 'top', '0ms') + ',' + _stylesTransitions2['default'].easeOut('450ms', 'transform', '0ms') + ',' + _stylesTransitions2['default'].easeOut('450ms', 'opacity', '0ms')
      },
      rootWhenTouched: {
        fontSize: '14px',
        lineHeight: '32px',
        padding: '0 16px'
      },
      rippleWhenShown: {
        backgroundColor: _stylesColors2['default'].grey700,
        transition: _stylesTransitions2['default'].easeOut('450ms', 'width', '0ms') + ',' + _stylesTransitions2['default'].easeOut('450ms', 'height', '0ms') + ',' + _stylesTransitions2['default'].easeOut('450ms', 'backgroundColor', '0ms')
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var label = _props.label;

    var other = _objectWithoutProperties(_props, ['label']);

    var styles = this.getStyles();
    return _react2['default'].createElement(
      'div',
      _extends({}, other, {
        style: this.prepareStyles(styles.root, this.props.show && styles.rootWhenShown, this.props.touch && styles.rootWhenTouched, this.props.style) }),
      _react2['default'].createElement('div', {
        ref: 'ripple',
        style: this.prepareStyles(styles.ripple, this.props.show && styles.rippleWhenShown) }),
      _react2['default'].createElement(
        'span',
        { style: this.prepareStyles(styles.label) },
        this.props.label
      )
    );
  },

  _setRippleSize: function _setRippleSize() {
    var ripple = _reactDom2['default'].findDOMNode(this.refs.ripple);
    var tooltip = window.getComputedStyle(_reactDom2['default'].findDOMNode(this));
    var tooltipWidth = parseInt(tooltip.getPropertyValue('width'), 10) / (this.props.horizontalPosition === 'center' ? 2 : 1);
    var tooltipHeight = parseInt(tooltip.getPropertyValue('height'), 10);

    var rippleDiameter = Math.ceil(Math.sqrt(Math.pow(tooltipHeight, 2) + Math.pow(tooltipWidth, 2)) * 2);
    if (this.props.show) {
      ripple.style.height = rippleDiameter + 'px';
      ripple.style.width = rippleDiameter + 'px';
    } else {
      ripple.style.width = '0px';
      ripple.style.height = '0px';
    }
  },

  _setTooltipPosition: function _setTooltipPosition() {
    var tooltip = _reactDom2['default'].findDOMNode(this);
    this.setState({ offsetWidth: tooltip.offsetWidth });
  }

});

exports['default'] = Tooltip;
module.exports = exports['default'];