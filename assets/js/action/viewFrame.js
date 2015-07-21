"use strict";

var Backbone = require("backbone"),
  _ = require("underscore");

var QueryData = require("../store/viewFrame/queryData");

var Action = function () {
  this.module = null;
  this.Model = null;
  this._queryCollection = null;
  this._dataCollection = null;
  this._defaultItem = null;
  this._activated = null;
};

_.extend(Action.prototype, Backbone.Events, {
  clean: function () {
    if (this.module) {
      this.stopListening(this.module);
    }
    return this;
  },
  bind: function (moduleOption) {
    this.clean();
    this.module = moduleOption.module;
    this.Model = moduleOption.Model;
    this._queryCollection = moduleOption.getQueryCollection();
    this._defaultItem = this._queryCollection.findWhere({
      isDefault: true
    });
    // 初始化当前项目
    this.toggleSearchItem(this._defaultItem);
    // 监听模块
    this.listenTo(this.module, "sync", function () {
      var queries = this.module.get("queries");
      if (queries && queries.length > 0) {
        this.addCustomQuery(queries.toJSON());
      }
    });
    // 加载模块信息
    this.module.fetch();
    return this;
  },
  getQueryCollection: function () {
    return this._queryCollection;
  },
  getDefaultItem: function () {
    return this._defaultItem;
  },
  getActivatedItem: function () {
    return this._activated;
  },
  setActiveItem: function (active) {
    if (this._activated !== active) {
      this._activated = active;
      this._queryCollection.setActiveItem(active);
    }
    return this;
  },
  buildDataCollection: function () {
    return new QueryData(null, {
      model: this.Model,
      url: "1/" + this.module.get("path")
    });
  },
  addCustomQuery: function (items) {
    this._queryCollection.add([{
      queryId: "query_custom",
      name: "常用检索",
      ico: "fa fa-reorder",
      children: items
    }], {
      parse: true
    });
  },
  getDataCollection: function () {
    return this._dataCollection;
  },
  refreshDataCollection: function () {
    this._dataCollection.fetch({
      total: true,
      reset: true
    });
  },
  deleteSelectedData: function () {
    // TODO 实现删除
    this._dataCollection.fetch({
      reset: true
    });
  },
  toggleSearchItem: function (item) {
    this.setActiveItem(item);
    if (this._dataCollection == null) {
      this._dataCollection = this.buildDataCollection();
    }
    this._dataCollection.setCondition(item.get("condition"));
    this.refreshDataCollection();
  }
});


module.exports = new Action();
