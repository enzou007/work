"use strict";

var Backbone = require("backbone"),
  Select = require("backbone.select");

var Model = Backbone.Model.extend({
  initialize: function () {
    Select.Me.applyTo(this);
  }
});

module.exports = Model;
