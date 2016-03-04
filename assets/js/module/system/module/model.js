"use strict";

var BaseModel = require("../../baseModel");

var Model = BaseModel.extend({

}, {
  fields: [
    {label: "名称", dataKey: "name", type: "text"},
    {label: "父级ID", dataKey: "parent", type: "text"},
    {label: "父级名称", dataKey: "parentName", type: "text"},
    {label: "编号", dataKey: "@objectId", type: "text"},
    {label: "路径", dataKey: "path", type: "text"},
    {label: "排序", dataKey: "sort", type: "text"},
    {label: "图标", dataKey: "ico", type: "text"},
  ]
});

module.exports = Model;
