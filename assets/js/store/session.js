"use strict";

var TOKEN_KEY = "userToken";

var Backbone = require("backbone"),
  Validation = require("backbone-validation"),
  _ = require("underscore"),
  Cookies = require("cookies-js");

var STORAGE_KEY = null;

var Session = Backbone.Model.extend({
  idAttribute: "token",
  urlRoot: "1/session",
  defaults: {
    token: localStorage.getItem(TOKEN_KEY) || Cookies.get(TOKEN_KEY),
    password: null,
    objectId: null
  },
  validation: {
    password: [{
      required: true,
      msg: "请输入密码"
    }, {
      minLength: 6,
      msg: "密码长度不足"
    }]
  },
  initialize: function() {
    this.once("sync", function() {
      STORAGE_KEY = "LTSOFT_SHELL_" + this.get("id");
      var localJSON = localStorage.getItem(STORAGE_KEY);
      if (localJSON) {
        this.set(_.extend(JSON.parse(localJSON), this.toJSON()));
      } else {
        // 触发写入本地缓存的动作
        this.trigger("change");
      }
    });

    this.on("change", function() {
      if (STORAGE_KEY !== null) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(_.pick(this.toJSON(), "mini-menu")));
      }
    });

    this.on("error", function(model, resp) {
      if (resp.status === 401) {
        this.clearToken();
      }
    }).on("destroy", this.clearToken);
  },
  parse: function(resp, options) {
    // 清掉请求时写入的密码
    this.unset("password", {
      slient: true
    });
    // 在转换时将服务端返回的Token记录到本地
    if (this.get("remember")) {
      localStorage.setItem(TOKEN_KEY, resp.token);
    } else {
      Cookies.set(TOKEN_KEY, resp.token);
    }
    return resp;
  },
  ping: function() {
    return this.fetch({
      url: this.urlRoot + "/me"
    });
  },
  isAnonymous: function() {
    return !this.has("token");
  },
  getToken: function() {
    return this.get("token");
  },
  clearToken: function() {
    this.unset("token", {
      slient: true
    });
    localStorage.removeItem(TOKEN_KEY);
    Cookies.expire(TOKEN_KEY);
  }
});
// 混入Backbone.Validation
_.extend(Session.prototype, Validation.mixin);

module.exports = new Session();
