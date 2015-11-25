"use strict";

var BaseModel = require("../../baseModel");

var Department = BaseModel.extend({

}, {
  fields: [
    {label: "部门编号", dataKey: "@objectId", type: "text"},
    {label: "部门名称", dataKey: "name", type: "text"},
    {label: "简称", dataKey: "shortName", type: "text"}
  ]
});

module.exports = Department;
