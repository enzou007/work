"use strict";

var React = require("react");

var UserMenu = require("./UserMenu.jsx");

var session = require("../../store/session");

require("../../../less/app/navbar.less");

var Navbar = React.createClass({
  render: function() {

    var userInfo = session.toJSON();

    return (
      <div className="navbar navbar-fixed-top" id="navbar">
        <div className="navbar-container" id="navbar-container">
          <button className="navbar-toggle menu-toggler pull-left" id="menu-toggler" type="button">
            <span className="sr-only">显示菜单</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div className="navbar-header pull-left">
            <a className="navbar-brand" href="#">
              <small>
                <i className="ace-icon fa fa-leaf"/>
                办公管理系统
              </small>
            </a>
          </div>
          <div className="navbar-buttons navbar-header pull-right" role="navigation">
            <ul className="nav ace-nav">
              <UserMenu {...userInfo}></UserMenu>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Navbar;
