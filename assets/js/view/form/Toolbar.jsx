import React from "react";
import $ from "jquery";

import Navbar from "../navbar/Navbar.jsx";
import SubmitBtn from "./operate/SubmitBtn.jsx";

const Toolbar = React.createClass({
  PropTypes: {
    title: React.PropTypes.string
  },
  render() {
    document.title = this.props.title;

    return (
      <Navbar title={this.props.title} ico="fa fa-leaf">
        <button className="btn btn-inverse">
          保存
          <i className="fa fa-user"/>
        </button>
        <SubmitBtn/>
        <button className="btn btn-inverse" data-trigger="reject">
          驳回
          <i className="fa fa-user"/>
        </button>

        <button className="btn btn-inverse" data-trigger="jq">
          加签
          <i className="fa fa-user"/></button>
        <button className="btn btn-inverse" data-trigger="zb">
          转办<i className="fa fa-user"/></button>
        {this.props.children}
        <button className="btn btn-inverse">
          退出
          <i className="fa fa-user"/>
        </button>
      </Navbar>
    );
  }
});

export default Toolbar;
