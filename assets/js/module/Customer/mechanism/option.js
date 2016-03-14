"use strict";

var BaseOption = require("../../baseOption");

var baseColumns = [{
  label: "客户编号",
  dataKey: "cust_id",
  width: "15%"
}, {
  label: "客户名称",
  dataKey: "cust_name",
  width: "15%"
}, {
  label: "从事行业",
  dataKey: "industry",
  width: "15%"
}, {
  label: "客户类别",
  dataKey: "cust_type",
  width: "15%"
}, {
  label: "客户状态",
  dataKey: "cust_status",
  width: "15%"
}, {
  label: "创建日期",
  dataKey: "CreateDate",
  width: "15%"
}, {
  label: "创建人",
  dataKey: "AgentPsn",
  width: "10%"
}];

module.exports = BaseOption.extend({
  Model: require("./model"),
  form: {
    "新增企业信息": "Customer/mechanism/note"
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
