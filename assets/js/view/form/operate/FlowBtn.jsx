"use strict";

var React = require('react');

var Modal = require("../../../component/bootstrap/Modal.jsx"),
  FlowMap = require("../flowmap/FlowMap.jsx");
var FlowBtn = React.createClass({
  getDefaultProps: function () {
    return {
      text: "查看流程",
      className: "btn btn-info",
      icon: "fa fa-sitemap"
    };
  },
  showFlow: function(){
      this.ModalBox = Modal.create(this.getFlowMap(), {
        id:"flowModal",
        fade:false
      });
  },
  render: function () {
      return (
        <button className={this.props.className} onClick={this.showFlow}>
          {this.props.text}<i className={this.props.icon}></i>
        </button>
      );
  },
  getFlowMap: function(){
    return <FlowMap flow={this.props.flow}/>
  }

});

module.exports = FlowBtn;
