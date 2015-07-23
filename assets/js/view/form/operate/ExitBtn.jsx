"use strict";

var React = require('react');

var ExitBtn = React.createClass({

  getDefaultProps: function () {
    return {
      text: "退出",
      className: "btn",
      icon: "fa fa-close",
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

module.exports = ExitBtn;
