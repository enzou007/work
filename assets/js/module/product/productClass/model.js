"use strict";

var BaseModel = require("../../baseModel");

var Model = BaseModel.extend({

}, {
  fields: [{
    label: "类别名称",
    dataKey: "CLASS_NAME",
    type: "text"
  }, {
    label: "类别编号",
    dataKey: "CLASS_ID",
    type: "text"
  }, {
    label: "上级类别编号",
    dataKey: "P_CLASS_ID",
    type: "text"
  }, {
    label: "创建人",
    dataKey: "AgentPsn",
    type: "personnel"
  }, {
    label: "创建时间",
    dataKey: "CreateDate",
    type: "date"
  }]
});

module.exports = Model;
