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

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesColors = require('../styles/colors');

var _stylesColors2 = _interopRequireDefault(_stylesColors);

var _popoverPopover = require('../popover/popover');

var _popoverPopover2 = _interopRequireDefault(_popoverPopover);

var _svgIconsNavigationCheck = require('../svg-icons/navigation/check');

var _svgIconsNavigationCheck2 = _interopRequireDefault(_svgIconsNavigationCheck);

var _listsListItem = require('../lists/list-item');

var _listsListItem2 = _interopRequireDefault(_listsListItem);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var nestedMenuStyle = {
  position: 'relative'
};

var MenuItem = _react2['default'].createClass({
  displayName: 'MenuItem',

  mixins: [_reactAddonsPureRenderMixin2['default'], _mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    checked: _react2['default'].PropTypes.bool,
    children: _react2['default'].PropTypes.node,
    desktop: _react2['default'].PropTypes.bool,
    disabled: _react2['default'].PropTypes.bool,
    focusState: _react2['default'].PropTypes.oneOf(['none', 'focused', 'keyboard-focused']),
    innerDivStyle: _react2['default'].PropTypes.object,
    insetChildren: _react2['default'].PropTypes.bool,
    leftIcon: _react2['default'].PropTypes.element,
    menuItems: _react2['default'].PropTypes.node,
    onTouchTap: _react2['default'].PropTypes.func,
    rightIcon: _react2['default'].PropTypes.element,
    secondaryText: _react2['default'].PropTypes.node,
    style: _react2['default'].PropTypes.object,
    value: _react2['default'].PropTypes.string
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default']),
      open: false
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    if (this.state.open && nextProps.focusState === 'none') {
      this._onRequestClose();
    }
  },

  getDefaultProps: function getDefaultProps() {
    return {
      focusState: 'none'
    };
  },

  componentDidMount: function componentDidMount() {
    this._applyFocusState();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._applyFocusState();
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.state.open) {
      this.setState({
        open: false
      });
    }
  },

  render: function render() {
    var _props = this.props;
    var checked = _props.checked;
    var children = _props.children;
    var desktop = _props.desktop;
    var disabled = _props.disabled;
    var focusState = _props.focusState;
    var innerDivStyle = _props.innerDivStyle;
    var insetChildren = _props.insetChildren;
    var leftIcon = _props.leftIcon;
    var menuItems = _props.menuItems;
    var rightIcon = _props.rightIcon;
    var secondaryText = _props.secondaryText;
    var style = _props.style;
    var value = _props.value;

    var other = _objectWithoutProperties(_props, ['checked', 'children', 'desktop', 'disabled', 'focusState', 'innerDivStyle', 'insetChildren', 'leftIcon', 'menuItems', 'rightIcon', 'secondaryText', 'style', 'value']);

    var disabledColor = this.state.muiTheme.rawTheme.palette.disabledColor;
    var textColor = this.state.muiTheme.rawTheme.palette.textColor;
    var leftIndent = desktop ? 64 : 72;
    var sidePadding = desktop ? 24 : 16;

    var styles = {
      root: {
        color: disabled ? disabledColor : textColor,
        lineHeight: desktop ? '32px' : '48px',
        fontSize: desktop ? 15 : 16,
        whiteSpace: 'nowrap'
      },

      innerDivStyle: {
        paddingLeft: leftIcon || insetChildren || checked ? leftIndent : sidePadding,
        paddingRight: sidePadding,
        paddingBottom: 0,
        paddingTop: 0
      },

      secondaryText: {
        float: 'right'
      },

      leftIconDesktop: {
        padding: 0,
        left: 24,
        top: 4
      },

      rightIconDesktop: {
        padding: 0,
        right: 24,
        top: 4,
        fill: _stylesColors2['default'].grey600
      }
    };

    var mergedRootStyles = this.mergeStyles(styles.root, style);
    var mergedInnerDivStyles = this.mergeStyles(styles.innerDivStyle, innerDivStyle);

    //Left Icon
    var leftIconElement = leftIcon ? leftIcon : checked ? _react2['default'].createElement(_svgIconsNavigationCheck2['default'], null) : null;
    if (leftIconElement && desktop) {
      var mergedLeftIconStyles = this.mergeStyles(styles.leftIconDesktop, leftIconElement.props.style);
      leftIconElement = _react2['default'].cloneElement(leftIconElement, { style: mergedLeftIconStyles });
    }

    //Right Icon
    var rightIconElement = undefined;
    if (rightIcon) {
      var mergedRightIconStyles = desktop ? this.mergeStyles(styles.rightIconDesktop, rightIcon.props.style) : null;
      rightIconElement = _react2['default'].cloneElement(rightIcon, { style: mergedRightIconStyles });
    }

    //Secondary Text
    var secondaryTextElement = undefined;
    if (secondaryText) {
      var secondaryTextIsAnElement = _react2['default'].isValidElement(secondaryText);
      var mergedSecondaryTextStyles = secondaryTextIsAnElement ? this.mergeStyles(styles.secondaryText, secondaryText.props.style) : null;

      secondaryTextElement = secondaryTextIsAnElement ? _react2['default'].cloneElement(secondaryText, { style: mergedSecondaryTextStyles }) : _react2['default'].createElement(
        'div',
        { style: this.prepareStyles(styles.secondaryText) },
        secondaryText
      );
    }
    var childMenuPopover = undefined;
    if (menuItems) {
      childMenuPopover = _react2['default'].createElement(
        _popoverPopover2['default'],
        {
          anchorOrigin: { horizontal: 'right', vertical: 'top' },
          anchorEl: this.state.anchorEl,
          open: this.state.open,
          useLayerForClickAway: false,
          onRequestClose: this._onRequestClose },
        _react2['default'].createElement(
          _menu2['default'],
          { desktop: desktop, disabled: disabled, style: nestedMenuStyle },
          _react2['default'].Children.map(menuItems, this._cloneMenuItem)
        )
      );
      other.onTouchTap = this._onTouchTap;
    }

    return _react2['default'].createElement(
      _listsListItem2['default'],
      _extends({}, other, {
        disabled: disabled,
        innerDivStyle: mergedInnerDivStyles,
        insetChildren: insetChildren,
        leftIcon: leftIconElement,
        ref: 'listItem',
        rightIcon: rightIconElement,
        style: mergedRootStyles }),
      children,
      secondaryTextElement,
      childMenuPopover
    );
  },

  _applyFocusState: function _applyFocusState() {
    this.refs.listItem.applyFocusState(this.props.focusState);
  },

  _cloneMenuItem: function _cloneMenuItem(item) {
    var _this = this;

    return _react2['default'].cloneElement(item, {
      onTouchTap: function onTouchTap(event) {
        if (!item.props.menuItems) {
          _this._onRequestClose();
        }

        if (item.props.onTouchTap) {
          item.props.onTouchTap(event);
        }
      },
      onRequestClose: this._onRequestClose
    });
  },

  _onTouchTap: function _onTouchTap(event) {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: _reactDom2['default'].findDOMNode(this)
    });

    if (this.props.onTouchTap) {
      this.props.onTouchTap(event);
    }
  },

  _onRequestClose: function _onRequestClose() {
    this.setState({
      open: false,
      anchorEl: null
    });
  }
});

exports['default'] = MenuItem;
module.exports = exports['default'];