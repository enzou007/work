"use strict";

var BaseModel = require("../../baseModel");

var Model = BaseModel.extend({

}, {
  fields: [
    {label: "岗位名称", dataKey: "PositionName", type: "text"},
    {label: "岗位编号", dataKey: "PositionID", type: "text"}
  ]
});

module.exports = Model;
