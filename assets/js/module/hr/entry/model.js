"use strict";

var BaseModel = require("../../baseModel");

var Model = BaseModel.extend({

}, {
  fields: [
    {label: "代办人", dataKey: "AgentPsn", type: "person"},
    {label: "申请日期", dataKey: "CreateDate", type: "date"},
    {label: "所属部门", dataKey: "AgentDept", type: "department"},

    {label: "姓名", dataKey: "AppPsnCn", type: "text"},
    {label: "年龄", dataKey: "Age", type: "text"},
    {label: "性别", dataKey: "Sex", type: "select"},
    {label: "身份证号", dataKey: "CardNumber", type: "text"},
    {label: "出生日期", dataKey: "Birthday", type: "date"},
    {label: "学历", dataKey: "Degrees", type: "text"},
    {label: "户籍", dataKey: "Hukou", type: "text"},
    {label: "婚姻状况", dataKey: "Marriage", type: "text"},
    {label: "联系电话", dataKey: "Phone", type: "text"},

    {label: "员工工号", dataKey: "AppPsnNumber", type: "text"},
    {label: "入职部门", dataKey: "EntryDept", type: "department"},
    {label: "部门负责人", dataKey: "DeptLeader", type: "person"},
    {label: "职位", dataKey: "Post", type: "text"},
    {label: "级别", dataKey: "Level", type: "select"},
    {label: "聘用类型", dataKey: "EmployType", type: "select"},
    {label: "报到日期", dataKey: "ReportDate", type: "date"},
    {label: "入职日期", dataKey: "EntryDate", type: "date"},

    {label: "公司座机", dataKey: "ComTel", type: "text"},
    {label: "公司邮箱", dataKey: "ComEmail", type: "email"}
  ]
});

module.exports = Model;
