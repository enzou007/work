"use strict";

var Backbone = require("backbone"),
  _ = require("underscore");

var Action = function() {
  this.module = null;
  this.collection = null;
  this.activated = null;
};

_.extend(Action.prototype, Backbone.Events, {
  clean: function() {
    if (this.module) {
      this.stopListening(this.module);
    }
    if (this.collection) {
      this.stopListening(this.collection);
    }
    return this;
  },
  bind: function(moduleItem, queryCollection) {
    this.clean();
    this.module = moduleItem;
    this.collection = queryCollection;
    // 初始化当前项目
    this.toggleSearchItem(this.collection.findWhere({
      isDefault: true
    }));
    // 监听模块
    this.listenTo(this.module, "sync", function() {
      var queries = this.module.get("queries");
      if (queries && queries.length > 0) {
        this.collection.add({
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
  getQueryCollection: function() {
    return this.collection;
  },
  getActivatedItem: function() {
    return this.activated;
  },
  setActiveItem: function(active) {
    if (this.activated == active) {
      return;
    }
    this.activated = active;
    this.collection.setActiveItem(active);
  },
  toggleSearchItem: function (item) {
    this.setActiveItem(item);
  }
});


module.exports = new Action();
