"use strict";

var BaseOption = require("../../baseOption");

var baseColumns = [{
  label: "类别编号",
  dataKey: "CLASS_ID",
  width: "20%"
}, {
  label: "类别名称",
  dataKey: "CLASS_NAME",
  width: "20%"
}, {
  label: "上级类别编号",
  dataKey: "P_CLASS_ID",
  width: "20%"
}, {
  label: "创建人",
  dataKey: "AgentPsn",
  width: "20%"
}, {
  label: "创建时间",
  dataKey: "CreateDate",
  width: "20%"
}];

module.exports = BaseOption.extend({
  Model: require("./model"),
  form: {
    "新增产品类别": "product/productClass/note"
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
