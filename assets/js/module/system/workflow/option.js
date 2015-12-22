"use strict";

var BaseOption = require("../../baseOption");

module.exports = BaseOption.extend({
  Model: require("./model"),
  form: {
    "流程信息": "system/workflow/Workflow"
  },
  menu: [{
    name: "流程列表",
    ico: "fa fa-reorder",
    children:[{
      isDefault: true,
      name: "流程列表",
      column:[
        {label: "流程名称", dataKey: "name", width: "50%"},
        {label: "流程编号", dataKey: "id", width: "50%"}
      ]
    }]

  }]
});
