"use strict";

var React = require("react"),
  _ = require("underscore"),
  $ = require("jquery");

var ViewTable = React.createClass({
  propTypes: {
    className: React.PropTypes.arrayOf(React.PropTypes.string),
    head: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    url: React.PropTypes.string.isRequired,
    param: React.PropTypes.object,
    count: React.PropTypes.number.isRequired,
    formatter: React.PropTypes.func.isRequired
  },
  getDefaultProps: function() {
    return {
      className: ["table"],
      param: {}
    };
  },
  getInitialState: function() {
    return {
      data: []
    }
  },
  componentDidMount: function() {
    $.get(this.props.url, _.defaults(this.props.param, {
      "count": this.props.count
    }), null, "json").done(function(resp) {
      if (this.isMounted()) {
        this.setState({
          data: resp
        });
      }
    }.bind(this)).fail(function(err) {
      console.error(err);
    });
  },
  render: function() {
    return (
      <table className={this.props.className}>
        <thead>
          <tr>
            {this.props.head.map(function (item, index) { return
            <th key={index}>{item}</th>; })}
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(this.props.formatter)}
        </tbody>
      </table>
    );
  }
});

module.exports = ViewTable;
