"use strict";

var React = require("react"),
    _ = require("underscore");

var Modal = require("../bootstrap/Modal.jsx");

var FlowFormBase = {
  alert: function(msg){
    Modal.create(<div>{msg}</div> , {
      id:"test"
    });
  },
  flowOperate: function(type){
    switch (type) {
      case "submit":
        this.submit();
        break;
      default:
    }
  },
  beferSubmit: function(){
    return true;
  },
  submit: function(){
    if(this.beferSubmit()){

      //Flow.Submit();  TODO 完善Flow功能
      Modal.create(this.getSubmitBox() , {
        id:"test",
        className:"flow"
      });

      this.afterSubmit();
    }
  },
  afterSubmit: function(){

  },


  //Test Code
  getSubmitBox: function(){
    return (
      <div className="submitBox">
        <div className="row content"></div>
        <hr></hr>
        <div className="row pull-right">
          <button className="btn btn-danger" data-trigger="zb">
            取消<i className="fa fa-times"></i>
          </button>

          <button className="btn btn-success">
            确定<i className="fa fa-arrow-right "></i>
          </button>
        </div>
      </div>
    )
  }
}

module.exports = {
  extend:function(option){
    return React.createClass(_.extend(FlowFormBase,option));
  }
};
