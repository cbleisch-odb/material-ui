'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _svgIcon = require('../../svg-icon');

var _svgIcon2 = _interopRequireDefault(_svgIcon);

var ImagePhotoSizeSelectLarge = _react2['default'].createClass({
  displayName: 'ImagePhotoSizeSelectLarge',

  mixins: [_reactAddonsPureRenderMixin2['default']],

  render: function render() {
    return _react2['default'].createElement(
      _svgIcon2['default'],
      this.props,
      _react2['default'].createElement('path', { d: 'M21 15h2v2h-2v-2zm0-4h2v2h-2v-2zm2 8h-2v2c1 0 2-1 2-2zM13 3h2v2h-2V3zm8 4h2v2h-2V7zm0-4v2h2c0-1-1-2-2-2zM1 7h2v2H1V7zm16-4h2v2h-2V3zm0 16h2v2h-2v-2zM3 3C2 3 1 4 1 5h2V3zm6 0h2v2H9V3zM5 3h2v2H5V3zm-4 8v8c0 1.1.9 2 2 2h12V11H1zm2 8l2.5-3.21 1.79 2.15 2.5-3.22L13 19H3z' })
    );
  }

});

exports['default'] = ImagePhotoSizeSelectLarge;
module.exports = exports['default'];