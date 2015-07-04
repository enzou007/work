"use strict";

var React = require('react'),
  Backbone = require("backbone"),
  _ = require("underscore"),
  $ = require("jquery");

var Login = require("../view/login/Login.jsx");

var session = require("../store/session"),
  moduleStore = require("../store/module"),
  appStore = require("../store/app"),
  sessionAction = require("./session");

// 在首页初始化时，登录框不需要屏蔽层
var LoginModalBackdrop = false;

// 注册事件，控制ajax请求头
$(document).ajaxSend(function(event, jqXHR, options) {
  var url = options.url;
  if (url.slice(0, 4) !== "http" || url.indexOf(location.protocol + "//" + location.host + "/") === 0) {
    jqXHR.setRequestHeader("Authorization", " Bearer " + (session.getToken() || ""));
  }
});

// 注册事件，响应特定错误码
$(document).ajaxError(function(event, jqXHR, settings, thrownError) {
  var url = settings.url;
  // 当为401错误时，打开登录层
  if (jqXHR.status === 401 && (url.slice(0, 4) !== "http" || url.indexOf(location.protocol + "//" + location.host + "/") === 0)) {
    Login.show({
      backdrop: LoginModalBackdrop
    });
  }
});

// 注册监听，当session与服务端同步完成时，启动应用
session.once("sync", function() {
  var App = React.createFactory(require("../view/App.jsx"));
  // 加载模块，激活路由
  moduleStore.fetch({
    remove: false
  }).done(function() {
    Backbone.history.start({
      pushState: false
    });
  });
  // 显示页面
  React.render(App({
    model: appStore
  }), document.getElementById("app"));
  // 登录成功后，超时登录框需要使用背景层做为遮罩
  LoginModalBackdrop = true;
});

var Action = Backbone.Router.extend({
  routes: {
    "": "loadHome",
    "home": "loadHome",
    ":notfound": "loadNotFoundContent"
  },
  _registerRoute: function(model) {
    if (model.getChildren().length === 0 && model.has("path")) {
      var path = model.get("path");
      this.route(path, path.replace(/\//g, ":"), function() {
        // 将与模块相关的代码进行分拆
        require.ensure(["../module/baseOption"], function(require) {
          // 与模块选项相关的代码，则使用bundle进行异步加载
          require("../module/" + path + "/option")(function(Module) {
            // 激活菜单项
            moduleStore.setActiveItem(model.id);
            // 激活视图框架
            var moduleOption = new Module(model);
            // 触发界面变更
            appStore.setAttrubute(_.extend(moduleOption.getOption(), {
              container: moduleOption.getContainer(),
              model: model,
              collection: moduleOption.getQueryCollection()
            }));
          })
        });
      });
    }
  },
  initialize: function() {
    moduleStore.forEach(this._registerRoute.bind(this));
    this.listenTo(moduleStore, "add", this._registerRoute);
  },
  loadHome: function() {
    moduleStore.setActiveItem("home");
    appStore.setAttrubute({
      container: require("../view/container/Home.jsx")
    });
  },
  loadNotFoundContent: function(route) {
    console.error("page " + route + " not found!!");
    appStore.setAttrubute({
      container: require("../view/container/404.jsx")
    });
    moduleStore.setActiveItem(null);
  },
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
