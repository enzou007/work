"use strict";

var BaseOption = require("../../baseOption");
var Config = require("./config.js")

module.exports = BaseOption.extend({
  Model: require("./model"),
  form: {
    "请假申请": "administrative/BusinessCard/Note"
  },
  menu: [{
    name: "按状态检索",
    ico: "fa fa-reorder",
    children: [
      {name: "草稿",   column: Config.view.draft, condition: [["@CurNodeId", "eq", "StartNode"]]},
      {name: "审批中", column: Config.view.doing, isDefault: true, condition: [["@CurNodeId", "neq", "StartNode"],["@CurNodeId", "neq", "EndNode"]]},
      {name: "已完结", column: Config.view.done, condition: [["@CurNodeId", "eq", "EndNode"]]},
      {name: "所有申请", column: Config.view.all}
    ]
  }, {
    name: "按分类检索",
    ico: "fa fa-reorder",
    children: [{
      name: "分类一",
      ico: "fa fa-reorder",
      children: [{
        name: "选项一"
      }, {
        name: "选项二"
      }, {
        name: "选项三"
      }, {
        name: "选项四"
      }]
    }, {
      name: "分类二",
      ico: "fa fa-reorder",
      children: [{
        name: "选项五"
      }, {
        name: "选项六"
      }, {
        name: "选项七"
      }, {
        name: "选项八"
      }]
    }]
  }]
});
