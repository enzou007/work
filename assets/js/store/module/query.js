"use strict";

var Backbone = require("backbone");

var Query = Backbone.Model.extend({
    parse: function () {
        // 这里要实现一些表达式转换，如@CUR_USER=当前用户ID之类的玩意
    }
});

var Queries = Backbone.Collection.extend({
    model: Query,
    moduleId: null,
    initialize: function (models, options) {
        this.moduleId = options.moduleId;
    },
    url: function () {
        return "1/module/" + this.moduleId + "/query"
    }
});

module.exports = Queries;
