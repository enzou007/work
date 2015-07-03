"use strict";

var Backbone = require("backbone"),
  _ = require("underscore");

var session = require("../store/session");

var Action = function() {

};

_.extend(Action.prototype, Backbone.Events, {
  login: function(info) {
    return session.save(info);
  },
  logout: function() {
    return session.destroy().done(function() {
      location.href = "/";
    });
  },
  ping: function() {
    return session.ping();
  }
});


module.exports = new Action();
