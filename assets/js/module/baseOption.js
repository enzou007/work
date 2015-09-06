"use strict";

var Backbone = require("backbone"),
  _ = require("underscore");

var viewFrameAction = require("../action/viewFrame");

var QueryCollection = require("../store/viewFrame/query");

var Base = function (model) {
  this.module = model || null;
  this.initialize.call(this, model);
};

_.extend(Base.prototype, {
  initialize: function () {
    //viewFrameAction.bind(this);
  },
  page: "form.html",
  form: null,
  menu: [],
  Container: require("../view/container/ViewFrame.jsx"),
  View: require("../view/container/viewFrame/ViewTable.jsx"),
  Model: require("./baseModel"),
  viewButton: true,
  CustomButton: [],
  getContainer: function () {
    return this.Container;
  },
  getOption: function () {
    return _.pick(this, "page", "form", "Model", "View", "viewButton", "CustomButton");
  },
  getQueryCollection: function () {
    if(!this._QueryCollection){
      this._QueryCollection = new QueryCollection(this.menu, {
        parse: true,
        module: this.module
      });
    }
    return this._QueryCollection;
  },
  bindViewFrame: function(){
    viewFrameAction.bind(this);
  },
  // getQueryCollection: _.once(function () {
  //   return new QueryCollection(this.menu, {
  //     parse: true,
  //     module: this.module
  //   });
  // })
});

Base.extend = Backbone.Model.extend;

module.exports = Base;
