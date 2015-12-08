'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _iconButton = require('../icon-button');

var _iconButton2 = _interopRequireDefault(_iconButton);

var _toolbarToolbar = require('../toolbar/toolbar');

var _toolbarToolbar2 = _interopRequireDefault(_toolbarToolbar);

var _toolbarToolbarGroup = require('../toolbar/toolbar-group');

var _toolbarToolbarGroup2 = _interopRequireDefault(_toolbarToolbarGroup);

var _svgIconsNavigationChevronLeft = require('../svg-icons/navigation/chevron-left');

var _svgIconsNavigationChevronLeft2 = _interopRequireDefault(_svgIconsNavigationChevronLeft);

var _svgIconsNavigationChevronRight = require('../svg-icons/navigation/chevron-right');

var _svgIconsNavigationChevronRight2 = _interopRequireDefault(_svgIconsNavigationChevronRight);

var _transitionGroupsSlideIn = require('../transition-groups/slide-in');

var _transitionGroupsSlideIn2 = _interopRequireDefault(_transitionGroupsSlideIn);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var styles = {
  root: {
    position: 'relative',
    padding: 0,
    backgroundColor: 'inherit'
  },
  title: {
    position: 'absolute',
    top: 17,
    lineHeight: '14px',
    fontSize: 14,
    height: 14,
    width: '100%',
    fontWeight: '500',
    textAlign: 'center'
  }
};

var CalendarToolbar = _react2['default'].createClass({
  displayName: 'CalendarToolbar',

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
    DateTimeFormat: _react2['default'].PropTypes.func.isRequired,
    displayDate: _react2['default'].PropTypes.object.isRequired,
    locale: _react2['default'].PropTypes.string.isRequired,
    nextMonth: _react2['default'].PropTypes.bool,
    onMonthChange: _react2['default'].PropTypes.func,
    prevMonth: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      nextMonth: true,
      prevMonth: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default']),
      transitionDirection: 'up'
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    var direction = undefined;

    if (nextProps.displayDate !== this.props.displayDate) {
      direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },

  render: function render() {
    var _props = this.props;
    var DateTimeFormat = _props.DateTimeFormat;
    var locale = _props.locale;
    var displayDate = _props.displayDate;

    var dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric'
    }).format(displayDate);

    var nextButtonIcon = this.state.muiTheme.isRtl ? _react2['default'].createElement(_svgIconsNavigationChevronRight2['default'], null) : _react2['default'].createElement(_svgIconsNavigationChevronLeft2['default'], null);
    var prevButtonIcon = this.state.muiTheme.isRtl ? _react2['default'].createElement(_svgIconsNavigationChevronLeft2['default'], null) : _react2['default'].createElement(_svgIconsNavigationChevronRight2['default'], null);

    return _react2['default'].createElement(
      _toolbarToolbar2['default'],
      { className: 'mui-date-picker-calendar-toolbar', style: styles.root, noGutter: true },
      _react2['default'].createElement(
        _transitionGroupsSlideIn2['default'],
        {
          style: styles.title,
          direction: this.state.transitionDirection },
        _react2['default'].createElement(
          'div',
          { key: dateTimeFormatted },
          dateTimeFormatted
        )
      ),
      _react2['default'].createElement(
        _toolbarToolbarGroup2['default'],
        { key: 0, float: 'left' },
        _react2['default'].createElement(
          _iconButton2['default'],
          {
            style: styles.button,
            disabled: !this.props.prevMonth,
            onTouchTap: this._prevMonthTouchTap },
          nextButtonIcon
        )
      ),
      _react2['default'].createElement(
        _toolbarToolbarGroup2['default'],
        { key: 1, float: 'right' },
        _react2['default'].createElement(
          _iconButton2['default'],
          {
            style: styles.button,
            disabled: !this.props.nextMonth,
            onTouchTap: this._nextMonthTouchTap },
          prevButtonIcon
        )
      )
    );
  },

  _prevMonthTouchTap: function _prevMonthTouchTap() {
    if (this.props.onMonthChange && this.props.prevMonth) this.props.onMonthChange(-1);
  },

  _nextMonthTouchTap: function _nextMonthTouchTap() {
    if (this.props.onMonthChange && this.props.nextMonth) this.props.onMonthChange(1);
  }

});

exports['default'] = CalendarToolbar;
module.exports = exports['default'];