import $ from 'jquery';

import Action from './form';

export default class FlowAction extends Action {
  getDefaultStore() {
    return {
      session: {},
      flow: {},
      log: [],
      form: {}
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
      this.getStore().cursor().get("form").set("@flowId", this.getFlowId());
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
  preview(FlowControlType) {
    return $.ajax({
      url: `1/flow/${this.getFlowId()}/${this.getObjectId()}`,
      type: "POST",
      headers: {
        "FlowControlType": FlowControlType
      },
      data: {content:JSON.stringify(this.getStore().data().get("form"))}
    })
  }
  save(option) {
    return $.ajax({
      url: `${this.getPath()}/${this.getObjectId()}`,
      type: "POST",
      headers: {
        "FlowControlType": "save"
      },
      data: {content:JSON.stringify(this.getStore().data().get("form"))}
    })
  }
  submit(option) {
    option.FlowControlType = "submit";
    return this.processFlow(option);
  }
  reject(option) {
    option.FlowControlType = "reject";
    return this.processFlow(option);
  }
  jump(option) {
    option.FlowControlType = "jump";
    return this.processFlow(option);
  }
  processFlow(option) {
    return $.ajax({
      url: `${this.getPath()}/nextNode/${this.getFlowId()}/${this.getObjectId()}`,
      type: "POST",
      headers: option,
      data: {content:JSON.stringify(this.getStore().data().get("form"))}
    })
  }
}
