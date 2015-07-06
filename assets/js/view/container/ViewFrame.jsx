"use strict";

var React = require("react"),
  classNames = require("classnames"),
  $ = require("jquery");

var SearchMenu = require("./viewFrame/SearchMenu.jsx");

var ModuleCollection = require("../../store/module"),
  QueryCollection = require("../../store/viewFrame/query");

var action = require("../../action/viewFrame");

require("bootstrap/js/dropdown");
require("../../../less/app/viewFrame.less");
require("backbone-react-component");

var ViewFrame = React.createClass({
  propTypes: {
    "model": React.PropTypes.instanceOf(ModuleCollection.model).isRequired,
    "collection": React.PropTypes.instanceOf(QueryCollection).isRequired
  },
  mixins: [Backbone.React.Component.mixin],
  componentWillMount: function() {
    this.setState({
      tableWidth: $(this.getDOMNode()).parent().width() - 20
    });
  },
  render: function() {
    var Toolbar = this.props.Toolbar,
      View = this.props.View;

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
          <div className="col-xs-12">
            <View collection={action.getDataCollection()} column={action.getActivatedItem().get("column")} width={this.state.tableWidth} height={500}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ViewFrame;
