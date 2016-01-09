import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Form from 'Component/form/Form.jsx';
import FormControl from 'Component/form/FormControl.jsx';
import Tabs from 'Component/bootstrap/Tabs.jsx';
import Gritter from 'Component/Gritter.jsx';

import 'Component/form/Radio.jsx';
import 'Component/form/Select.jsx';
import 'Component/form/FlowProcessors.jsx';
import 'rctui/input';

const whether = [{id: "true", text: "是"},{id: "false", text: "否"}];
const rejectType = [{
  id: "NONE", text: "禁止驳回"
}, {
    id: "BEFORE", text: "上一环节"
}, {
  id: "HISTORY", text: "所有环节"
}, {
  id: "RANGE", text: "自定义"
}];
const SignatureType = [{
  id: "ANY", text: "单一签核"
}, {
  id:"ALL", text:"会签"
}, {
  id: "ORDINAL", text: "顺签"
}];

export default class FlowNodeInfo extends React.Component{
  render () {
    var InfoForm = null;
    switch(this.props.store.get("@type")){
      case "end": InfoForm = StartForm; break;
      case "start": InfoForm = StartForm; break;
      case "text": InfoForm = TextForm; break;
      case "decision": InfoForm = DecisionForm; break;
      case "task": InfoForm = TaskForm; break;
      default: InfoForm = FlowForm; break;
    }
    return (
      <InfoForm {...this.props} />
    );
  }
}

class BaseInfoForm extends React.Component{
  handleSubmit(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.onSubmit()
    Gritter.show("保存成功", "y");
  }
  renderForm() {  }
  render () {
    return (
      <Form  hintType="pop" layout="aligned" responsive={{xl:23}} form="" locked={false} channel={this.props.channel} store={this.props.store}>
        { this.renderForm() }
        <div className="modal-footer">
          <button type="button" className="btn btn-default btn-sm" onClick={this.props.onClose}>取消</button>
          <button type="button" className="btn btn-primary btn-sm" onClick={this.handleSubmit.bind(this)}>确定</button>
        </div>
      </Form>
    );
  }
}

class FlowForm extends BaseInfoForm{
  state = {
    appList: this.props.channel.getModuleList()
  }
  renderForm () {
    return (
      <div>
        <FormControl label="流程编号" name="@objectId" type="text" readOnly={true}/>
        <FormControl label="流程名称" name="name" type="text"/>
        <FormControl label="应用" name="appId" type="select" data={this.state.appList} groupBy="parent"
          filterAble={true} optionTpl='<i class="{ico}"></i>  {name}-{path}' resultTpl="{name}" valueTpl="{objectId}"/>
        <FormControl label="是否启用" name="enabled" type="radio-group" data={whether}/>
        <FormControl label="允许重办" name="allowRestart" type="radio-group" data={whether}/>
        <FormControl label="创建人" name="createPsn" type="text" readOnly={true}/>
        <FormControl label="创建时间" name="@createDate" type="text" readOnly={true}/>
        <FormControl label="修改时间" name="@modifyDate" type="text" readOnly={true}/>
      </div>
    );
  }
}

class TaskForm extends BaseInfoForm{
  state = {
    showRejectRange: this.props.channel.getFormData().get("rejectType") === "RANGE",
    rejectNodes: []
  }
  rejectTypeChange(value){
    let state = {showRejectRange: false}
    if(value === "RANGE"){
      state.showRejectRange = true;
      if(this.state.rejectNodes.length === 0){
        state.rejectNodes = this.props.channel.getParentNodes(this.props.store);
      }
    }
    this.setState(state);
  }
  componentWillReceiveProps(nextProps, nextStates){
    this.setState({
      showRejectRange: nextProps.channel.getFormData().get("rejectType") === "RANGE",
      rejectNodes: nextProps.channel.getParentNodes(nextProps.store)
    })
  }
  renderForm () {
    return (
      <Tabs>
        <div tab="基本信息">
          <FormControl label="环节名称" name="name" type="text"/>
          <FormControl label="环节ID" name="id" type="text"/>
          <FormControl label="环节类型" name="@type" type="text" readOnly={true}/>
          <FormControl label="审批类型" name="SignatureType" type="select" data={SignatureType} optionTpl='{text}' resultTpl="{text}" valueTpl="{id}"/>
          <FormControl label="备注" name="description" type="textarea"/>
        </div>
        <div tab="操作">
          <FormControl label="环节名称" name="name" type="text"/>
          <FormControl label="允许转办" name="allowTurn" type="radio-group" data={whether}/>
          <FormControl label="允许加签" name="allowApostille" type="radio-group" data={whether}/>
          <FormControl label="允许代办" name="db" type="radio-group" data={whether}/>
          <FormControl label="驳回类型" name="rejectType" type="select" data={rejectType} onChange={this.rejectTypeChange.bind(this)}/>
          <FormControl label="驳回环节" name="rejectRange" type="select" data={this.state.rejectNodes} mult={true} sep="" show={this.state.showRejectRange}/>
          <FormControl label="无处理人跳过" name="allowEmptySkip" type="radio-group" data={whether}/>
          <FormControl label="同处理人跳过" name="allowSameSkip" type="radio-group" data={whether}/>
          <FormControl label="可更改处理人" name="allowChangePerson" type="radio-group" data={whether}/>
          <FormControl label="消息通知" name="sendMessage" type="radio-group" data={whether}/>
          <FormControl label="邮件通知" name="sendMail" type="radio-group" data={whether}/>
        </div>
        <div tab="处理人">
          <FormControl label="环节名称" name="name" type="text"/>
          <FormControl label="环节处理人" name="processors" type="processors"/>
        </div>
      </Tabs>
    );
  }
}

class StartForm extends BaseInfoForm{
  renderForm () {
    return (
      <div>
        <FormControl label="环节名称" name="name" type="text" readOnly={true}/>
        <FormControl label="环节ID" name="id" type="text" readOnly={true}/>
        <FormControl label="环节类型" name="@type" type="text" readOnly={true}/>
      </div>
    );
  }
}

class DecisionForm extends BaseInfoForm{
  renderForm () {
    return (
      <div>
        <FormControl label="描述" name="name" type="text"/>
        <FormControl label="环节ID" name="id" type="text"/>
        <FormControl label="环节类型" name="@type" type="text" readOnly={true}/>
        <FormControl label="条件描述" name="script" style={{height: "200px"}} type="textarea"/>
      </div>
    );
  }
}

class TextForm extends BaseInfoForm{
  renderForm () {
    return (
      <div>
        <FormControl label="文本" name="name" type="textarea"/>
        <FormControl label="环节类型" name="@type" type="text" readOnly={true}/>
      </div>
    );
  }
}
