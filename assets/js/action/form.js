import Backbone from "backbone";
import _ from "underscore";
import $ from "jquery";
import {
  Store, msg
}
from 'iflux';

// 全局store
const formStore = Store({
  session: {},
  flow: {},
  log: [],
  form: {}
});

export var store = formStore;

// 表单操作
const formAction = {
  _options: {},
  resolve(search) {
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
    }
    if (!options.path) {
      throw Error(`Can't not get 'path' by location.search '${search}'`);
    }

    return this;
  },
  getFormPath() {
    return this._options.form;
  },
  getPath() {
    return this._options.path;
  },
  getFlowId() {
    return this._options.flowId;
  },
  getObjectId() {
    return this._options.objectId;
  },
  bindSession() {
    return $.get(`${this.getPath()}/@session`).done(resp => {
      formStore.cursor().get("session").merge(resp);
      return resp;
    });
  },
  bindFlow() {
    return $.get(`1/flow/${this.getFlowId()}`).done(resp => {
      formStore.cursor().get("flow").mergeDeep(resp);
      return resp;
    });
  },
  bindDocument() {
    return $.get(`${this.getPath()}/${this.getObjectId()}`).done(resp => {
      this._options.flowId = resp["@flowId"];
      formStore.cursor().get("form").merge(resp);
      return resp;
    });
  },
  bindFlowLog() {
    return $.get(`1/flow/${this.getFlowId()}/${this.getObjectId()}`).done(resp => {
      formStore.cursor().get("log").mergeDeep(resp);
      return resp;
    });
  },
  preview() {
    return $.post(`1/flow/${this.getFlowId()}/${this.getObjectId()}`, formStore.data().get("form").toJS()).done(resp => {
      return resp;
    });
  },
  save() {
    return $.ajax({
      url: `${this.getPath()}/${this.getObjectId()}`,
      type: "POST",
      header: {
        "FlowControlType": "save"
      },
      data: formStore.data().get("form").toJS()
    }).done(resp => {

    });
  },
  submit() {

  },
  reject() {

  },
  jump() {

  }
}

export var action = formAction;

//数据操作
msg.on("update", function (key, val) {
  if (key == null) return this;

  let attrs;
  if (typeof key === 'object') {
    attrs = key;
  } else {
    (attrs = {})[key] = val;
  }

  formStore.cursor().get("form").merge(attrs);
});

export var channel = {
  update: function (name, value) {
    msg.emit("update", name, value)
  }
};
