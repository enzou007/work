"use strict";

var React = require("react");

var SearchMenu = require("./viewFrame/SearchMenu.jsx"),
  Toolbar = require("./viewFrame/Toolbar.jsx");

var ModuleCollection = require("../../store/module");

require("bootstrap/js/dropdown");
require("../../../less/app/viewFrame.less");

var ViewFrame = React.createClass({
  propTypes: {
    "module": React.PropTypes.instanceOf(ModuleCollection.model).isRequired
  },
  render: function() {
    return <div className="page-content-area" id="data-frame">
        <div className="page-header">
          <div className="view-breadcrumb">
            <h1>
              {this.props.module.get("name")}
              <small>
                <i className="ace-icon fa fa-angle-double-right"/>
                <SearchMenu menu={this.props.menu} model={this.props.module}/>
              </small>
            </h1>
          </div>
          <Toolbar/>
        </div>

        <div className="row">
          <div className="col-xs-12"></div>
        </div>
      </div>;
  }
});

module.exports = ViewFrame;
