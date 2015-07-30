import React from "react";
import $ from "jquery";
import _ from "underscore";

import Navbar from "../navbar/Navbar.jsx";
import SubmitBtn from "./operate/SubmitBtn.jsx";
import SaveBtn from "./operate/SaveBtn.jsx";
import ExitBtn from "./operate/ExitBtn.jsx";
import RejectBtn from "./operate/RejectBtn.jsx";

import {store as formStore,action} from "../../action/form";

const Toolbar = React.createClass({
  PropTypes: {
    title: React.PropTypes.string,
    onBeforeSubmit: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },
  render() {
    document.title = this.props.title;
    let store = formStore.data();
    var curNode = _.find(store.get("flow").toJS().nodes, function(node){
      return node.cur;
    });
    var display = {
      save: curNode && curNode.nodeId != "EndNode",
      submit: curNode && curNode.nodeId != "EndNode",
      reject: curNode && curNode.nodeId != "StartNode",
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
