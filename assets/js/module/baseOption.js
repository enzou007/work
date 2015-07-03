"use strict";

var Backbone = require("backbone"),
  _ = require("underscore");

var viewFrameAction = require("../action/viewFrame");

var QueryCollection = require("../store/viewFrame/query");

var Base = function(model) {
  this.module = model;

  viewFrameAction.bind(model, this.getQueryCollection());
  this.initialize.apply(this, arguments);
};

_.extend(Base.prototype, {
  initialize: function() {},
  page: "",
  form: "",
  menu: [],
  Container: require("../view/container/ViewFrame.jsx"),
  Toolbar: require("../view/container/viewFrame/Toolbar.jsx"),
  Model: null,
  getContainer: function() {
    return this.Container;
  },
  getOption: function() {
    return _.extend(_.pick(this, "page", "form", "Toolbar", "Model"));
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
