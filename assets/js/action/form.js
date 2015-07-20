import Backbone from "backbone";
import _ from "underscore";
import $ from "jquery";

let Action = function () {
  this._flow = {};
  this._log = [];
  this._store = {};
};

_.extend(Action.prototype, Backbone.Events, {
  reset: function () {

  },
  bind(search) {
    let options = {},
      key = "",
      value = null;

    if (search[search.length - 1] !== "&") {
      search += "&";
    }

    search.split("").forEach((s) => {
      if (s !== "=" && value === null) {
        key += s;
      } else if (s === "=") {
        value = "";
      } else if (s !== "&" && value !== null) {
        value += s;
      } else if (s === "&") {
        options[decodeURIComponent(key)] = decodeURIComponent(value) || true;
        key = "";
        value = null;
      }
    });

    if (options.path) {
      options.path = _.compact(options.path.split("/")).join("/");
    }

    this._options = Object.assign({
      flowId: "",
      path: "",
      objectId: ""
    }, options);

    if (!options.form) {
      throw Error(`Can't not get 'form' by location.search '${search}'`);
    } else if (options.flowId && !options.objectId) {
      this.bindFlow(options.flowId);
    } else if (options.path && options.objectId) {
      this.bindDocument(options.path, options.objectId).then((resp) => {
        this.bindFlowLog(resp["@flowId"], options.objectId);
      });
    } else {
      throw Error(`Can't not fetch a document or a flow by location.search '${search}'`);
    }
  },
  getFormPath() {
    return this._options.form;
  },
  getFlow() {
    return this._flow;
  },
  getDocument() {
    return this._store;
  },
  getOperateLog() {
    return this._log;
  },
  bindFlow(flowId) {
    this._options.flowId = flowId;
    return $.get(`/1/flow/${flowId}`).done(resp => {
      Object.assign(this._flow, resp);
      this.trigger("load");
      return resp;
    });
  },
  bindDocument(path, objectId) {
    return $.get(`${path}/${objectId}`).done(resp => {
      Object.assign(this._store, resp);
      this.trigger("load");
      return resp;
    });
  },
  bindFlowLog(flowId, objectId) {
    return $.get(`/1/flow/${flowId}/${objectId}`).done(resp => {
      Object.assign(this._flow, resp.flow);
      this._log.push(...resp.log);
      this.trigger("load");
      return resp;
    });
  },
  preview() {
    return $.post(`/1/flow/${this._options.flowId}/${this._options.objectId}`, this._store).done(resp => {
      return resp;
    });
  },
  save() {
    return $.ajax({
      url: `${this._options.path}/${this._options.objectId}`,
      type: "POST",
      header: {
        "FlowControlType": "save"
      },
      data: this._store
    }).done(resp => {

    });
  },
  submit() {

  },
  reject() {

  },
  jump() {

  }
});

export default new Action();
