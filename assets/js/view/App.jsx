"use strict";

var React = require("react"),
  _ = require("underscore");

var Navbar = require("./navbar/Navbar.jsx"),
  UserMenu = require("./navbar/UserMenu.jsx"),
  Sidebar = require("./sidebar/Sidebar.jsx"),
  GeminiScrollbar = require('gemini-scrollbar');

var session = require("../store/session");

var moduleStore = require("../store/module");

require("backbone-react-component");

var App = React.createClass({
  componentDidMount: function() {
    this.PageScroll = new GeminiScrollbar({
      element : document.body
    }).create();
  },
  componentDidUpdate: function() {
    this.PageScroll.update();
  },
  mixins: [Backbone.React.Component.mixin],
  render: function() {
    var Container = this.state.model.container,
      options = _.omit(this.state.model, "container"),
      userInfo = session.toJSON();

    return (
      <div className="no-skin">
        <Navbar title="办公管理系统" href="#" ico="fa fa-leaf" menu={true}>
          <UserMenu {...userInfo}></UserMenu>
        </Navbar>
        <div className="main-container" id="main-container">
          <Sidebar collection={moduleStore}/>
          <div className="main-content">
            <div className="page-content">
              <Container {...options}></Container>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <p>Copyright © 2013 Gomeholdings.com Inc. ALL Rights Reserved. 国美控股集团有限公司 版权所有</p>

            <p>系统维护电话： +86 010 5928 7778</p>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = App;
