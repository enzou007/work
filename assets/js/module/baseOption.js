"use strict";

var Backbone = require("backbone"),
  _ = require("underscore");

var viewFrameAction = require("../action/viewFrame");

var QueryCollection = require("../store/viewFrame/query");

var Base = function (model) {
  this.module = model || null;
  this.initialize.apply(this, arguments);
};

_.extend(Base.prototype, {
  initialize: function (model) {
    viewFrameAction.bind(this);
  },
  page: "form.html",
  form: "",
  menu: [],
  Container: require("../view/container/ViewFrame.jsx"),
  Toolbar: require("../view/container/viewFrame/Toolbar.jsx"),
  View: require("../view/container/viewFrame/ViewTable.jsx"),
  Model: require("./baseModel"),
  getContainer: function () {
    return this.Container;
  },
  getOption: function () {
    return _.pick(this, "page", "form", "Toolbar", "Model", "View");
  },
  getQueryCollection: _.once(function () {
    return new QueryCollection(this.menu, {
      parse: true,
      module: this.module
    });
  })
});

Base.extend = Backbone.Model.extend;

module.exports = Base;
