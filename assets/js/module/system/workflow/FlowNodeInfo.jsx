import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Form from 'Component/form/Form.jsx';
import FormControl from 'Component/form/FormControl.jsx';
import Tabs from 'Component/bootstrap/Tabs.jsx';

import 'rctui/input';
import 'Component/form/Radio.jsx';
import 'rctui/select';

const appType = [{
  id: "dyqh",
  text: "单一签核"
}, {
  id:"hq",
  text:"会签"
}, {
  id: "sq",
  text: "顺签"
}]

const whether = [{id: "yes", text: "是"},{id: "no", text: "否"}]

export default class FlowNodeInfo extends React.Component{
  state = {
    appList: []
  }
  componentWillMount() {
    $.get("/1/system/module", data => {
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
  render () {
    return (
      <Form layout="aligned" responsive={{xl:23}} form="" locked={false} channel={this.props.channel} store={this.props.store.data()}>
        { this.getForm() }
        <div className="modal-footer">
          <button type="button" className="btn btn-default btn-sm" onClick={this.props.onClose}>取消</button>
          <button type="button" className="btn btn-primary btn-sm" onClick={this.props.onSubmit}>确定</button>
        </div>
      </Form>
    );
  }
  getForm(){
    switch(this.props.store.data().get("@type")){
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
          <FormControl label="允许转办" name="zb" type="radio-group" data={whether} value="yes"/>
          <FormControl label="允许加签" name="jq" type="radio-group" data={whether} value="yes"/>
          <FormControl label="允许代办" name="db" type="radio-group" data={whether} value="yes"/>
          <FormControl label="允许驳回" name="bh" type="radio-group" data={whether} value="yes"/>
          <FormControl label="无处理人跳过" name="tg" type="radio-group" data={whether} value="yes"/>
          <FormControl label="消息通知" name="xx" type="radio-group" data={whether} value="yes"/>
          <FormControl label="邮件通知" name="yj" type="radio-group" data={whether} value="no"/>

        </div>
        <div tab="处理人">
          <FormControl label="环节名称" name="name" type="text"/>
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
