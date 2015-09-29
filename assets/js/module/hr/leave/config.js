"use strict";

module.exports = {
  view: {
    draft: [
      {label: "申请人", dataKey: "AppPsnCn", width: "16.5%"},
      {label: "申请日期", dataKey: "CreateDate", width: "16.5%"},
      {label: "假别", dataKey: "LeaveType", width: "16.5%"},
      {label: "开始时间", dataKey: "StartDate", width: "16.5%"},
      {label: "结束时间", dataKey: "EndDate", width: "16.5%"},
      {label: "请假时长", dataKey: "DateLength", width: "17.5%"}
    ],
    doing: [
      {label: "申请人", dataKey: "AppPsnCn", width: "14%"},
      {label: "申请日期", dataKey: "CreateDate", width: "14%"},
      {label: "假别", dataKey: "LeaveType", width: "14%"},
      {label: "开始时间", dataKey: "StartDate", width: "14%"},
      {label: "结束时间", dataKey: "EndDate", width: "14%"},
      {label: "请假时长", dataKey: "DateLength", width: "14%"},
      {label: "当前环节", dataKey: "@CurNodeName", width: "16%"}
    ],
    done: [
      {label: "申请人", dataKey: "AppPsnCn", width: "16.5%"},
      {label: "申请日期", dataKey: "CreateDate", width: "16.5%"},
      {label: "假别", dataKey: "LeaveType", width: "16.5%"},
      {label: "开始时间", dataKey: "StartDate", width: "16.5%"},
      {label: "结束时间", dataKey: "EndDate", width: "16.5%"},
      {label: "请假时长", dataKey: "DateLength", width: "17.5%"}
    ],
    all: [
      {label: "申请人", dataKey: "AppPsnCn", width: "14%"},
      {label: "申请日期", dataKey: "CreateDate", width: "14%"},
      {label: "假别", dataKey: "LeaveType", width: "14%"},
      {label: "开始时间", dataKey: "StartDate", width: "14%"},
      {label: "结束时间", dataKey: "EndDate", width: "14%"},
      {label: "请假时长", dataKey: "DateLength", width: "14%"},
      {label: "当前环节", dataKey: "@CurNodeName", width: "16%"}
    ]
  }
}
