"use strict";

var BaseModel = require("../../baseModel");

var Model = BaseModel.extend({

}, {
  fields: [
    {label: "角色名称", dataKey: "RoleName", type: "text"},
    {label: "角色编号", dataKey: "RoleID", type: "text"},

    {label: "部门", dataKey: "Departments", type: "department"},
    {label: "人员", dataKey: "Personnels", type: "personnel"}
  ]
});

module.exports = Model;
