"use strict";

var Backbone = require("backbone"),
  _ = require("underscore"),
  $ = require("jquery");

var QueryData = require("Store/viewFrame/queryData");

var Action = function () {
  this.module = null;
  this.Model = null;
  this._queryCollection = null;
  this._dataCollection = null;
  this._defaultItem = null;
  this._activated = null;
  this._option = null;
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
    this._option = moduleOption;
    this.module = moduleOption.module;
    this.Model = moduleOption.Model;
    this._queryCollection = moduleOption.getQueryCollection();
    this._defaultItem = this._queryCollection.findWhere({
      isDefault: true
    });
    // 初始化当前项目
    this.toggleSearchItem(this._defaultItem, true);
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
  getFormPath: function (){
    return this._activated.get("formPath") || _.values(this._option.form)[0];
  },
  getPath: function(){
    return this.getActivatedItem().get("path") || this.module.get("path")
  },
  getOption: function(){
    return this._option;
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
      url: "1/" + this.getPath()
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
    var objectIds = _.map(this._dataCollection.selected, function(model){
      return model.get("@objectId");
    }).join(";");

    return $.ajax({
      url: this._dataCollection.url,
      type: "DELETE",
      data: {objectIds:objectIds}
    }).done(function(){
      this._dataCollection.fetch({
        reset: true
      });
    }.bind(this));

    // return $.post(this._dataCollection.url+"/delete", {objectIds:objectIds})
    //   .done(function(){
    //     this._dataCollection.fetch({
    //       reset: true
    //     });
    //   }.bind(this));
  },
  toggleSearchItem: function (item, rebulid) {
    this.setActiveItem(item);
    if (this._dataCollection == null || rebulid) {
      this._dataCollection = this.buildDataCollection();
    }
    this.triggerSearch(item.get("condition"));
  },
  triggerSearch: function(condition){
    this._dataCollection.setCondition(condition);
    this.refreshDataCollection();
  },
});


module.exports = new Action();
