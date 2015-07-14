"use strict";

var React = require("react"),
  _ = require("underscore"),
  classNames = require("classnames"),
  $ = require("jquery");

var SearchMenu = require("./viewFrame/SearchMenu.jsx"),
  Toolbar = require("./viewFrame/Toolbar.jsx"),
  PagingInfo = require("./viewFrame/PagingInfo.jsx");

var ModuleCollection = require("../../store/module"),
  QueryCollection = require("../../store/viewFrame/query");

var action = require("../../action/viewFrame");

require("bootstrap/js/dropdown");
require("../../../less/app/viewFrame.less");
require("backbone-react-component");

var PAGINATION_HEIGHT = 40, ROW_HEIGHT = 37;

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
      // 计算行数需要减去标题行
      perPage = Math.floor((screenHeight - $row.offset().top - PAGINATION_HEIGHT - ROW_HEIGHT) / ROW_HEIGHT),
      // 计算整体高度，所以需要加回标题行
      tableHeight = (perPage + 1) * ROW_HEIGHT;

    //强制更新perPage信息
    action.getDataCollection().setPerPage(perPage);

    this.setState({
      tableWidth: $frame.width(),
      tableHeight: tableHeight
    });
  },
  render: function () {
    var View = this.props.View,
      activatedItem = action.getActivatedItem(),
      columns = activatedItem.get("column") || action.getDefaultItem().get("column"),
      page = activatedItem.get("page") || this.props.page,
      form = _.first(_.keys(activatedItem.get("form") || this.props.form));

    return (
      <div id="view-frame" className={classNames("page-content-area", this.getModel().get("path").replace(/\//g,"-"))}>
        <div className="page-header">
          <div className="view-breadcrumb">
            <h1>
              {this.getModel().get("name")}
              <small>
                <i className="ace-icon fa fa-angle-double-right"/>
                <SearchMenu collection={this.getCollection()} fields={this.props.Model.fields}/>
              </small>
            </h1>
          </div>
          <Toolbar model={this.props.model} page={page} form={this.props.form} showViewButton={this.props.viewButton} customs={this.props.CustomButton}/>
        </div>

        <div className="row">
          <div className="col-xs-12" ref="viewContainer">
            <View collection={action.getDataCollection()} column={columns}
              height={this.state.tableHeight} width={this.state.tableWidth} page={page} form={form}/>
            <PagingInfo collection={action.getDataCollection()}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ViewFrame;
