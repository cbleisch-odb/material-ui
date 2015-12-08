'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _mixinsClickAwayable = require('./mixins/click-awayable');

var _mixinsClickAwayable2 = _interopRequireDefault(_mixinsClickAwayable);

var _fontIcon = require('./font-icon');

var _fontIcon2 = _interopRequireDefault(_fontIcon);

var _menuMenu = require('./menu/menu');

var _menuMenu2 = _interopRequireDefault(_menuMenu);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var DropDownIcon = _react2['default'].createClass({
  displayName: 'DropDownIcon',

  mixins: [_mixinsStylePropable2['default'], _mixinsClickAwayable2['default']],

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
    children: _react2['default'].PropTypes.node,
    closeOnMenuItemTouchTap: _react2['default'].PropTypes.bool,
    iconClassName: _react2['default'].PropTypes.string,
    iconLigature: _react2['default'].PropTypes.string,
    iconStyle: _react2['default'].PropTypes.object,
    menuItems: _react2['default'].PropTypes.array.isRequired,
    onChange: _react2['default'].PropTypes.func,
    style: _react2['default'].PropTypes.object
  },

  getInitialState: function getInitialState() {
    return {
      open: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getDefaultProps: function getDefaultProps() {
    return {
      closeOnMenuItemTouchTap: true
    };
  },

  componentDidMount: function componentDidMount() {
    // This component can be deprecated once ./menu/menu has been deprecated.
    // if (true) {
    //   console.warn('DropDownIcon has been deprecated. Use IconMenu instead.');
    // }
  },

  componentClickAway: function componentClickAway() {
    this.setState({ open: false });
  },

  getStyles: function getStyles() {
    var spacing = this.state.muiTheme.rawTheme.spacing;
    var iconWidth = 48;
    var styles = {
      root: {
        display: 'inline-block',
        width: iconWidth + 'px !important',
        position: 'relative',
        height: spacing.desktopToolbarHeight,
        fontSize: spacing.desktopDropDownMenuFontSize,
        cursor: 'pointer'
      },
      menu: {
        transition: _stylesTransitions2['default'].easeOut(),
        right: '-14px !important',
        top: '9px !important',
        opacity: this.state.open ? 1 : 0
      },
      menuItem: { // similair to drop down menu's menu item styles
        paddingRight: spacing.iconSize + spacing.desktopGutterLess * 2,
        height: spacing.desktopDropDownMenuItemHeight,
        lineHeight: spacing.desktopDropDownMenuItemHeight + 'px'
      }
    };
    return styles;
  },

  render: function render() {
    var _props = this.props;
    var style = _props.style;
    var children = _props.children;
    var menuItems = _props.menuItems;
    var closeOnMenuItemTouchTap = _props.closeOnMenuItemTouchTap;
    var iconStyle = _props.iconStyle;
    var iconClassName = _props.iconClassName;

    var other = _objectWithoutProperties(_props, ['style', 'children', 'menuItems', 'closeOnMenuItemTouchTap', 'iconStyle', 'iconClassName']);

    var styles = this.getStyles();

    return _react2['default'].createElement(
      'div',
      _extends({}, other, { style: this.prepareStyles(styles.root, this.props.style) }),
      _react2['default'].createElement(
        'div',
        { onTouchTap: this._onControlClick },
        _react2['default'].createElement(
          _fontIcon2['default'],
          {
            className: iconClassName,
            style: iconStyle },
          this.props.iconLigature
        ),
        this.props.children
      ),
      _react2['default'].createElement(_menuMenu2['default'], {
        ref: 'menuItems',
        style: styles.menu,
        menuItems: menuItems,
        menuItemStyle: styles.menuItem,
        hideable: true,
        visible: this.state.open,
        onItemTap: this._onMenuItemClick })
    );
  },

  _onControlClick: function _onControlClick() {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function _onMenuItemClick(e, key, payload) {
    if (this.props.onChange) this.props.onChange(e, key, payload);

    if (this.props.closeOnMenuItemTouchTap) {
      this.setState({ open: false });
    }
  }
});

exports['default'] = DropDownIcon;
module.exports = exports['default'];