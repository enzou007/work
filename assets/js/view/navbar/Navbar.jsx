"use strict";

var React = require("react");

var UserMenu = require("./UserMenu.jsx");

var session = require("../../store/session");

require("../../../less/app/navbar.less");

var Navbar = React.createClass({
    render: function () {

        var userInfo = session.toJSON();

        return (
            <div id="navbar" className="navbar navbar-fixed-top">
                <div className="navbar-container" id="navbar-container">
                    {/*#section:basics/sidebar.mobile.toggle */}
                    <button type="button" className="navbar-toggle menu-toggler pull-left" id="menu-toggler">
                        <span className="sr-only">显示菜单</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    {/*/section:basics/sidebar.mobile.toggle */}
                    <div className="navbar-header pull-left">
                        {/*#section:basics/navbar.layout.brand */}
                        <a href="#" className="navbar-brand">
                            <small>
                                <i className="ace-icon fa fa-leaf"/>
                                办公管理系统
                            </small>
                        </a>
                        {/* section:basics/navbar.layout.brand */}
                    </div>
                    {/*#section:basics/navbar.dropdown */}
                    <div className="navbar-buttons navbar-header pull-right" role="navigation">
                        <ul className="nav ace-nav">
                            {<UserMenu {...userInfo}/> }
                        </ul>
                    </div>
                    {/*/section:basics/navbar.dropdown */}
                </div>
                {/*/.navbar-container */}
            </div>
        );
    }
});

module.exports = Navbar;
