"use strict";

var BaseOption = require("../../baseOption");

var baseColumns = [{
  label: "标题",
  dataKey: "Subject",
  width: "25%"
}, {
  label: "发布单位",
  dataKey: "SourceCompName",
  width: "17.5%"
}, {
  label: "发布部门",
  dataKey: "NewSource",
  width: "17.5%"
}, {
  label: "拟稿人",
  dataKey: "AgentPsn",
  width: "15%"
}, {
  label: "申请日期",
  dataKey: "CreateDate",
  width: "15%"
}, {
  label: "发布时间",
  dataKey: "PubDate",
  width: "10%"
}];

module.exports = BaseOption.extend({
  Model: require("./model"),
  form: {
    "新增欠款清单": "cancel/receive/note"
  },
  menu: [{
    name: "按状态检索",
    ico: "fa fa-reorder",
    children: [{
      name: "草稿",
      condition: [
        ["@CurNodeId", "eq", "Start"]
      ]
    }, {
      name: "审批中",
      isDefault: true,
      column: baseColumns,
      condition: [
        ["@CurNodeId", "neq", "Start"],
        ["@CurNodeId", "neq", "End"]
      ]
    }, {
      name: "已完结",
      condition: [
        ["@CurNodeId", "eq", "End"]
      ]
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
