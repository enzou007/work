"use strict";

var Backbone = require("backbone"),
    Select = require("backbone.select");

var SORT_TYPES = [null, "ascending", "descending"];

var QuerData = Backbone.Collection.extend({
    options: null,
    _total: 0,
    initialize: function (models, options) {
        this.options = options;
        this.url = options.url;
        Select.Many.applyTo(this, models, {enableModelSharing: true});
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
        return this.fetch({reset: true});
    },
    setPage: function (options) {
        this.options.page = options.page;
        this.options.count = options.perPage || this.options.count || null;
        this.options.start = (options.page - 1) * this.options.count;
        return this.fetch({reset: true});
    },
    getPage: function () {
        return this.options.page;
    }
});

module.exports = QuerData;
