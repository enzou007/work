import React from 'react';
import Mock from 'mockjs';
import $ from 'jquery';
import _ from 'underscore';
import Immutable from 'immutable';
import { urlParamToObject } from 'Util/Strings';

import FlowMap from "View/form/flowmap/FlowMap.jsx";
import FormAction from 'Action/form';
import action from './action';

import Form from 'Component/form/Form.jsx';
import Navbar from "View/navbar/Navbar.jsx";
import { Checkbox } from 'Component/form/Checkbox.jsx';

let FlowNodeInfo;
require("./FlowNodeInfo.jsx")(function (ModuleForm) {FlowNodeInfo = ModuleForm})

import 'Less/app/workflow.less';
export default class WorkflowForm extends React.Component{
  static defaultProps = {
    formAction: new FormAction()
  }
  state = {
    isShowNodeInfo: true,
    showNodeInfo: false,
    flowData: Immutable.fromJS({
      nodes: []
    })
  }
  _nodeIdMap = {}
  componentWillMount() {
    let objectId = urlParamToObject(location.search.substring(1)).objectId;
    if(objectId != "") {
      $.get("/1/system/workflow/"+objectId).then(data => {
        _.each(data.nodes, node => {
          this._nodeIdMap[node.unid] = node.id;
        })
        this.setState({
          flowData: Immutable.fromJS(data)
        })
      })
    }
  }
  componentDidMount() {
    this._flowMap = this.refs.ref_flowMap;
    window.wf = this;
  }
  saveFlowInfo(){
    let flowMapInfo = this._flowMap.getValue(this._nodeIdMap).toJS();
    let flowInfo = this.state.flowData.toJS();

    action.saveFlow(flowMapInfo, flowInfo).then(data => {
      if(!this.state.flowData.get("@objectId")){
        window.location.href = `${window.location.href}&objectId=${data["@objectId"]}`;
      }
    })
  }
  render() {
    return (
      <div className="workflow">
        <Navbar ico="fa fa-leaf" title={this.state.flowData.get("name") || "新建流程"}>
          <li><button className="btn btn-success" onClick={this.saveFlowInfo.bind(this)}>保存</button></li>
        </Navbar>
        <div className={"page-content" + (this.state.isShowNodeInfo && this.state.showNodeInfo ? " show-node-info" : "")}>
          <ul className="wf-sidebar dropdown-menu dropdown-info">
            <li><b>操作栏</b></li>
            <li className="divider"></li>
            <li className="wf-sidebar-item" draggable={true} dropzone="move" onDragStart={this.dragStart.bind(this, "start")}>开始</li>
            <li className="wf-sidebar-item" draggable={true} dropzone="move" onDragStart={this.dragStart.bind(this, "task")}>处理环节</li>
            <li className="wf-sidebar-item" draggable={true} dropzone="move" onDragStart={this.dragStart.bind(this, "decision")}>条件节点</li>
            <li className="wf-sidebar-item" draggable={true} dropzone="move" onDragStart={this.dragStart.bind(this, "end")}>结束</li>
            <li className="wf-sidebar-item" draggable={true} dropzone="move" onDragStart={this.dragStart.bind(this, "text")}>文本</li>
            <li className="divider"></li>
            <li><Checkbox onChange={this.setIsShowNodeInfo.bind(this)}>禁止弹出配置框</Checkbox></li>
          </ul>
          <div className="wf-info">
            <i className="fa fa-close" onClick={this.closeNodeInfo.bind(this)}></i>
            <div className="wf-info-content" id="workFlowNodeInfo">
              {
                this.state.isShowNodeInfo && this.state.showNodeInfo
                ? <FlowNodeInfo channel={this.props.formAction} store={this.props.formAction.getStore()}
                  onSubmit={this.saveFlowNodeInfoStore.bind(this)} onClose={this.closeNodeInfo.bind(this)}/>
                : null
              }
            </div>
          </div>
          <div className="wf-content">
            <FlowMap ref="ref_flowMap" flow={this.state.flowData.get("nodes")} readonly={false}
              onDrop={this.addNode.bind(this)} onDragOver={this.dragOver.bind(this)} onNodeClick={this.activeNode.bind(this)} onRemoveNode={this.removeNode.bind(this)}/>
          </div>
        </div>
      </div>
    ); 
  }
  setIsShowNodeInfo(event, checked){
    this.setState({
      isShowNodeInfo: !checked
    })
  }
  activeNode(unid, nodeId){
    let infoStore = this.props.formAction.getStore();
    infoStore.reset();
    if(unid === "__flow"){
      infoStore.cursor().merge(this.state.flowData.delete("nodes"));
    }else{
      let nodes = this.state.flowData.get("nodes");
      this.activeNodeId = nodeId;
      infoStore.cursor().merge(nodes.get(nodes.findIndex(item => {return item.get("unid") === unid})));
    }
    this.setState({
      showNodeInfo: true
    });
  }
  removeNode(unid){
    let nodes = this.state.flowData.get("nodes");
    delete this._nodeIdMap[unid];
    this.setState({
      flowData: this.state.flowData.set("nodes", nodes.delete(nodes.findIndex(item => {return item.get("unid") === unid}))),
      showNodeInfo: false
    })
  }
  saveFlowNodeInfoStore(event){
    event.preventDefault();
    event.stopPropagation();
    let infoStore = this.props.formAction.getStore().data();
    if(infoStore.get("@type")){
      //环节信息修改
      if(this.validateNode(infoStore)){
        let nodes = this.state.flowData.get("nodes");
        this._nodeIdMap[infoStore.get("unid")] = infoStore.get("id");
        this.activeNodeId = infoStore.get("id");
        this.setState({
          flowData: this.state.flowData.set("nodes", nodes.set(nodes.findIndex(item => {return item.get("unid") === infoStore.get("unid")}), infoStore))
        });
      }
    }else{
      //流程信息修改
      this.setState({
        flowData: this.state.flowData.merge(infoStore)
      });
    }
  }
  validateNode(newNode){
    let nodes = this.state.flowData.get("nodes");
    if(this.activeNodeId !== newNode.get("id") && nodes.findIndex(item => {return item.get("id") === newNode.get("id")}) > -1){
      alert("环节ID重复");
      return false;
    }
    return true;
  }
  closeNodeInfo(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      showNodeInfo: false
    })
  }
  dragStart(type, event){
    event.dataTransfer.setData("Text", type);
  }
  dragOver(event){
    event.preventDefault();
  }
  addNode(event){
    event.preventDefault();
    let type = event.dataTransfer.getData("Text");
    let newNode = this.getNewNode(type, event.clientX, event.clientY);
    let nodes = this.state.flowData.get("nodes");
    this._nodeIdMap[newNode.get("unid")] = newNode.get("id");
    this.setState({
      flowData: this.state.flowData.set("nodes", nodes.push(newNode))
    });
  }
  getNewNode(type, x, y){
    let defaultNodeInfo = this.getDefaultNodeInfo(type);
    return Immutable.fromJS(_.extend(defaultNodeInfo,{
      x: x - $(".wf-sidebar").outerWidth() + "px",
      y: y - 47 + $(".gm-scroll-view").scrollTop() + "px"
    }));
  }
  getNodeId(){
    let ids = [];
    this.state.flowData.get("nodes").forEach(node => {
      if((/\d/).test(node.get("id"))){
        ids.push(+node.get("id").replace(/\D/g, ""))
      }
    })
    if(ids.length === 0){
      return "node1";
    }
    ids.sort(function(a, b) {return a < b});
    return "node" + (+ids[0] + 1);
  }
  getDefaultNodeInfo(type){
    let name, id, unid = "";
    switch (type) {
      case "start":
        name = "开始";
        unid = id = "Start";
        break;
      case "end":
        name = "结束";
        unid = id = "End";
        break;
      case "decision":
        id = this.getNodeId();
        unid = "node"+new Date().getTime();
        name = "条件";
        break;
      default:
        id = this.getNodeId();
        unid = "node"+new Date().getTime();
        name = "未命名";
        break;
    }
    return {
      id: id,
      unid: unid,
      "@type": type,
      name: name,
    }
  }
}
