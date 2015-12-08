'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _tableHeaderColumn = require('./table-header-column');

var _tableHeaderColumn2 = _interopRequireDefault(_tableHeaderColumn);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var TableHeader = _react2['default'].createClass({
  displayName: 'TableHeader',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    adjustForCheckbox: _react2['default'].PropTypes.bool,
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
    displaySelectAll: _react2['default'].PropTypes.bool,
    enableSelectAll: _react2['default'].PropTypes.bool,
    onSelectAll: _react2['default'].PropTypes.func,
    selectAllSelected: _react2['default'].PropTypes.bool,
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

  getDefaultProps: function getDefaultProps() {
    return {
      adjustForCheckbox: true,
      displaySelectAll: true,
      enableSelectAll: true,
      selectAllSelected: false
    };
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.tableHeader;
  },

  getStyles: function getStyles() {
    var styles = {
      root: {
        borderBottom: '1px solid ' + this.getTheme().borderColor
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['className', 'style']);

    var classes = 'mui-table-header';
    if (className) classes += ' ' + className;

    var superHeaderRows = this._createSuperHeaderRows();
    var baseHeaderRow = this._createBaseHeaderRow();

    return _react2['default'].createElement(
      'thead',
      { className: classes, style: this.prepareStyles(this.getStyles().root, style) },
      superHeaderRows,
      baseHeaderRow
    );
  },

  _createSuperHeaderRows: function _createSuperHeaderRows() {
    var numChildren = _react2['default'].Children.count(this.props.children);
    if (numChildren === 1) return undefined;

    var superHeaders = [];
    for (var index = 0; index < numChildren - 1; index++) {
      var child = this.props.children[index];

      if (!_react2['default'].isValidElement(child)) continue;

      var props = {
        className: 'mui-table-super-header-row',
        displayRowCheckbox: false,
        key: 'sh' + index,
        rowNumber: index
      };
      superHeaders.push(this._createSuperHeaderRow(child, props));
    }

    if (superHeaders.length) return superHeaders;
  },

  _createSuperHeaderRow: function _createSuperHeaderRow(child, props) {
    var children = [];
    if (this.props.adjustForCheckbox) {
      children.push(this._getCheckboxPlaceholder(props));
    }
    _react2['default'].Children.forEach(child.props.children, function (child) {
      children.push(child);
    });

    return _react2['default'].cloneElement(child, props, children);
  },

  _createBaseHeaderRow: function _createBaseHeaderRow() {
    var numChildren = _react2['default'].Children.count(this.props.children);
    var child = numChildren === 1 ? this.props.children : this.props.children[numChildren - 1];
    var props = {
      className: 'mui-table-header-row',
      key: 'h' + numChildren,
      rowNumber: numChildren
    };

    var children = [this._getSelectAllCheckboxColumn(props)];
    _react2['default'].Children.forEach(child.props.children, function (child) {
      children.push(child);
    });

    return _react2['default'].cloneElement(child, props, children);
  },

  _getCheckboxPlaceholder: function _getCheckboxPlaceholder(props) {
    if (!this.props.adjustForCheckbox) return null;

    var key = 'hpcb' + props.rowNumber;
    return _react2['default'].createElement(_tableHeaderColumn2['default'], { key: key, style: { width: 24 } });
  },

  _getSelectAllCheckboxColumn: function _getSelectAllCheckboxColumn(props) {
    if (!this.props.displaySelectAll) return this._getCheckboxPlaceholder(props);

    var checkbox = _react2['default'].createElement(_checkbox2['default'], {
      key: 'selectallcb',
      name: 'selectallcb',
      value: 'selected',
      disabled: !this.props.enableSelectAll,
      checked: this.props.selectAllSelected,
      onCheck: this._onSelectAll });

    var key = 'hpcb' + props.rowNumber;
    return _react2['default'].createElement(
      _tableHeaderColumn2['default'],
      { key: key, style: { width: 24 } },
      checkbox
    );
  },

  _onSelectAll: function _onSelectAll(e, checked) {
    if (this.props.onSelectAll) this.props.onSelectAll(checked);
  }

});

exports['default'] = TableHeader;
module.exports = exports['default'];