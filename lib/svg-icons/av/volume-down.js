'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _svgIcon = require('../../svg-icon');

var _svgIcon2 = _interopRequireDefault(_svgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AvVolumeDown = function AvVolumeDown(props) {
  return _react2.default.createElement(
    _svgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z' })
  );
};
AvVolumeDown = (0, _pure2.default)(AvVolumeDown);
AvVolumeDown.displayName = 'AvVolumeDown';

exports.default = AvVolumeDown;
module.exports = exports['default'];