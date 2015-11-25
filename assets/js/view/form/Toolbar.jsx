import React from "react";

import Navbar from "../navbar/Navbar.jsx";
import ExitBtn from "./operate/ExitBtn.jsx";

const Toolbar = React.createClass({
  PropTypes: {
    title: React.PropTypes.string
  },
  render() {
    document.title = this.props.title;

    return (
      <Navbar ico="fa fa-leaf" title={this.props.title}>
        {this.props.children}
        <li><ExitBtn /></li>
      </Navbar>
    );
  }
});

export default Toolbar;
