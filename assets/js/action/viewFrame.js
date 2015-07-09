"use strict";

var Backbone = require("backbone"),
  _ = require("underscore");

var QueryData = require("../store/viewFrame/queryData");

var Action = function () {
  this.module = null;
  this.Model = null;
  this.queryCollection = null;
  this.dataCollection = null;
  this.activated = null;
};

_.extend(Action.prototype, Backbone.Events, {
  clean: function () {
    if (this.module) {
      this.stopListening(this.module);
    }
    if (this.collection) {
      this.stopListening(this.collection);
    }
    return this;
  },
  bind: function (moduleOption) {
    this.clean();
    this.module = moduleOption.module;
    this.Model = moduleOption.Model;
    this.queryCollection = moduleOption.getQueryCollection();
    // 初始化当前项目
    this.toggleSearchItem(this.queryCollection.findWhere({
      isDefault: true
    }));
    // 监听模块
    this.listenTo(this.module, "sync", function () {
      var queries = this.module.get("queries");
      if (queries && queries.length > 0) {
        this.queryCollection.add({
          queryId: "query_custom",
          name: "常用检索",
          ico: "fa fa-reorder",
          children: queries.toJson()
        }, {
          parse: true
        });
      }
    });
    // 加载模块信息
    this.module.fetch();
    return this;
  },
  getQueryCollection: function () {
    return this.queryCollection;
  },
  getActivatedItem: function () {
    return this.activated;
  },
  setActiveItem: function (active) {
    if (this.activated == active) {
      return;
    }
    this.activated = active;
    this.queryCollection.setActiveItem(active);
  },
  buildDataCollection: function (Model) {
    return new QueryData(null, {
      model: Model,
      url: "/1/" + this.module.get("path")
    });
  },
  getDataCollection: function () {
    return this.dataCollection;
  },
  refreshDataCollection: function () {
    this.dataCollection.fetch({
      total: true,
      reset: true
    });
  },
  deleteSelectedData: function () {
    // TODO 实现删除
    this.dataCollection.fetch({
      reset: true
    });
  },
  toggleSearchItem: function (item) {
    this.setActiveItem(item);
    if (this.dataCollection == null) {
      this.dataCollection = this.buildDataCollection(this.Model);
    }
    this.refreshDataCollection();
  }
});


module.exports = new Action();
