import React from 'react';
import action from "../../action/orgFrame";
import _ from 'underscore';
import $ from 'jquery';
import Sidebar from './orgFrame/Sidebar.jsx';

import OrgMain from './orgFrame/OrgMain.jsx';

import Toolbar from './orgFrame/Toolbar.jsx';
import ViewTable from 'View/container/viewFrame/ViewTable.jsx';
import PagingInfo from 'View/container/viewFrame/PagingInfo.jsx';

import "backbone-react-component";
import '../../../less/app/orgFrame.less';
//岗位和角色 单独做一个模块
const OrgFrame = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState() {
    return {
      containerheight: 800,
      tableWidth: 1280,
      tableHeight: 600,
      title: "组织管理"
    };
  },
  toggleChange(option) {
    this.setState({
      title: option.title
    })
  },
  componentDidMount() {
    this.windowResize();
    $(window).on("resize.orgframe", _.debounce(this.windowResize, 200));
  },
  componentWillUnmount: function() {
    $(window).off("resize.orgframe");
  },
  windowResize() {
    let containerheight = $(window).height() - $("#navbar").height() - 40;
    let tableWidth = $(this.getDOMNode()).width() - $(".org-tree").width() - 30;
    let tableHeight = containerheight - $(".org-toolbar").height() - $(".paging-info").height();
    let perPage = Math.floor(tableHeight / 37);

    action.getDataCollection().setPerPage(perPage);

    this.setState({
      containerheight: containerheight,
      tableWidth: tableWidth,
      tableHeight: tableHeight
    });
  },
  render () {
    return (
      <div className="org-container row" ref="viewContainer" style={{height:this.state.containerheight+"px"}}>
        <div  className="org-tree col-xs-3">
          <Sidebar maxHeight={this.state.containerheight} onChange={this.toggleChange}/>
        </div>
        <div className="org-content col-xs-9">
            <Toolbar title={this.state.title}/>
            <ViewTable collection={action.getDataCollection()} column={action.getColumns()}
              height={this.state.tableHeight} width={this.state.tableWidth} page={action.getPage()} form={action.getFormPath()}/>
            <PagingInfo collection={action.getDataCollection()}/>
        </div>
      </div>
    );
  }
});

export default OrgFrame;
