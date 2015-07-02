"use strict";

var React = require("react"),
  $ = require("jquery");

var Link = React.createClass({
  getDefaultProps: function() {
    return {
      to: ""
    };
  },
  propsType: {
    href: React.PropTypes.string,
    target: React.PropTypes.string,
    to: React.PropTypes.string,
    title: React.PropTypes.string.isRequired,
    query: React.PropTypes.object,
    children: React.PropTypes.node.isRequired
  },
  buildLink: function() {
    var query = (this.props.query ? "?" + $.param(this.props.query) : "");
    if (this.props.href) {
      return this.props.href + query;
    }

    return "#" + this.props.to + query;
  },
  render: function() {
    return (
      <a className={this.props.className} href={this.buildLink()} target={this.props.target}
         title={this.props.title}>{this.props.children}</a>
    );
  }
});

module.exports = Link;
