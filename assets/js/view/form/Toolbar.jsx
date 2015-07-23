import React from "react";
import $ from "jquery";

import Navbar from "../navbar/Navbar.jsx";
import SubmitBtn from "./operate/SubmitBtn.jsx";
import FlowBtn from "./operate/FlowBtn.jsx";
import SaveBtn from "./operate/SaveBtn.jsx";
import ExitBtn from "./operate/ExitBtn.jsx";
import RejectBtn from "./operate/RejectBtn.jsx";

import formAction from "../../action/form";

const Toolbar = React.createClass({
  PropTypes: {
    title: React.PropTypes.string
  },
  render() {
    document.title = this.props.title;

    return (
      <Navbar ico="fa fa-leaf" title={this.props.title}>
        <li><SaveBtn trigger={formAction.save}/> </li>
        <li><SubmitBtn trigger={formAction.submit}/> </li>
        <li><RejectBtn trigger={formAction.reject}/> </li>
        {this.props.children}
        <li><FlowBtn flow={this.props.flow}/></li>
        <li><ExitBtn /></li>
      </Navbar>
    );
  }
});

export default Toolbar;
