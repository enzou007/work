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

var Action = Backbone.Router.extend({
  routes: {
    "": "loadHome",
    "home": "loadHome",
    ":notfound": "loadNotFoundContent"
  },
  _moduleOptions: {},
  _registerRoute: function (model) {
    var _this = this;
    if (model.getChildren().length === 0 && model.has("path")) {
      var path = model.get("path");
      this.route(path, path.replace(/\//g, ":"), function () {
        // 将与模块相关的代码进行分拆
        require.ensure(["../module/baseOption"], function (require) {
          // 与模块选项相关的代码，则使用bundle进行异步加载
          require("../module/" + path + "/option")(function (Module) {
            // 激活菜单项
            moduleStore.setActiveItem(model.id);
            // 构建模块基本信息
            var moduleOption = _this._moduleOptions[model.id] ? _this._moduleOptions[model.id] : _this._moduleOptions[model.id] = new Module(model);
            // 手动绑定视图框架
            moduleOption.bindViewFrame();
            // 触发界面变更
            appStore.setAttrubute(_.defaults(moduleOption.getOption(), {
              container: moduleOption.getContainer(),
              model: model,
              collection: moduleOption.getQueryCollection()
            }));
          })
        });
      });
    }
  },
  initialize: function () {
    moduleStore.forEach(this._registerRoute.bind(this));
    this.listenTo(moduleStore, "add", this._registerRoute);
  },
  loadHome: function () {
    moduleStore.setActiveItem("home");
    // 加载首页模块
    require("../module/home/option")(function (HomeModule) {
      var moduleOption = new HomeModule();
      appStore.setAttrubute(moduleOption.getOption());
    });
  },
  loadNotFoundContent: function (route) {
    console.error("page " + route + " not found!!");
    appStore.setAttrubute({
      container: require("../view/container/404.jsx")
    });
    moduleStore.setActiveItem(null);
  },
  bootstrap: function () {
    sessionAction.validate(function () {
      var App = React.createFactory(require("../view/App.jsx"));
      // 加载模块，激活路由
      moduleStore.fetch({
        remove: false
      }).done(function () {
        Backbone.history.start({
          pushState: false
        });
      });
      // 显示页面
      React.render(App({
        model: appStore
      }), document.getElementById("app"));
    });
  }
});

module.exports = new Action();
