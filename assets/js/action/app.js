"use strict";

var React = require('react'),
  Backbone = require("backbone"),
  _ = require("underscore"),
  $ = require("jquery");

var Login = require("../view/login/Login.jsx");

var session = require("../store/session"),
  appStore = require("../store/app"),
  sessionAction = require("./session");

//在首页初始化时，登录框不需要屏蔽层
var LoginModalBackdrop = false;

//注册事件，控制ajax请求头
$(document).ajaxSend(function(event, jqXHR, options) {
  var url = options.url;
  if (url.slice(0, 4) !== "http" || url.indexOf(location.protocol + "//" + location.host + "/") === 0) {
    jqXHR.setRequestHeader("Authorization", " Bearer " + (session.getToken() || ""));
  }
});

//注册事件，响应特定错误码
$(document).ajaxError(function(event, jqXHR, settings, thrownError) {
  var url = settings.url;
//当为401错误时，打开登录层
  if (jqXHR.status === 401 && (url.slice(0, 4) !== "http" || url.indexOf(location.protocol + "//" + location.host + "/") === 0)) {
    Login.show({
      backdrop: LoginModalBackdrop
    });
  }
});

// 注册监听，当session与服务端同步完成时，启动应用
session.once("sync", function() {
  var App = React.createFactory(require("../view/App.jsx"));
// 显示页面
  React.render(App({
    model: appStore
  }), document.getElementById("app"));
// 登录成功后，超时登录框需要使用背景层做为遮罩
  LoginModalBackdrop = true;
});

var Action = Backbone.Router.extend({
  bootstrap: function() {
    if (session.isAnonymous()) {
      // 显示登录对话框，等待匿名用户完成登录
      Login.show({
        backdrop: LoginModalBackdrop
      });
    } else {
      // 校验用户Token，如果成功触发sync事件。如果校验失败，同样等待用户完成登录。
      sessionAction.ping();
    }
  }
});

module.exports = new Action();
