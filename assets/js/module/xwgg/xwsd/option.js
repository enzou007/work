"use strict";

var BaseOption = require("../../baseOption");

module.exports = BaseOption.extend({
  Model: require("./model"),
  menu: [{
    name: "按状态检索",
    ico: "fa fa-reorder",
    children: [{
      name: "草稿"
    }, {
      name: "审批中",
      isDefault: true,
      column: [{
        label: "标题",
        dataKey: "Subject",
        width: "40%"
      }, {
        label: "发布单位",
        dataKey: "SourceCompName",
        width: "10%"
      }, {
        label: "发布部门",
        dataKey: "NewSource",
        width: "10%"
      }, {
        label: "拟稿人",
        dataKey: "AppPsnCn",
        width: "25%"
      }, {
        label: "发布时间",
        dataKey: "PubDate",
        width: "15%"
      }],
      condition: [
        ["flowNode", "neq", "Start"],
        ["flowNode", "neq", "End"]
      ]
    }, {
      name: "已完结"
    }]
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
