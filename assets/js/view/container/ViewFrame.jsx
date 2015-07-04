"use strict";

var React = require("react"),
  classNames = require("classnames");

var SearchMenu = require("./viewFrame/SearchMenu.jsx"),
  Toolbar = require("./viewFrame/Toolbar.jsx");

var ModuleCollection = require("../../store/module"),
  QueryCollection = require("../../store/viewFrame/query");

require("bootstrap/js/dropdown");
require("../../../less/app/viewFrame.less");
require("backbone-react-component");

var ViewFrame = React.createClass({
  propTypes: {
    "model": React.PropTypes.instanceOf(ModuleCollection.model).isRequired,
    "collection": React.PropTypes.instanceOf(QueryCollection).isRequired
  },
  mixins: [Backbone.React.Component.mixin],
  render: function() {
    return (
      <div className={classNames("page-content-area", this.getModel().get("path").replace(/\//g,"-"))} id="view-frame">
        <div className="page-header">
          <div className="view-breadcrumb">
            <h1>
              {this.getModel().get("name")}
              <small>
                <i className="ace-icon fa fa-angle-double-right"/>
                <SearchMenu collection={this.getCollection()}/>
              </small>
            </h1>
          </div>
          <Toolbar/>
        </div>

        <div className="row">
          <div className="col-xs-12"></div>
        </div>
      </div>
    );
  }
});

module.exports = ViewFrame;
