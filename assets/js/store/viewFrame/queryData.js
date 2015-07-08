"use strict";

var Backbone = require("backbone"),
  _ = require("underscore"),
  Select = require("backbone.select");

var SORT_TYPES = [null, "ascending", "descending"];

var QueryData = Backbone.Collection.extend({
  options: {
    page: 1,
    count: 50
  },
  _total: 0,
  initialize: function (models, options) {
    this.url = options.url;
    Select.Many.applyTo(this, models, {
      enableModelSharing: true
    });
    this.on("sync", function (collection, resp, options) {
      this._total = options.xhr.getResponseHeader("total") || this._total;
    }.bind(this));
  },
  fetch: function (options) {
    options.data = _.defaults(options.data || {}, this.options);
    if (this._total <= 0 || options.total === true) {
      options.data = _.defaults(options.data, {
        total: true
      });
    }
    return QueryData.__super__.fetch.call(this, options);
  },
  getTotal: function () {
    return this._total;
  },
  setTotal: function (total) {
    this._total = total;
    return this;
  },
  getPerPage: function () {
    return this.options.count || 0;
  },
  setSort: function (name, state) {
    this.options.sort = name;
    this.options.order = SORT_TYPES[state];
    return this.fetch({
      reset: true
    });
  },
  setPage: function (options) {
    this.options.page = options.page || this.options.page;
    this.options.count = options.perPage || this.options.count;

    if (this.length <= this.options.count || this.options.page !== 1) {
      return this.fetch({
        reset: true,
        total: options.perPage ? true : false
      });
    } else {
      this.reset(this.slice(0, this.options.count));
    }
  },
  getPage: function () {
    return this.options.page;
  }
});

module.exports = QueryData;
