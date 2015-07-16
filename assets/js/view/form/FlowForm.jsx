"use strict";

var React = require("react");

var Navbar = require("./Navbar.jsx"),
  TimeLine = require("./timeline/TimeLine.jsx"),
  SubmitBtn = require("./operate/SubmitBtn.jsx");

var Form = require("Component/form/Form.jsx");

require("../../../less/flow.less");
var FlowForm = React.createClass({
  propTypes: {
    onBeforeSubmit: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },
  getDefaultProps: function () {
    return {
      formTitle: "入职申请单"
    };
  },
  flowOperate: function () {},
  render: function () {
    return (
      <div>
        <Navbar operate={this.flowOperate} title={this.props.formTitle}>
          <button className="btn btn-inverse" data-trigger="zb">
            转办<i className="fa fa-user"/></button>
          <button className="btn btn-inverse" data-trigger="jq">
            加签
            <i className="fa fa-user"/></button>
          <button className="btn btn-inverse" data-trigger="reject">
            驳回
            <i className="fa fa-user"/>
          </button><SubmitBtn/>
        </Navbar>
        <TimeLine/>
        <Form className="container form-horizontal" layout="aligned" hintType="pop" onSubmit={this.props.onSubmit}>
          {this.props.children}
        </Form>
      </div>
    );
  }
});
module.exports = FlowForm;
