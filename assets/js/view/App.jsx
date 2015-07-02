"use strict";

var React = require("react"),
  _ = require("underscore");

var Nav = require("./navbar/Navbar.jsx"),
  Sidebar = require("./sidebar/Sidebar.jsx");

var moduleStore = require("../store/module");

require("backbone-react-component");

var App = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function () {
    var Container = this.state.model.container,
      options = _.omit(this.state.model, "container");

    return (
      <div className="no-skin">
        <Nav/>
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
