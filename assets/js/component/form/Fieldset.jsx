"use strict";

var React = require("react/lib/ReactWithAddons");

var Fieldset = React.createClass({
  getDefaultProps: function () {
    return {
      className: "row",
      hintType: "pop",
      layout: "aligned",
      readOnly: false
    }
  },
  render: function () {
      return (
          <fieldset className={this.props.className}>
            {this.props.title?<legend>{this.props.title}</legend>:null}
            {
              React.Children.map(this.props.children, function (child) {
                var props = {
                  hintType: child.props.hintType || this.props.hintType,
                  readOnly: child.props.readOnly || this.props.readOnly,
                  layout: this.props.layout
                }
                child = React.addons.cloneWithProps(child, props)
                return child
              }, this)
            }
          </fieldset>
      );
  }
});

module.exports = Fieldset;
