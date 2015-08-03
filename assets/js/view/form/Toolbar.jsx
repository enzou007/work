import React from "react";
import $ from "jquery";
import _ from "underscore";

import Navbar from "../navbar/Navbar.jsx";
import SubmitBtn from "./operate/SubmitBtn.jsx";
import SaveBtn from "./operate/SaveBtn.jsx";
import ExitBtn from "./operate/ExitBtn.jsx";
import RejectBtn from "./operate/RejectBtn.jsx";

const Toolbar = React.createClass({
  PropTypes: {
    title: React.PropTypes.string,
    action: React.PropTypes.object.isRequired,
    onBeforeSubmit: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },
  render() {
    document.title = this.props.title;

    let action = this.props.action,
      store = action.getStore().data();
    let curNode = _.find(store.get("flow").toJS().nodes, node => node.cur);
    var display = {
      save: curNode && curNode.nodeId != "EndNode",
      submit: curNode && curNode.nodeId != "EndNode",
      reject: curNode && curNode.nodeId != "StartNode" && curNode.nodeId != "EndNode",
      exit: true
    }
    return (
      <Navbar ico="fa fa-leaf" title={this.props.title}>
        {display.save?<li><SaveBtn trigger={action.save}/></li>:null}
        {display.submit?<li><SubmitBtn onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit} trigger={action.submit} flow={store.get("flow").toJS()}/> </li>:null}
        {display.reject?<li><RejectBtn trigger={action.reject} flow={store.get("flow").toJS()}/> </li>:null}
        {this.props.children}
        <li><ExitBtn /></li>
      </Navbar>
    );
  }
});

export default Toolbar;
