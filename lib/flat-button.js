'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsContextPure = require('./mixins/context-pure');

var _mixinsContextPure2 = _interopRequireDefault(_mixinsContextPure);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _utilsChildren = require('./utils/children');

var _utilsChildren2 = _interopRequireDefault(_utilsChildren);

var _utilsColorManipulator = require('./utils/color-manipulator');

var _utilsColorManipulator2 = _interopRequireDefault(_utilsColorManipulator);

var _utilsImmutabilityHelper = require('./utils/immutability-helper');

var _utilsImmutabilityHelper2 = _interopRequireDefault(_utilsImmutabilityHelper);

var _stylesTypography = require('./styles/typography');

var _stylesTypography2 = _interopRequireDefault(_stylesTypography);

var _enhancedButton = require('./enhanced-button');

var _enhancedButton2 = _interopRequireDefault(_enhancedButton);

var _buttonsFlatButtonLabel = require('./buttons/flat-button-label');

var _buttonsFlatButtonLabel2 = _interopRequireDefault(_buttonsFlatButtonLabel);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

function validateLabel(props, propName, componentName) {
  if (!props.children && !props.label) {
    return new Error('Required prop label or children was not ' + 'specified in ' + componentName + '.');
  }
}

var FlatButton = _react2['default'].createClass({
  displayName: 'FlatButton',

  mixins: [_mixinsContextPure2['default']],

  statics: {
    getRelevantContextKeys: function getRelevantContextKeys(muiTheme) {
      var buttonTheme = muiTheme.button;
      var flatButtonTheme = muiTheme.flatButton;

      return {
        buttonColor: flatButtonTheme.color,
        buttonHeight: buttonTheme.height,
        buttonMinWidth: buttonTheme.minWidth,
        disabledTextColor: flatButtonTheme.disabledTextColor,
        primaryTextColor: flatButtonTheme.primaryTextColor,
        secondaryTextColor: flatButtonTheme.secondaryTextColor,
        textColor: flatButtonTheme.textColor,
        textTransform: flatButtonTheme.textTransform ? flatButtonTheme.textTransform : buttonTheme.textTransform ? buttonTheme.textTransform : 'uppercase'
      };
    },
    getChildrenClasses: function getChildrenClasses() {
      return [_enhancedButton2['default'], _buttonsFlatButtonLabel2['default']];
    }
  },

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

  propTypes: {
    backgroundColor: _react2['default'].PropTypes.string,
    children: _react2['default'].PropTypes.node,
    disabled: _react2['default'].PropTypes.bool,
    hoverColor: _react2['default'].PropTypes.string,
    label: validateLabel,
    labelPosition: _react2['default'].PropTypes.oneOf(['before', 'after']),
    labelStyle: _react2['default'].PropTypes.object,
    onKeyboardFocus: _react2['default'].PropTypes.func,
    onMouseEnter: _react2['default'].PropTypes.func,
    onMouseLeave: _react2['default'].PropTypes.func,
    onTouchStart: _react2['default'].PropTypes.func,
    primary: _react2['default'].PropTypes.bool,
    rippleColor: _react2['default'].PropTypes.string,
    secondary: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      labelStyle: {},
      labelPosition: 'before', // Should be after but we keep it like for now (prevent breaking changes)
      onKeyboardFocus: function onKeyboardFocus() {},
      onMouseEnter: function onMouseEnter() {},
      onMouseLeave: function onMouseLeave() {},
      onTouchStart: function onTouchStart() {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var disabled = _props.disabled;
    var hoverColor = _props.hoverColor;
    var backgroundColor = _props.backgroundColor;
    var label = _props.label;
    var labelStyle = _props.labelStyle;
    var labelPosition = _props.labelPosition;
    var onKeyboardFocus = _props.onKeyboardFocus;
    var onMouseLeave = _props.onMouseLeave;
    var onMouseEnter = _props.onMouseEnter;
    var onTouchStart = _props.onTouchStart;
    var primary = _props.primary;
    var rippleColor = _props.rippleColor;
    var secondary = _props.secondary;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['children', 'disabled', 'hoverColor', 'backgroundColor', 'label', 'labelStyle', 'labelPosition', 'onKeyboardFocus', 'onMouseLeave', 'onMouseEnter', 'onTouchStart', 'primary', 'rippleColor', 'secondary', 'style']);

    var _constructor$getRelevantContextKeys = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    var buttonColor = _constructor$getRelevantContextKeys.buttonColor;
    var buttonHeight = _constructor$getRelevantContextKeys.buttonHeight;
    var buttonMinWidth = _constructor$getRelevantContextKeys.buttonMinWidth;
    var disabledTextColor = _constructor$getRelevantContextKeys.disabledTextColor;
    var primaryTextColor = _constructor$getRelevantContextKeys.primaryTextColor;
    var secondaryTextColor = _constructor$getRelevantContextKeys.secondaryTextColor;
    var textColor = _constructor$getRelevantContextKeys.textColor;
    var textTransform = _constructor$getRelevantContextKeys.textTransform;

    var defaultColor = disabled ? disabledTextColor : primary ? primaryTextColor : secondary ? secondaryTextColor : textColor;

    var defaultHoverColor = _utilsColorManipulator2['default'].fade(_utilsColorManipulator2['default'].lighten(defaultColor, 0.4), 0.15);
    var defaultRippleColor = _utilsColorManipulator2['default'].fade(defaultColor, 0.8);
    var buttonHoverColor = hoverColor || defaultHoverColor;
    var buttonRippleColor = rippleColor || defaultRippleColor;
    var hovered = (this.state.hovered || this.state.isKeyboardFocused) && !disabled;
    var buttonBackgroundColor = backgroundColor || buttonColor;

    var mergedRootStyles = _utilsImmutabilityHelper2['default'].merge({
      color: defaultColor,
      transition: _stylesTransitions2['default'].easeOut(),
      fontSize: _stylesTypography2['default'].fontStyleButtonFontSize,
      letterSpacing: 0,
      textTransform: textTransform,
      fontWeight: _stylesTypography2['default'].fontWeightMedium,
      borderRadius: 2,
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: hovered ? buttonHoverColor : buttonBackgroundColor,
      lineHeight: buttonHeight + 'px',
      minWidth: buttonMinWidth,
      padding: 0,
      margin: 0,
      //This is need so that ripples do not bleed past border radius.
      //See: http://stackoverflow.com/questions/17298739
      transform: 'translate3d(0, 0, 0)'
    }, style);

    var labelElement = label ? _react2['default'].createElement(_buttonsFlatButtonLabel2['default'], { label: label, style: labelStyle }) : undefined;

    // Place label before or after children.
    var childrenFragment = labelPosition === 'before' ? { labelElement: labelElement, children: children } : { children: children, labelElement: labelElement };
    var enhancedButtonChildren = _utilsChildren2['default'].create(childrenFragment);

    return _react2['default'].createElement(
      _enhancedButton2['default'],
      _extends({}, other, {
        disabled: disabled,
        focusRippleColor: buttonRippleColor,
        onKeyboardFocus: this._handleKeyboardFocus,
        onMouseLeave: this._handleMouseLeave,
        onMouseEnter: this._handleMouseEnter,
        onTouchStart: this._handleTouchStart,
        style: mergedRootStyles,
        touchRippleColor: buttonRippleColor }),
      enhancedButtonChildren
    );
  },

  _handleKeyboardFocus: function _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({ isKeyboardFocused: isKeyboardFocused });
    this.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    //Cancel hover styles for touch devices
    if (!this.state.touch) this.setState({ hovered: true });
    this.props.onMouseEnter(e);
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    this.setState({ hovered: false });
    this.props.onMouseLeave(e);
  },

  _handleTouchStart: function _handleTouchStart(e) {
    this.setState({ touch: true });
    this.props.onTouchStart(e);
  }

});

exports['default'] = FlatButton;
module.exports = exports['default'];