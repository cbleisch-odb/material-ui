'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var TableRowColumn = _react2['default'].createClass({
  displayName: 'TableRowColumn',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
    columnNumber: _react2['default'].PropTypes.number,
    hoverable: _react2['default'].PropTypes.bool,
    key: _react2['default'].PropTypes.string,
    onClick: _react2['default'].PropTypes.func,
    onHover: _react2['default'].PropTypes.func,
    onHoverExit: _react2['default'].PropTypes.func,
    style: _react2['default'].PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      hoverable: false
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
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default']),
      hovered: false
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.tableRowColumn;
  },

  getStyles: function getStyles() {
    var theme = this.getTheme();
    var styles = {
      root: {
        paddingLeft: theme.spacing,
        paddingRight: theme.spacing,
        height: theme.height,
        textAlign: 'left',
        fontSize: 13,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    };

    if (_react2['default'].Children.count(this.props.children) === 1 && !isNaN(this.props.children)) {
      styles.textAlign = 'right';
    }

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var columnNumber = _props.columnNumber;
    var hoverable = _props.hoverable;
    var onClick = _props.onClick;
    var onHover = _props.onHover;
    var onHoverExit = _props.onHoverExit;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['className', 'columnNumber', 'hoverable', 'onClick', 'onHover', 'onHoverExit', 'style']);

    var styles = this.getStyles();
    var handlers = {
      onClick: this._onClick,
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave
    };
    var classes = 'mui-table-row-column';
    if (className) classes += ' ' + className;

    return _react2['default'].createElement(
      'td',
      _extends({
        key: this.props.key,
        className: classes,
        style: this.prepareStyles(styles.root, style)
      }, handlers, other),
      this.props.children
    );
  },

  _onClick: function _onClick(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.columnNumber);
  },

  _onMouseEnter: function _onMouseEnter(e) {
    if (this.props.hoverable) {
      this.setState({ hovered: true });
      if (this.props.onHover) this.props.onHover(e, this.props.columnNumber);
    }
  },

  _onMouseLeave: function _onMouseLeave(e) {
    if (this.props.hoverable) {
      this.setState({ hovered: false });
      if (this.props.onHoverExit) this.props.onHoverExit(e, this.props.columnNumber);
    }
  }

});

exports['default'] = TableRowColumn;
module.exports = exports['default'];