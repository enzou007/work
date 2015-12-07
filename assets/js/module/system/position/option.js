"use strict";

var BaseOption = require("../../baseOption");

module.exports = BaseOption.extend({
  Model: require("./model"),
  form: {
    "岗位信息": "system/position/Position"
  },
  menu: [{
    name: "岗位列表",
    ico: "fa fa-reorder",
    children:[{
      isDefault: true,
      name: "岗位列表",
      column:[
        {label: "岗位名称", dataKey: "PositionName", width: "50%"},
        {label: "岗位编号", dataKey: "PositionID", width: "50%"}
      ]
    }]
  }]
});
