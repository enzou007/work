"use strict";

var BaseModel = require("../../baseModel");

var Model = BaseModel.extend({

}, {
  fields: [
    {label: "申请人", dataKey: "AppPsnCn", type: "person"},
    {label: "申请日期", dataKey: "CreateDate", type: "date"},
    {label: "所属部门", dataKey: "AppDept", type: "department"},
    {label: "加急", dataKey: "Urgent", type: "radio"},
    {label: "数量", dataKey: "Number", type: "text"},
    {label: "单双面", dataKey: "SingleSided", type: "radio"},

    {label: "部门名称", dataKey: "DeptName", type: "select"},
    {label: "职务", dataKey: "Post", type: "date"},
    {label: "电话1", dataKey: "Tel1", type: "date"},
    {label: "电话2", dataKey: "Tel2", type: "text"},
    {label: "传真1", dataKey: "Fax1", type: "text"},
    {label: "传真2", dataKey: "Fax2", type: "text"},
    {label: "手机1", dataKey: "Phone1", type: "text"},
    {label: "手机2", dataKey: "Phone2", type: "text"},

    {label: "Email1", dataKey: "Email1", type: "text"},
    {label: "Email2", dataKey: "Email2", type: "text"},
    {label: "邮编", dataKey: "ZipCode", type: "text"},
    {label: "地址", dataKey: "Address", type: "text"},
    {label: "网址", dataKey: "Weburl", type: "text"},
    {label: "备注", dataKey: "Reason", type: "text"}
  ]
});

module.exports = Model;
