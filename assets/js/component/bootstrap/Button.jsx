"use strict";

var React = require("react"),
  _ = require("underscore"),
  classNames = require("classnames");

var Button = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    block: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    loadingText: React.PropTypes.node,
    size: React.PropTypes.string,
    children: React.PropTypes.node.isRequired
  },
  getDefaultProps: function() {
    return {
      bsStyle: "default",
      type: "button",
      active: false,
      disabled: false,
      block: false,
      size: null,
      loading: null
    };
  },
  render: function() {

    var classes = {
      "btn": true
    };
    classes["active"] = this.props.active;
    classes["btn-block"] = this.props.block;
    classes["btn-" + this.props.bsStyle] = true;
    classes["btn-" + this.props.size] = !!this.props.size;
    classes["disabled"] = !!this.props.loading;
    return (
      <button className={classNames(this.props.className, classes)} disabled={!!this.props.loading}>
        {this.props.loading ? this.props.loadingText : this.props.children}
      </button>
    );
  }
});

module.exports = Button;
