"use strict";

var BaseOption = require("../../baseOption");


var baseColumns = [{
  label: "产品名称",
  dataKey: "prt_name",
  width: "30%"
}, {
  label: "产品编号",
  dataKey: "prt_id",
  width: "20%"
}, {
  label: "产品类别",
  dataKey: "class_id",
  width: "10%"
}, {
  label: "币种",
  dataKey: "currency",
  width: "10%"
}, {
  label: "拟稿人",
  dataKey: "AgentPsn",
  width: "15%"
}, {
  label: "申请日期",
  dataKey: "CreateDate",
  width: "15%"
}];

module.exports = BaseOption.extend({
  Model: require("./model"),
  form: {
    "新增移民类产品": "product/productImmS/note"
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
