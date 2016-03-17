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
  label: "客户来源",
  dataKey: "kh_source",
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
    "新增个人客户信息": "Customer/retail/note"
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
      name: "已保存",
      isDefault: true,
      column: baseColumns
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
