"use strict";

var BaseModel = require("../../baseModel");

var Model = BaseModel.extend({

}, {
  fields: [
    {label: "流程名称", dataKey: "FlowName", type: "text"},
    {label: "流程图", dataKey: "FlowMap", type: "text"}
  ]
});

module.exports = Model;
