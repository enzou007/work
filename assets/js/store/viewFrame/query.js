"use strict";

var Backbone = require("backbone"),
  _ = require("underscore");

var Query = Backbone.Model.extend({
  idAttribute: "objectId",
  defaults: {
    queryId: null,
    name: "",
    ico: "",
    active: null,
    isDefault: null,
    href: null,
    target: null,
    column: null,
    condition: []
  },
  initialize: function () {
    if(!this.has("queryId")){
      this.set("queryId", _.uniqueId("query"), {silent: true});
    }
  },
  getParents: _.once(function () {
    var item = this,
      items = [];
    if (this.collection) {
      while (item = this.collection.findWhere({
          queryId: item.get("parent")
        })) {
        items.unshift(item);
      }
    }

    return items.slice(0);
  })
});

var Queries = Backbone.Collection.extend({
  model: Query,
  module: null,
  activated: null,
  initialize: function (models, options) {
    this.module = options.module;
  },
  url: function () {
    return "/1/module/" + this.module.id + "/query"
  },
  parse: function (resp) {
    return this._childParser(resp, null);
  },
  _childParser: function (list, parentId) {
    var result = [];

    for (var i = 0, len = list.length; i < len; i++) {
      var item = item = list[i];
      if (item) {
        item.queryId = item.queryId || _.uniqueId("query");
        item.parent = parentId;

        result.push(item);

        if (_.isArray(item.children)) {
          result = result.concat(this._childParser(item.children, item.queryId));
          delete item.children;
        }
      }
    }

    return result;
  },
  setActiveItem: function (active) {
    if (this.activated) {
      this.activated.set("active", false).getParents().forEach(function (item) {
        item.set("active", false);
      });
    }
    if (active !== null) {
      active.set("active", true).getParents().forEach(function (item) {
        item.set("active", true);
      });
    }
    this.activated = active;
    this.trigger("reset", this);
    return this;
  }
});

module.exports = Queries;
