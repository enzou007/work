"use strict";

var React = require("react"),
  classNames = require("classnames"),
  $ = require("jquery");

var SearchMenu = require("./viewFrame/SearchMenu.jsx"),
  PagingInfo = require("./viewFrame/PagingInfo.jsx");

var ModuleCollection = require("../../store/module"),
  QueryCollection = require("../../store/viewFrame/query");

var action = require("../../action/viewFrame");

require("bootstrap/js/dropdown");
require("../../../less/app/viewFrame.less");
require("backbone-react-component");

var PAGINATION_HEIGHT = 40, ROW_HEIGHT = 36;

var ViewFrame = React.createClass({
  propTypes: {
    "model": React.PropTypes.instanceOf(ModuleCollection.model).isRequired,
    "collection": React.PropTypes.instanceOf(QueryCollection).isRequired
  },
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function() {
    return {
      tableWidth: 1280,
      tableHeight: 600,
      tableRowsCount: 0,
      minHeight: 1280
    };
  },
  componentDidMount: function () {
    var $frame = $(this.getDOMNode()),
      $row = $(this.refs.viewContainer.getDOMNode()),
      screenHeight = document.documentElement.clientHeight || screen.availHeight,
      tableHeight = screenHeight - $row.offset().top - PAGINATION_HEIGHT,
      perPage = parseInt(tableHeight / ROW_HEIGHT) - 1;

    this.setState({
      tableWidth: $frame.width(),
      tableHeight: tableHeight,
      tableRowsCount: perPage,
      minHeight: screenHeight - $frame.offset().top
    });

    action.getDataCollection().setPage({
      perPage: perPage
    });
  },
  changePage : function( page) {
    action.getDataCollection().setPage({
      page: page
    });
  },
  changePerPage : function( perPage) {
    action.getDataCollection().setPage({
      page: 1,
      perPage: perPage
    });
  },
  render: function () {
    var Toolbar = this.props.Toolbar,
      View = this.props.View;

    return (
      <div id="view-frame" className={classNames("page-content-area", this.getModel().get("path").replace(/\//g,"-"))}>
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
          <div className="col-xs-12" ref="viewContainer">
            <View collection={action.getDataCollection()} column={action.getActivatedItem().get("column")}
              height={this.state.tableHeight} width={this.state.tableWidth} rowsCount={this.state.tableRowsCount}/>
            <PagingInfo collection={action.getDataCollection()} onPageChange={this.changePage}
                                        onPerPageChange={this.changePerPage}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ViewFrame;
