"use strict";

var React = require("react"),
  _ = require("underscore"),
  classNames = require("classnames");

var Checkbox = React.createClass({
  render: function() {
    return (
      <label className={classNames("position-relative", this.props.className)}>
        <input type="checkbox" className={"ace " + this.props.checkboxClass || ""} {...(_.omit(this.props, "children", "className"))} />
        <span className="lbl"></span>
        {this.props.children}
      </label>
    );
  }
});

module.exports = Checkbox;
