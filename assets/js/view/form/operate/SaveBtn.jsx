"use strict";

var React = require('react');

var SaveBtn = React.createClass({
  getDefaultProps: function () {
    return {
      text: "保存",
      className: "btn btn-info",
      icon: "fa fa-check",
      trigger: function(){}
    };
  },
  render: function() {
    return (
      <button className={this.props.className} onClick={this.props.trigger}>
        {this.props.text}
        <i className={this.props.icon}/>
      </button>
    );
  }

});

module.exports = SaveBtn;
