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

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _mixinsControllable = require('../mixins/controllable');

var _mixinsControllable2 = _interopRequireDefault(_mixinsControllable);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _mixinsClickAwayable = require('../mixins/click-awayable');

var _mixinsClickAwayable2 = _interopRequireDefault(_mixinsClickAwayable);

var _stylesAutoPrefix = require('../styles/auto-prefix');

var _stylesAutoPrefix2 = _interopRequireDefault(_stylesAutoPrefix);

var _stylesTransitions = require('../styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _utilsKeyCode = require('../utils/key-code');

var _utilsKeyCode2 = _interopRequireDefault(_utilsKeyCode);

var _utilsPropTypes = require('../utils/prop-types');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var _listsList = require('../lists/list');

var _listsList2 = _interopRequireDefault(_listsList);

var _paper = require('../paper');

var _paper2 = _interopRequireDefault(_paper);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var Menu = _react2['default'].createClass({
  displayName: 'Menu',

  mixins: [_mixinsStylePropable2['default'], _mixinsControllable2['default'], _mixinsClickAwayable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    animated: _react2['default'].PropTypes.bool,
    autoWidth: _react2['default'].PropTypes.bool,
    children: _react2['default'].PropTypes.node,
    desktop: _react2['default'].PropTypes.bool,
    initiallyKeyboardFocused: _react2['default'].PropTypes.bool,
    listStyle: _react2['default'].PropTypes.object,
    maxHeight: _react2['default'].PropTypes.number,
    multiple: _react2['default'].PropTypes.bool,
    onEscKeyDown: _react2['default'].PropTypes.func,
    onItemTouchTap: _react2['default'].PropTypes.func,
    onKeyDown: _react2['default'].PropTypes.func,
    openDirection: _utilsPropTypes2['default'].corners,
    selectedMenuItemStyle: _react2['default'].PropTypes.object,
    style: _react2['default'].PropTypes.object,
    value: _react2['default'].PropTypes.any,
    valueLink: _react2['default'].PropTypes.object,
    width: _utilsPropTypes2['default'].stringOrNumber,
    zDepth: _utilsPropTypes2['default'].zDepth
  },

  getDefaultProps: function getDefaultProps() {
    return {
      animated: false,
      autoWidth: true,
      maxHeight: null,
      onEscKeyDown: function onEscKeyDown() {},
      onItemTouchTap: function onItemTouchTap() {},
      onKeyDown: function onKeyDown() {},
      openDirection: 'bottom-left',
      zDepth: 1
    };
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
    var selectedIndex = this._getSelectedIndex(this.props);

    return {
      focusIndex: selectedIndex >= 0 ? selectedIndex : 0,
      isKeyboardFocused: this.props.initiallyKeyboardFocused,
      keyWidth: this.props.desktop ? 64 : 56,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  componentDidEnter: function componentDidEnter() {
    this._animateOpen();
  },

  componentDidMount: function componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
    if (!this.props.animated) this._animateOpen();
    this._setScollPosition();
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.autoWidth) this._setWidth();
  },

  componentWillLeave: function componentWillLeave(callback) {
    var _this = this;

    var rootStyle = _reactDom2['default'].findDOMNode(this).style;
    rootStyle.transition = _stylesTransitions2['default'].easeOut('250ms', ['opacity', 'transform']);
    rootStyle.transform = 'translate3d(0,-8px,0)';
    rootStyle.opacity = 0;
    rootStyle = _stylesAutoPrefix2['default'].all(rootStyle);
    setTimeout(function () {
      if (_this.isMounted()) callback();
    }, 250);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var selectedIndex = this._getSelectedIndex(nextProps);
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;

    this.setState({
      focusIndex: selectedIndex >= 0 ? selectedIndex : 0,
      keyWidth: nextProps.desktop ? 64 : 56,
      muiTheme: newMuiTheme
    });
  },

  componentClickAway: function componentClickAway(e) {
    if (e.defaultPrevented) return;
    this._setFocusIndex(-1, false);
  },

  render: function render() {
    var _this2 = this;

    var _props = this.props;
    var animated = _props.animated;
    var autoWidth = _props.autoWidth;
    var children = _props.children;
    var desktop = _props.desktop;
    var initiallyKeyboardFocused = _props.initiallyKeyboardFocused;
    var listStyle = _props.listStyle;
    var maxHeight = _props.maxHeight;
    var multiple = _props.multiple;
    var openDirection = _props.openDirection;
    var selectedMenuItemStyle = _props.selectedMenuItemStyle;
    var style = _props.style;
    var value = _props.value;
    var valueLink = _props.valueLink;
    var width = _props.width;
    var zDepth = _props.zDepth;

    var other = _objectWithoutProperties(_props, ['animated', 'autoWidth', 'children', 'desktop', 'initiallyKeyboardFocused', 'listStyle', 'maxHeight', 'multiple', 'openDirection', 'selectedMenuItemStyle', 'style', 'value', 'valueLink', 'width', 'zDepth']);

    var openDown = openDirection.split('-')[0] === 'bottom';
    var openLeft = openDirection.split('-')[1] === 'left';

    var styles = {
      root: {
        //Nested div bacause the List scales x faster than
        //it scales y
        transition: animated ? _stylesTransitions2['default'].easeOut('250ms', 'transform') : null,
        position: 'absolute',
        zIndex: 10,
        top: openDown ? 0 : null,
        bottom: !openDown ? 0 : null,
        left: !openLeft ? 0 : null,
        right: openLeft ? 0 : null,
        transform: 'scaleX(0)',
        transformOrigin: openLeft ? 'right' : 'left'
      },

      list: {
        display: 'table-cell',
        paddingBottom: desktop ? 16 : 8,
        paddingTop: desktop ? 16 : 8,
        userSelect: 'none',
        width: width
      },

      menuItemContainer: {
        transition: animated ? _stylesTransitions2['default'].easeOut(null, 'opacity') : null,
        opacity: 0
      },

      paper: {
        transition: animated ? _stylesTransitions2['default'].easeOut('500ms', ['transform', 'opacity']) : null,
        transform: 'scaleY(0)',
        transformOrigin: openDown ? 'top' : 'bottom',
        opacity: 0,
        maxHeight: maxHeight,
        overflowY: maxHeight ? 'scroll' : null
      },

      selectedMenuItem: {
        color: this.state.muiTheme.rawTheme.palette.accent1Color
      }
    };

    var mergedRootStyles = this.prepareStyles(styles.root, style);
    var mergedListStyles = this.mergeStyles(styles.list, listStyle);

    //Cascade children opacity
    var cumulativeDelay = openDown ? 175 : 325;
    var cascadeChildrenCount = this._getCascadeChildrenCount();
    var cumulativeDelayIncrement = Math.ceil(150 / cascadeChildrenCount);

    var menuItemIndex = 0;
    var newChildren = _react2['default'].Children.map(children, function (child) {

      var childIsADivider = child.type && child.type.displayName === 'MenuDivider';
      var childIsDisabled = child.props.disabled;
      var childrenContainerStyles = {};

      if (animated) {
        var focusIndex = _this2.state.focusIndex;
        var transitionDelay = 0;

        //Only cascade the visible menu items
        if (menuItemIndex >= focusIndex - 1 && menuItemIndex <= focusIndex + cascadeChildrenCount - 1) {
          cumulativeDelay = openDown ? cumulativeDelay + cumulativeDelayIncrement : cumulativeDelay - cumulativeDelayIncrement;
          transitionDelay = cumulativeDelay;
        }

        childrenContainerStyles = _this2.prepareStyles(styles.menuItemContainer, {
          transitionDelay: transitionDelay + 'ms'
        });
      }

      var clonedChild = childIsADivider ? child : childIsDisabled ? _react2['default'].cloneElement(child, { desktop: desktop }) : _this2._cloneMenuItem(child, menuItemIndex, styles);

      if (!childIsADivider && !childIsDisabled) menuItemIndex++;

      return animated ? _react2['default'].createElement(
        'div',
        { style: childrenContainerStyles },
        clonedChild
      ) : clonedChild;
    });

    return _react2['default'].createElement(
      'div',
      {
        onKeyDown: this._handleKeyDown,
        style: mergedRootStyles },
      _react2['default'].createElement(
        _paper2['default'],
        {
          ref: 'scrollContainer',
          style: styles.paper,
          zDepth: zDepth },
        _react2['default'].createElement(
          _listsList2['default'],
          _extends({}, other, {
            ref: 'list',
            style: mergedListStyles }),
          newChildren
        )
      )
    );
  },

  setKeyboardFocused: function setKeyboardFocused(keyboardFocused) {
    this.setState({
      isKeyboardFocused: keyboardFocused
    });
  },

  _animateOpen: function _animateOpen() {
    var rootStyle = _reactDom2['default'].findDOMNode(this).style;
    var scrollContainerStyle = _reactDom2['default'].findDOMNode(this.refs.scrollContainer).style;
    var menuContainers = _reactDom2['default'].findDOMNode(this.refs.list).childNodes;

    _stylesAutoPrefix2['default'].set(rootStyle, 'transform', 'scaleX(1)');
    _stylesAutoPrefix2['default'].set(scrollContainerStyle, 'transform', 'scaleY(1)');
    scrollContainerStyle.opacity = 1;

    for (var i = 0; i < menuContainers.length; ++i) {
      menuContainers[i].style.opacity = 1;
    }
  },

  _cloneMenuItem: function _cloneMenuItem(child, childIndex, styles) {
    var _this3 = this;

    var _props2 = this.props;
    var desktop = _props2.desktop;
    var selectedMenuItemStyle = _props2.selectedMenuItemStyle;

    var selected = this._isChildSelected(child, this.props);
    var selectedChildrenStyles = {};

    if (selected) {
      selectedChildrenStyles = this.mergeStyles(styles.selectedMenuItem, selectedMenuItemStyle);
    }

    var mergedChildrenStyles = this.mergeStyles(child.props.style || {}, selectedChildrenStyles);

    var isFocused = childIndex === this.state.focusIndex;
    var focusState = 'none';
    if (isFocused) {
      focusState = this.state.isKeyboardFocused ? 'keyboard-focused' : 'focused';
    }

    return _react2['default'].cloneElement(child, {
      desktop: desktop,
      focusState: focusState,
      onTouchTap: function onTouchTap(e) {
        _this3._handleMenuItemTouchTap(e, child);
        if (child.props.onTouchTap) child.props.onTouchTap(e);
      },
      ref: isFocused ? 'focusedMenuItem' : null,
      style: mergedChildrenStyles
    });
  },

  _decrementKeyboardFocusIndex: function _decrementKeyboardFocusIndex() {
    var index = this.state.focusIndex;

    index--;
    if (index < 0) index = 0;

    this._setFocusIndex(index, true);
  },

  _getCascadeChildrenCount: function _getCascadeChildrenCount() {
    var _props3 = this.props;
    var children = _props3.children;
    var desktop = _props3.desktop;
    var maxHeight = _props3.maxHeight;

    var count = 1;
    var currentHeight = desktop ? 16 : 8;
    var menuItemHeight = desktop ? 32 : 48;

    //MaxHeight isn't set - cascade all of the children
    if (!maxHeight) return _react2['default'].Children.count(children);

    //Count all the children that will fit inside the
    //max menu height
    _react2['default'].Children.forEach(children, function (child) {
      if (currentHeight < maxHeight) {
        var childIsADivider = child.type && child.type.displayName === 'MenuDivider';

        currentHeight += childIsADivider ? 16 : menuItemHeight;
        count++;
      }
    });

    return count;
  },

  _getMenuItemCount: function _getMenuItemCount() {
    var menuItemCount = 0;
    _react2['default'].Children.forEach(this.props.children, function (child) {
      var childIsADivider = child.type && child.type.displayName === 'MenuDivider';
      var childIsDisabled = child.props.disabled;
      if (!childIsADivider && !childIsDisabled) menuItemCount++;
    });
    return menuItemCount;
  },

  _getSelectedIndex: function _getSelectedIndex(props) {
    var _this4 = this;

    var children = props.children;

    var selectedIndex = -1;
    var menuItemIndex = 0;

    _react2['default'].Children.forEach(children, function (child) {
      var childIsADivider = child.type && child.type.displayName === 'MenuDivider';

      if (_this4._isChildSelected(child, props)) selectedIndex = menuItemIndex;
      if (!childIsADivider) menuItemIndex++;
    });

    return selectedIndex;
  },

  _handleKeyDown: function _handleKeyDown(e) {
    switch (e.keyCode) {
      case _utilsKeyCode2['default'].DOWN:
        e.preventDefault();
        this._incrementKeyboardFocusIndex();
        break;
      case _utilsKeyCode2['default'].ESC:
        this.props.onEscKeyDown(e);
        break;
      case _utilsKeyCode2['default'].TAB:
        e.preventDefault();
        if (e.shiftKey) {
          this._decrementKeyboardFocusIndex();
        } else {
          this._incrementKeyboardFocusIndex();
        }
        break;
      case _utilsKeyCode2['default'].UP:
        e.preventDefault();
        this._decrementKeyboardFocusIndex();
        break;
    }
    this.props.onKeyDown(e);
  },

  _handleMenuItemTouchTap: function _handleMenuItemTouchTap(e, item) {
    var multiple = this.props.multiple;
    var valueLink = this.getValueLink(this.props);
    var menuValue = valueLink.value;
    var itemValue = item.props.value;
    var focusIndex = this.props.children.indexOf(item);

    this._setFocusIndex(focusIndex, false);

    if (multiple) {
      var index = menuValue.indexOf(itemValue);
      var newMenuValue = index === -1 ? (0, _reactAddonsUpdate2['default'])(menuValue, { $push: [itemValue] }) : (0, _reactAddonsUpdate2['default'])(menuValue, { $splice: [[index, 1]] });

      valueLink.requestChange(e, newMenuValue);
    } else if (!multiple && itemValue !== menuValue) {
      valueLink.requestChange(e, itemValue);
    }

    this.props.onItemTouchTap(e, item);
  },

  _incrementKeyboardFocusIndex: function _incrementKeyboardFocusIndex() {
    var index = this.state.focusIndex;
    var maxIndex = this._getMenuItemCount() - 1;

    index++;
    if (index > maxIndex) index = maxIndex;

    this._setFocusIndex(index, true);
  },

  _isChildSelected: function _isChildSelected(child, props) {
    var multiple = props.multiple;
    var menuValue = this.getValueLink(props).value;
    var childValue = child.props.value;

    return multiple && menuValue.length && menuValue.indexOf(childValue) !== -1 || !multiple && menuValue && menuValue === childValue;
  },

  _setFocusIndex: function _setFocusIndex(newIndex, isKeyboardFocused) {
    this.setState({
      focusIndex: newIndex,
      isKeyboardFocused: isKeyboardFocused
    });
  },

  _setScollPosition: function _setScollPosition() {
    var desktop = this.props.desktop;
    var focusedMenuItem = this.refs.focusedMenuItem;
    var menuItemHeight = desktop ? 32 : 48;

    if (focusedMenuItem) {
      var selectedOffSet = _reactDom2['default'].findDOMNode(focusedMenuItem).offsetTop;

      //Make the focused item be the 2nd item in the list the
      //user sees
      var scrollTop = selectedOffSet - menuItemHeight;
      if (scrollTop < menuItemHeight) scrollTop = 0;

      _reactDom2['default'].findDOMNode(this.refs.scrollContainer).scrollTop = scrollTop;
    }
  },

  _setWidth: function _setWidth() {
    var el = _reactDom2['default'].findDOMNode(this);
    var listEl = _reactDom2['default'].findDOMNode(this.refs.list);
    var elWidth = el.offsetWidth;
    var keyWidth = this.state.keyWidth;
    var minWidth = keyWidth * 1.5;
    var keyIncrements = elWidth / keyWidth;
    var newWidth = undefined;

    keyIncrements = keyIncrements <= 1.5 ? 1.5 : Math.ceil(keyIncrements);
    newWidth = keyIncrements * keyWidth;

    if (newWidth < minWidth) newWidth = minWidth;

    el.style.width = newWidth + 'px';
    listEl.style.width = newWidth + 'px';
  }

});

exports['default'] = Menu;
module.exports = exports['default'];