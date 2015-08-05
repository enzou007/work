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
  bindSession() {
    return $.get(`${this.getPath()}/@session`).done(resp => {
      this.getStore().cursor().get("session").merge(resp);
      return resp;
    });
  }
  bindFlow() {
    return $.get(`1/flow/${this.getFlowId()}`).done(resp => {
      this.getStore().cursor().get("flow").mergeDeep(resp);
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
  preview() {
    return $.post(`1/flow/${this.getFlowId()}/${this.getObjectId()}`, this.getStore().data().get("form").toJS()).done(resp => {
      return resp;
    });
  }
  save(option, callback) {
    let result = {
      url: "",
      isNewNote: !this.getObjectId()
    };
    return $.ajax({
      url: `${this.getPath()}/${this.getObjectId()}`,
      type: "POST",
      headers: {
        "FlowControlType": "save"
      },
      data: this.getStore().data().get("form").toJS()
    }).done(resp => {
      result.status = "succeed";
      result.url = `/form.html?form=${this.getFormPath()}&path=${this.getPath()}&objectId=${resp["@objectId"]}`;
      callback(result);
    }).fail(resp => {
      result.status = "failure";
      callback(result);
    });
  }
  submit(option, callback) {
    option.FlowControlType = "submit";
    return this.processFlow(option, callback);
  }
  reject(option, callback) {
    option.FlowControlType = "reject";
    return this.processFlow(option, callback);
  }
  jump(option, callback) {
    option.FlowControlType = "jump";
    return this.processFlow(option, callback);
  }
  processFlow(option, callback) {
    var result = {
      url: "",
      isNewNote: !this.getObjectId()
    };
    return $.ajax({
      url: `${this.getPath()}/nextNode/${this.getFlowId()}/${this.getObjectId()}`,
      type: "POST",
      headers: option,
      data: this.getStore().data().get("form").toJS()
    }).done(resp => {
      if (callback) {
        result.status = "succeed";
        result.url = `/form.html?form=${this.getFormPath()}&path=${this.getPath()}&objectId=${resp["@objectId"]}`;
        callback(result)
      }
    }).fail(resp => {
      if (callback) {
        result.status = "failure";
        callback(result)
      }
    })
  }
}
