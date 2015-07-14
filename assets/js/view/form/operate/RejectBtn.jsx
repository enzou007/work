"use strict";

var React = require("react"),
    $ = require("jquery");
var Modal = require("../../bootstrap/Modal.jsx");

var RejectBtn = React.createClass({
    ModalBox:null,
    getDefaultProps: function () {
      return {
        text: "驳回",
        className: "btn btn-inverse",
        icon: "fa fa-arrow-left",
        befer: function(){
          return true;
        },
        submit: function(){ }
      };
    },
    PropTypes:{
      befer:React.PropTypes.func,
      submit:React.PropTypes.func
    },
    triggerClick: function(){
      if(this.props.befer()){
        this.ModalBox = Modal.create(this.getSubmitBox() , {
          id:"test",
          className:"flow"
        });
      }
    },
    render: function () {
        return (
          <button className={this.props.className} onClick={this.triggerClick}>
            {this.props.text}<i className={this.props.icon}></i>
          </button>
        );
    },
    getSubmitBox: function(){
      return (
        <div className="submitBox">
          <div className="row title"><i className="fa fa-cogs fa-lg"></i> 流程流转</div>
          <hr></hr>
          <div className="row content">
            <div className="col-md-6 flownodes">
              <font>环节</font>
              <ul onClick={this.toggleItem}>
                <li className="active"><i className="fa fa-circle"></i> 开始</li>
              </ul>
            </div>

            <div className="col-md-6 psns">
              <font>人员</font>
                <ul onClick={this.toggleItem}>
                  <li className="active"><i className="fa fa-user"></i> 李四</li>
                </ul>
            </div>
          </div>
          <hr></hr>
          <div className="row pull-right">
            <button className="btn btn-danger" onClick={this.closeModalBox}>
              取消<i className="fa fa-times"></i>
            </button>

            <button className="btn btn-success" onClick={this.props.submit}>
              确定<i className="fa fa-arrow-right "></i>
            </button>
          </div>
        </div>
      )
    },
    closeModalBox: function(){
      if(this.ModalBox){
        this.ModalBox.close();
      }
    },
    toggleItem: function(e){
      if(e.target.tagName.toUpperCase() != "UL"){
        var $item = $(e.target);
        $item.closest("ul").find("li").removeClass("active");
        $item.closest("li").addClass("active");
      }
    }
});

module.exports = RejectBtn;
