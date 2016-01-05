import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Form from 'Component/form/Form.jsx';
import FormControl from 'Component/form/FormControl.jsx';
import Tabs from 'Component/bootstrap/Tabs.jsx';

import 'Component/form/Radio.jsx';
import 'Component/form/Personnel.jsx'
import 'rctui/input';
import 'rctui/select';

const appType = [{
  id: "ANY", text: "单一签核"
}, {
  id:"ALL", text:"会签"
}, {
  id: "ORDER", text: "顺签"
}];

const rejectType = [{id: "ALL", text: "所有环节"}, {id: "PARENT", text: "上一环节"}, {id: "Custom", text: "自定义"}]
const whether = [{id: "true", text: "是"},{id: "false", text: "否"}];

export default class FlowNodeInfo extends React.Component{
  state = {
    appList: []
  }
  componentWillMount() {
    this.props.channel.getModuleList().done(data => {
      let parentMap = {};
      let appList = [];
      _.each(data, mdl => {
        if(mdl.path.indexOf("system") === -1){
          if(mdl.parent){
            mdl.parent = parentMap[mdl.parent];
            appList.push(mdl);
          }else{
            parentMap[mdl.objectId] = mdl.name;
          }
        }
      });
      this.setState({
        appList
      })
    })
  }
  handleSubmit(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.onSubmit()
  }
  render () {
    return (
      <Form  hintType="pop" layout="aligned" responsive={{xl:23}} form="" locked={false} channel={this.props.channel} store={this.props.store}>
        { this.getForm() }
        <div className="modal-footer">
          <button type="button" className="btn btn-default btn-sm" onClick={this.props.onClose}>取消</button>
          <button type="button" className="btn btn-primary btn-sm" onClick={this.handleSubmit.bind(this)}>确定</button>
        </div>
      </Form>
    );
  }
  getForm(){
    switch(this.props.store.get("@type")){
      case "start": return this.getStartForm();
      case "text": return this.getTextForm();
      case "decision": return this.getDecisionForm();
      case "task": return this.getTaskForm();
      case "end": return this.getEndForm();
      default: return this.getFlowForm();
    }
  }
  getFlowForm(){
    return (
      <div>
        <FormControl label="流程编号" name="@objectId" type="text" readOnly={true}/>
        <FormControl label="流程名称" name="name" type="text"/>
        <FormControl label="应用" name="appId" type="select" data={this.state.appList} groupBy="parent"
          filterAble={true} optionTpl='<i class="{ico}"></i>  {name}-{path}' resultTpl="{name}" valueTpl="{objectId}"/>
        <FormControl label="是否启用" name="enabled" type="radio-group" data={whether} value="yes"/>
        <FormControl label="是否重办" name="restart" type="radio-group" data={whether} value="yes"/>
        <FormControl label="创建人" name="createPsn" type="text" readOnly={true}/>
        <FormControl label="创建时间" name="createDate" type="text" readOnly={true}/>
        <FormControl label="修改时间" name="updateDate" type="text" readOnly={true}/>
      </div>
    );
  }
  getStartForm(){
    return (
      <div>
        <FormControl label="环节名称" name="name" type="text" readOnly={true}/>
        <FormControl label="环节ID" name="id" type="text" readOnly={true}/>
        <FormControl label="环节类型" name="@type" type="text" readOnly={true}/>
      </div>
    )
  }
  getEndForm(){
    return (
      <div>
        <FormControl label="环节名称" name="name" type="text" readOnly={true}/>
        <FormControl label="环节ID" name="id" type="text" readOnly={true}/>
        <FormControl label="环节类型" name="@type" type="text" readOnly={true}/>
      </div>
    );
  }
  getTaskForm(){
    return (
      <Tabs>
        <div tab="基本信息">
          <FormControl label="环节名称" name="name" type="text"/>
          <FormControl label="环节ID" name="id" type="text"/>
          <FormControl label="环节类型" name="@type" type="text" readOnly={true}/>
          <FormControl label="审批类型" name="appType" type="select" data={appType}
            optionTpl='{text}' resultTpl="{text}" valueTpl="{id}" value="dyqh"/>
          <FormControl label="备注" name="bz" type="textarea"/>
        </div>
        <div tab="操作">
          <FormControl label="允许转办" name="zb" type="radio-group" data={whether} value="true"/>
          <FormControl label="允许加签" name="jq" type="radio-group" data={whether} value="true"/>
          <FormControl label="允许代办" name="db" type="radio-group" data={whether} value="true"/>
          <FormControl label="允许驳回" name="bh" type="radio-group" data={whether} value="true"/>
          <FormControl label="驳回类型" name="bh-t" type="select" data={rejectType} value="true"/>
          <FormControl label="驳回环节" name="bh-t" type="select" mult={true} data={rejectType} value="true"/>
          <FormControl label="无处理人跳过" name="tg" type="radio-group" data={whether} value="true"/>
          <FormControl label="同处理人跳过" name="ttg" type="radio-group" data={whether} value="true"/>
          <FormControl label="可更改处理人" name="allowChangePerson" type="radio-group" data={whether} value="false"/>
          <FormControl label="消息通知" name="xx" type="radio-group" data={whether} value="true"/>
          <FormControl label="邮件通知" name="yj" type="radio-group" data={whether} value="false"/>

        </div>
        <div tab="处理人">
          <FormControl label="环节名称" name="name" type="text"/>
          <FormControl label="环节处理人" name="users" type="personnel" mult={true}/>
        </div>
      </Tabs>
    );
  }
  getDecisionForm(){
    return (
      <div>
        <FormControl label="描述" name="name" type="text"/>
        <FormControl label="环节ID" name="id" type="text"/>
        <FormControl label="环节类型" name="@type" type="text"/>
      </div>
    );
  }
  getTextForm(){
    return (
      <div>
        <FormControl label="文本" name="name" type="textarea"/>
        <FormControl label="环节类型" name="@type" type="text"/>
      </div>
    );
  }
}
