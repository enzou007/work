import $ from 'jquery';

import Action from './form';

export default class FlowAction extends Action {
  getDefaultStore() {
    return {
      session: {},
      flow: {},
      log: [],
      form: {
        "@curNodeId": "Start",
        "@flowId": this.getFlowId()
      }
    };
  }
  setField(key, val) {
    if (key == null) return this;

    val = this.parseValue(key, val);
    if (typeof key === 'object') {
      this.getStore().cursor().get("form").merge(val);
    } else {
      this.getStore().cursor().get("form").set(key, val);
    }
    return this;
  }
  getFormPath() {
    return this.getParam().form;
  }
  getPath() {
    return this.getParam().path;
  }
  getFlowId() {
    return this.getParam().flowId;
  }
  getObjectId() {
    return this.getParam().objectId || "";
  }
  isNewNote(){
    return !this.getObjectId();
  }
  bindSession() {
    return $.get(`${this.getPath()}/@session`).done(resp => {
      this.getStore().cursor().get("session").merge(resp);
      return resp;
    });
  }
  bindFlow() {
    return $.get(`1/flow/${this.getFlowId()}`).done(resp => {
      this.getStore().cursor().get("flow").mergeDeep(resp);
      this.getStore().cursor().get("form").merge({
        "@flowId": resp["@objectId"],
        "@flowName": resp["name"]
      });
      return resp;
    });
  }
  bindDocument() {
    return $.get(`${this.getPath()}/${this.getObjectId()}`).done(resp => {
      this._param.flowId = resp["@flowId"];
      this.getStore().cursor().get("form").merge(resp);
      return resp;
    });
  }
  bindFlowLog() {
    return $.get(`1/flow/${this.getFlowId()}/${this.getObjectId()}`).done(resp => {
      this.getStore().cursor().mergeDeep(resp);
      return resp;
    });
  }
  reload(){
    window.location.reload();
  }
  getCurNode(){
    if(this.getStore("flow").size === 0){
      return null;
    }
    let curNodeId = this.getStore("form").get("@curNodeId");
    return this.getStore("flow").get("nodes").find(node => node.get("id") === (curNodeId || "Start"));
  }
  preview(FlowControlType) {
    return $.ajax({
      url: `1/flow/${this.getFlowId()}/${this.getObjectId()}`,
      type: "POST",
      headers: {
        "FlowControlType": FlowControlType
      },
      data: {content:JSON.stringify(this.getStore("form"))}
    })
  }
  save(option) {
    return $.ajax({
      url: `${this.getPath()}/${this.getObjectId()}`,
      type: "POST",
      headers: {
        "FlowControlType": "save"
      },
      data: {content:JSON.stringify(this.getStore("form"))}
    })
  }
  //提交
  submit(option) {
    option.FlowControlType = "submit";
    return this.processFlow(option);
  }
  //驳回
  reject(option) {
    option.FlowControlType = "reject";
    return this.processFlow(option);
  }
  //强制跳转
  jump(option) {
    option.FlowControlType = "jump";
    return this.processFlow(option);
  }
  //加签
  apostille(option) {
    option.FlowControlType = "apostille";
    return this.processFlow(option);
  }
  //转办
  turn(option) {
    option.FlowControlType = "turn";
    return this.processFlow(option);
  }
  //终止
  stopFlow(){
    var option={FlowControlType: "stop"};
    return this.processFlow(option);
  }
  //催办
  press(){
    var option={FlowControlType: "press"};
    return this.processFlow(option);
  }
  //通知
  notify(option){
    option.FlowControlType = "notify";
    return this.processFlow(option);
  }
  //抽单
  withdraw(){
    var option={FlowControlType: "withdraw"};
    return this.processFlow(option);
  }
  //权限变更
  access(option){
    option.FlowControlType = "access";
    return this.processFlow(option);
  }
  processFlow(option) {
    return $.ajax({
      url: `${this.getPath()}/nextNode/${this.getFlowId()}/${this.getObjectId()}`,
      type: "POST",
      headers: option,
      data: {content:JSON.stringify(this.getStore("form"))}
    })
  }
}
