"use strict";

var BaseOption = require("../../baseOption");

module.exports = BaseOption.extend({
  Model: require("./model"),
  form: {
    "菜单信息": "system/module/Module"
  },
  menu: [{
    name: "菜单列表",
    ico: "fa fa-reorder",
    children:[{
      isDefault: true,
      name: "菜单列表",
      column:[
        {label: "菜单名称", dataKey: "name", width: "20%"},
        {label: "菜单编号", dataKey: "@objectId", width: "20%"},
        {label: "路径", dataKey: "path", width: "20%"},
        {label: "父级", dataKey: "parentName", width: "20%"},
        {label: "序号", dataKey: "sort", width: "20%"},
      ]
    }]

  }]
});
