import $ from 'jquery';

import Action from './form';

export default class FlowAction extends Action {
  getDefaultStore() {
    return {
      session: {},
      module: {},
      flow: {},
      log: [],
      fields: {}
    };
  }
  getFormPath() {
    return this.getParam().form;
  }
  getFlowId() {
    return this.getParam().flowId;
  }
  getObjectId() {
    return this.getParam().objectId || "";
  }
  bindFlow() {
    return $.get(`1/system/flow/${this.getFlowId()}`).done(resp => {
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
      data: {content:JSON.stringify(this.getStore().data().get("form"))}
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
      data: {content:JSON.stringify(this.getStore().data().get("form"))}
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
