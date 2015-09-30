"use strict";

module.exports = {
  view: {
    draft: [
      {label: "申请人", dataKey: "AppPsnCn", width: "16.5%"},
      {label: "申请日期", dataKey: "CreateDate", width: "16.5%"},
      //{label: "部门名称", dataKey: "DeptName", width: "16.5%"},
      {label: "职务", dataKey: "Post", width: "16.5%"},
      {label: "电话", dataKey: "Tel1", width: "16.5%"},
      {label: "数量", dataKey: "Number", width: "17.5%"}
    ],
    doing: [
      {label: "申请人", dataKey: "AppPsnCn", width: "14%"},
      {label: "申请日期", dataKey: "CreateDate", width: "14%"},
      //{label: "部门名称", dataKey: "DeptName", width: "14%"},
      {label: "职务", dataKey: "Post", width: "14%"},
      {label: "电话", dataKey: "Tel1", width: "14%"},
      {label: "数量", dataKey: "Number", width: "14%"},
      {label: "当前环节", dataKey: "@CurNodeName", width: "16%"}
    ],
    done: [
      {label: "申请人", dataKey: "AppPsnCn", width: "16.5%"},
      {label: "申请日期", dataKey: "CreateDate", width: "16.5%"},
      //{label: "部门名称", dataKey: "DeptName", width: "16.5%"},
      {label: "职务", dataKey: "Post", width: "16.5%"},
      {label: "电话", dataKey: "Tel1", width: "16.5%"},
      {label: "数量", dataKey: "Number", width: "17.5%"}
    ],
    all: [
      {label: "申请人", dataKey: "AppPsnCn", width: "14%"},
      {label: "申请日期", dataKey: "CreateDate", width: "14%"},
      //{label: "部门名称", dataKey: "DeptName", width: "14%"},
      {label: "职务", dataKey: "Post", width: "14%"},
      {label: "电话", dataKey: "Tel1", width: "14%"},
      {label: "数量", dataKey: "Number", width: "14%"},
      {label: "当前环节", dataKey: "@CurNodeName", width: "16%"}
    ]
  }
}
