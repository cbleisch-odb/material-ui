'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _utilsPropTypes = require('../utils/prop-types');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesTypography = require('../styles/typography');

var _stylesTypography2 = _interopRequireDefault(_stylesTypography);

var _paper = require('../paper');

var _paper2 = _interopRequireDefault(_paper);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var List = _react2['default'].createClass({
  displayName: 'List',

  mixins: [_reactAddonsPureRenderMixin2['default'], _mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    children: _react2['default'].PropTypes.node,
    insetSubheader: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    subheader: _react2['default'].PropTypes.node,
    subheaderStyle: _react2['default'].PropTypes.object,
    zDepth: _utilsPropTypes2['default'].zDepth
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

  getDefaultProps: function getDefaultProps() {
    return {
      zDepth: 0
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

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var insetSubheader = _props.insetSubheader;
    var style = _props.style;
    var subheader = _props.subheader;
    var subheaderStyle = _props.subheaderStyle;
    var zDepth = _props.zDepth;

    var other = _objectWithoutProperties(_props, ['children', 'insetSubheader', 'style', 'subheader', 'subheaderStyle', 'zDepth']);

    var styles = {
      root: {
        padding: 0,
        paddingBottom: 8,
        paddingTop: subheader ? 0 : 8
      },

      subheader: {
        color: _stylesTypography2['default'].textLightBlack,
        fontSize: 14,
        fontWeight: _stylesTypography2['default'].fontWeightMedium,
        lineHeight: '48px',
        paddingLeft: insetSubheader ? 72 : 16
      }
    };

    var subheaderElement = undefined;
    if (subheader) {
      var mergedSubheaderStyles = this.prepareStyles(styles.subheader, subheaderStyle);
      subheaderElement = _react2['default'].createElement(
        'div',
        { style: mergedSubheaderStyles },
        subheader
      );
    }

    return _react2['default'].createElement(
      _paper2['default'],
      _extends({}, other, {
        style: this.mergeStyles(styles.root, style),
        zDepth: zDepth }),
      subheaderElement,
      children
    );
  }
});

exports['default'] = List;
module.exports = exports['default'];