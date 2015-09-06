import React from "react";
import _ from "underscore";
import classnames from "classnames";
import $ from "jquery";

import SearchMenu from "./viewFrame/SearchMenu.jsx";
import Toolbar from "./viewFrame/Toolbar.jsx";
import PagingInfo from "./viewFrame/PagingInfo.jsx";

import ModuleCollection from "../../store/module";
import QueryCollection from "../../store/viewFrame/query";

import action from "../../action/viewFrame";

import "../../../less/app/viewFrame.less";
import "backbone-react-component";

const PAGINATION_HEIGHT = 40, ROW_HEIGHT = 37;

const ViewFrame = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  propTypes: {
    "model": React.PropTypes.instanceOf(ModuleCollection.model).isRequired,
    "collection": React.PropTypes.instanceOf(QueryCollection).isRequired
  },
  getInitialState() {
    return {
      tableWidth: 1280,
      tableHeight: 600,
      tableRowsCount: 0,
      minHeight: 1280
    };
  },
  componentDidMount() {
    let $frame = $(this.getDOMNode()),
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
  render() {
    let View = this.props.View,
      activatedItem = action.getActivatedItem(),
      columns = activatedItem.get("column") || action.getDefaultItem().get("column"),
      page = this.props.page,
      path = _.result(action.getDataCollection(), "url"),
      formPath = this.props.form;

    return (
      <div id="view-frame" className={classnames("page-content-area", this.getModel().get("path").replace(/\//g,"-"))}>
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
          <Toolbar model={this.props.model} page={page} form={this.props.form} path={path}
            showViewButton={this.props.viewButton} customs={this.props.CustomButton}/>
        </div>

        <div className="row">
          <div className="col-xs-12" ref="viewContainer">
            <View collection={action.getDataCollection()} column={columns}
              height={this.state.tableHeight} width={this.state.tableWidth} page={page} form={formPath}/>
            <PagingInfo collection={action.getDataCollection()}/>
          </div>
        </div>
      </div>
    );
  }
});

export default ViewFrame;
