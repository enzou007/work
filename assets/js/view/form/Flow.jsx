"use strict";

var React = require("react");

var Navbar = require("../../component/form/Navbar.jsx"),
    TimeLine = require("./timeline/TimeLine.jsx"),
    SubmitBtn = require("./operate/SubmitBtn.jsx");

var Form = require("rctui/Form");

require("../../../less/flow.less")

var Flow = React.createClass({
  getDefaultProps: function() {
    return {
      formTitle: "入职申请单"
    };
  },
  flowOperate: function(){

  },
  render: function() {
    return (
      <div>

       <Navbar title={this.props.formTitle} operate={this.flowOperate}>
          {this.props.operateBtns}
          <button className="btn btn-inverse" data-trigger="zb">
            转办<i className="fa fa-user"></i>
          </button>

          <button className="btn btn-inverse" data-trigger="jq">
            加签<i className="fa fa-user"></i>
          </button>

          <button className="btn btn-inverse" data-trigger="reject">
            驳回<i className="fa fa-user"></i>
          </button>

          <SubmitBtn />
        </Navbar>

        <TimeLine />

        <Form layout="aligned" className="container form-horizontal">
          {this.props.children}
        </Form>
      </div>
    );
  }
});
module.exports = Flow;
