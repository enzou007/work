"use strict";

var BaseModel = require("../../baseModel");

var Personnel = BaseModel.extend({

}, {
  fields: [
    {label: "员工编号", dataKey: "id", type: "text"},
    {label: "员工姓名", dataKey: "name", type: "text"},
    {label: "所属部门", dataKey: "departmentId", type: "department"},
    {label: "简称", dataKey: "shortName", type: "text"}
  ]
});

module.exports = Personnel;
