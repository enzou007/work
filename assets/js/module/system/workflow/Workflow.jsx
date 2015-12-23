
import React from 'react';
import $ from 'jquery';
import { mixins } from 'iflux';
import FlowMap from "View/form/flowmap/FlowMap.jsx";
import action from './action';

import Navbar from "View/navbar/Navbar.jsx";
import { Checkbox } from 'Component/form/Checkbox.jsx';
import Gritter from 'Component/Gritter.jsx';

let FlowNodeInfo;
require("./FlowNodeInfo.jsx")(function (ModuleForm) {FlowNodeInfo = ModuleForm})

import 'Less/app/workflow.less';

var WorkflowForm = React.createClass({
  mixins: [mixins.StoreMixin(action.getStore())],
  componentWillMount() {
    action.bindDocument();
  },
  componentDidMount() {
    action.bindFlowMap(this.refs.ref_flowMap);

    window.wf = this;
    window.a = action;
  },
  saveFlowInfo(){
    action.saveFlow().then(data => {
      Gritter.show("保存成功", "y", () => {
        if(action.isNewNote()){
          window.location.href = `${window.location.href}&objectId=${data["@objectId"]}`;
        }
      });
    })
  },
  render() {
    let store = action.getStore().data();
    let showNodeInfo = store.get("form").count() > 0;

    return (
      <div className="workflow">
        <Navbar ico="fa fa-leaf" title={store.get("flow").get("name")}>
          <li><button className="btn btn-success" onClick={this.saveFlowInfo}>保存</button></li>
        </Navbar>
        <div className={"page-content" + (showNodeInfo ? " show-node-info" : "")}>
          <ul className="wf-sidebar dropdown-menu dropdown-info">
            <li><b>操作栏</b></li>
            <li className="divider"></li>
            <li className="wf-sidebar-item" draggable={true} dropzone="move" onDragStart={this.dragStart.bind(this, "start")}>开始</li>
            <li className="wf-sidebar-item" draggable={true} dropzone="move" onDragStart={this.dragStart.bind(this, "task")}>处理环节</li>
            <li className="wf-sidebar-item" draggable={true} dropzone="move" onDragStart={this.dragStart.bind(this, "decision")}>条件节点</li>
            <li className="wf-sidebar-item" draggable={true} dropzone="move" onDragStart={this.dragStart.bind(this, "end")}>结束</li>
            <li className="wf-sidebar-item" draggable={true} dropzone="move" onDragStart={this.dragStart.bind(this, "text")}>文本</li>
            <li className="divider"></li>
            <li><Checkbox onChange={this.setIsShowNodeInfo}>禁止弹出配置框</Checkbox></li>
          </ul>
          <div className="wf-info">
            <i className="fa fa-close" onClick={action.clearNodeInfo.bind(action)}></i>
            <div className="wf-info-content" id="workFlowNodeInfo">
              {
                showNodeInfo
                ? <FlowNodeInfo channel={action} store={store.get("form")} onSubmit={action.saveNodeInfo.bind(action)} onClose={action.clearNodeInfo.bind(action)} />
                : null
              }
            </div>
          </div>
          <div className="wf-content">
            <FlowMap ref="ref_flowMap" flow={store.get("flow").get("nodes")} readonly={false}
              onNodeClick={action.activeNode.bind(action)} onRemoveNode={action.removeNode.bind(action)}
              onDragOver={this.dragOver} onDrop={this.addNode}/>
          </div>
        </div>
      </div>
    );
  },
  setIsShowNodeInfo(event, checked){
    action.setIsShowNodeInfo(!checked);
  },
  dragStart(type, event){
    event.dataTransfer.setData("Text", type);
  },
  dragOver(event){
    event.preventDefault();
  },
  addNode(event){
    event.preventDefault();
    let type = event.dataTransfer.getData("Text");
    let x = event.clientX - $(".wf-sidebar").outerWidth() + "px";
    let y = event.clientY - 47 + $(".gm-scroll-view").scrollTop() + "px";
    action.addNode(type, x, y);
  }
})
module.exports = WorkflowForm;
