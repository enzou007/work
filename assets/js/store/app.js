"use strict";

var Backbone = require("backbone");

var App = Backbone.Model.extend({
  defaults: {
    container: "noscript"
  },
  setAttrubute: function(attrs, options) {
    this.clear({
      silent: true
    }).set(attrs, options);
  }
});

module.exports = new App();
