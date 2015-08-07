import React from "react";

import $ from 'jquery';
import "../../../less/app/navbar.less";

const Navbar = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    href: React.PropTypes.string,
    fix: React.PropTypes.bool,
    menu: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      fix: true,
      menu: false
    };
  },
  toggleMenu() {
    $("#sidebar").toggleClass("display");
  },
  render() {
    return (
      <div className={"navbar " + (this.props.fix ? "navbar-fixed-top" : "navbar-default")} id="navbar">
        <div className="navbar-container" id="navbar-container">
          { this.props.menu ? (
          <button className="navbar-toggle menu-toggler pull-left" id="menu-toggler" type="button" title="显示/隐藏菜单" onClick={this.toggleMenu}>
            <span className="sr-only">显示菜单</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          ) : null }
          <div className="navbar-header pull-left">
            <a className="navbar-brand" href={this.props.href}>
              <small>
                <i className={"ace-icon " + (this.props.ico || "")}/>
                {this.props.title}
              </small>
            </a>
          </div>
          <div className="navbar-buttons navbar-header pull-right" role="navigation">
            <ul className="nav ace-nav">
              {this.props.children}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

export default Navbar;
