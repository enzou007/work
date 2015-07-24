"use strict";

var React = require('react');

var ExitBtn = React.createClass({

  getDefaultProps: function () {
    return {
      text: "关闭",
      className: "btn",
      icon: "fa fa-close",
      trigger: function(){}
    };
  },
  render: function() {
    return (
      <button className={this.props.className} onClick={this.props.trigger}>
        <i className={"ace-icon "+this.props.icon}/>
        {this.props.text}
      </button>
    );
  }

});

module.exports = ExitBtn;
