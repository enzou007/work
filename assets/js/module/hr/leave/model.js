"use strict";

var BaseModel = require("../../baseModel");

var Model = BaseModel.extend({

}, {
  fields: [
    {label: "申请人", dataKey: "AppPsnCn", type: "person"},
    {label: "申请日期", dataKey: "CreateDate", type: "date"},
    {label: "所属部门", dataKey: "AgentDept", type: "department"},

    {label: "假别", dataKey: "LeaveType", type: "select"},
    {label: "开始时间", dataKey: "StartDate", type: "date"},
    {label: "结束时间", dataKey: "EndDate", type: "date"},
    {label: "请假时长", dataKey: "DateLength", type: "text"},
    {label: "事由", dataKey: "Reason", type: "text"}
  ]
});

module.exports = Model;
