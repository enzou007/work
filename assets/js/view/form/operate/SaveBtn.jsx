"use strict";

var React = require('react');
var Gritter = require('Component/Gritter.jsx');
var classnames = require('classnames');

var SaveBtn = React.createClass({
  getDefaultProps: function () {
    return {
      text: "保存",
      className: "btn btn-info",
      icon: "fa fa-check",
      trigger: function () {}
    };
  },
  after: function (option) {
    var cn = classnames({
      "gritter-center": option.isNewNote,
      "gritter-light": !option.isNewNote,
      "gritter-success": option.status === "succeed",
      "gritter-error": option.status === "failure"
    })
    var id = Gritter.add({
      title: '提示',
      time: 1500,
      class_name: cn,
      after_close: function () {
        if (option.status === "succeed") {
          if (option.isNewNote) {
            window.location.href = option.url;
          }
        } else {
          window.location.reload();
        }
        Gritter.remove(id);
      },
      text: (
        <div>
          <h5>{option.status == "succeed" ? "保存成功!" : "保存失败!"}</h5>
          <div style={{textAlign: "right"}}>
            <a className="btn btn-sm btn-primary" onClick={function(){Gritter.remove(id);}}>确定</a>
          </div>
        </div>
      )
    });
  },
  render: function () {
    return (
      <button className={this.props.className} onClick={this.props.trigger.bind(this, this.after)}>
        <i className={"ace-icon "+this.props.icon}/>
        {this.props.text}
      </button>
    );
  }
});

module.exports = SaveBtn;
