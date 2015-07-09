"use strict";

var React = require("react");

var Navbar = require("../../component/form/Navbar.jsx");
var Form = require("rctui/Form");

var Document = React.createClass({
  getDefaultProps: function() {
    return {
      formTitle: ""
    };
  },
  flowOperate: function(){

  },
  render: function() {
    return (
      <div>

        <Navbar title={this.props.formTitle} operate={this.flowOperate}>
          {this.props.operateBtns}
        </Navbar>

        <Form layout="aligned" className="container form-horizontal">
          {this.props.children}
        </Form>
      </div>
    );
  }
});
module.exports = Document;
