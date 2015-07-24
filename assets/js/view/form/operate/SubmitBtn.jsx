"use strict";

var React = require("react"),
    $ = require("jquery");
var Modal = require("../../../component/bootstrap/Modal.jsx");

var SubmitBtn = React.createClass({
    ModalBox:null,
    getDefaultProps: function () {
      return {
        text: "提交",
        className: "btn btn-success",
        icon: "fa fa-arrow-right",
        befer: function(){
          return true;
        },
        trigger: function(){ }
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
            <i className={"ace-icon "+this.props.icon}></i>
            {this.props.text}
          </button>
        );
    },
    getSubmitBox: function(){
      return (
        <div className="submitBox">
          <div className="row title"> 流程流转</div>
          <hr></hr>
          <div className="row content">
            <div className="col-md-6 flownodes">
              <font>环节</font>
              <ul onClick={this.toggleItem}>
                <li className="active"><i className="fa fa-circle"></i> 部门经理</li>
                <li><i className="fa fa-circle"></i> 部门总监</li>
              </ul>
            </div>

            <div className="col-md-6 psns">
              <font>人员</font>
                <ul onClick={this.toggleItem}>
                  <li className="active"><i className="fa fa-user"></i> 张三</li>
                </ul>
            </div>
          </div>
          <hr></hr>
          <div className="row operate">
            <button className="btn" onClick={this.closeModalBox}>
              取消<i className="fa fa-times"></i>
            </button>

            <button className="btn btn-success" onClick={this.props.trigger}>
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

module.exports = SubmitBtn;
