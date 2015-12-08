'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixinsContextPure = require('../mixins/context-pure');

var _mixinsContextPure2 = _interopRequireDefault(_mixinsContextPure);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var FlatButtonLabel = _react2['default'].createClass({
  displayName: 'FlatButtonLabel',

  mixins: [_mixinsContextPure2['default'], _mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    label: _react2['default'].PropTypes.node,
    style: _react2['default'].PropTypes.object
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

  statics: {
    getRelevantContextKeys: function getRelevantContextKeys(muiTheme) {
      return {
        spacingDesktopGutterLess: muiTheme.rawTheme.spacing.desktopGutterLess
      };
    }
  },

  render: function render() {
    var _props = this.props;
    var label = _props.label;
    var style = _props.style;

    var contextKeys = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    var mergedRootStyles = this.mergeStyles({
      position: 'relative',
      padding: '0 ' + contextKeys.spacingDesktopGutterLess + 'px'
    }, style);

    return _react2['default'].createElement(
      'span',
      { style: this.prepareStyles(mergedRootStyles) },
      label
    );
  }

});

exports['default'] = FlatButtonLabel;
module.exports = exports['default'];