"use strict";

var React = require("react"),
  _ = require("underscore"),
  $ = require("jquery");

var ViewList = React.createClass({
  getDefaultProps: function () {
    return {
      param: {}
    };
  },
  getInitialState: function () {
    return {
      data: []
    };
  },
  propTypes: {
    className: React.PropTypes.arrayOf(React.PropTypes.string),
    url: React.PropTypes.string.isRequired,
    param: React.PropTypes.object,
    count: React.PropTypes.number.isRequired,
    formatter: React.PropTypes.func.isRequired
  },
  componentDidMount: function () {
    $.get(this.props.url, _.defaults(this.props.param, {"count": this.props.count}), null, "json")
      .done(function (resp) {
        if (this.isMounted()) {
          this.setState({
            data: resp
          });
        }
      }.bind(this))
      .fail(function (err) {
        console.error(err);
      });
  },
  render: function () {
    return (
      <ul className={this.props.className}>
        {this.state.data.map(this.props.formatter)}
      </ul>
    );
  }
});

module.exports = ViewList;
