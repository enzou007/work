"use strict";

module.exports = {
  view: {
    draft: [
      {label: "代办人", dataKey: "AgentPsn", width: "12.5%"},
      {label: "申请日期", dataKey: "CreateDate", width: "12.5%"},
      {label: "姓名", dataKey: "AppPsnCn", width: "12.5%"},
      {label: "联系电话", dataKey: "Phone", width: "12.5%"},
      {label: "员工工号", dataKey: "AppPsnNumber", width: "12.5%"},
      {label: "职位", dataKey: "Post", width: "12.5%"},
      {label: "级别", dataKey: "Level", width: "12.5%"},
      {label: "入职日期", dataKey: "EntryDate", width: "12.5%"}
    ],
    doing: [
      {label: "代办人", dataKey: "AgentPsn",  width: "10%"},
      {label: "申请日期", dataKey: "CreateDate", width: "10%"},
      {label: "姓名", dataKey: "AppPsnCn", width: "10%"},
      {label: "联系电话", dataKey: "Phone", width: "10%"},
      {label: "员工工号", dataKey: "AppPsnNumber", width: "10%"},
      {label: "职位", dataKey: "Post", width: "10%"},
      {label: "级别", dataKey: "Level", width: "10%"},
      {label: "入职日期", dataKey: "EntryDate", width: "10%"},
      {label: "流程名称", dataKey: "@flowName", width: "10%"},
      {label: "当前环节", dataKey: "@curNodeName", width: "10%"}
    ],
    done: [
      {label: "代办人", dataKey: "AgentPsn", width: "12.5%"},
      {label: "申请日期", dataKey: "CreateDate", width: "12.5%"},
      {label: "姓名", dataKey: "AppPsnCn", width: "12.5%"},
      {label: "联系电话", dataKey: "Phone", width: "12.5%"},
      {label: "员工工号", dataKey: "AppPsnNumber", width: "12.5%"},
      {label: "职位", dataKey: "Post", width: "12.5%"},
      {label: "级别", dataKey: "Level", width: "12.5%"},
      {label: "入职日期", dataKey: "EntryDate", width: "12.5%"}
    ],
    all: [
      {label: "代办人", dataKey: "AgentPsn",  width: "11.2%"},
      {label: "申请日期", dataKey: "CreateDate", width: "11.1%"},
      {label: "姓名", dataKey: "AppPsnCn", width: "11.1%"},
      {label: "联系电话", dataKey: "Phone", width: "11.1%"},
      {label: "员工工号", dataKey: "AppPsnNumber", width: "11.1%"},
      {label: "职位", dataKey: "Post", width: "11.1%"},
      {label: "级别", dataKey: "Level", width: "11.1%"},
      {label: "入职日期", dataKey: "EntryDate", width: "11.1%"},
      {label: "当前环节", dataKey: "@curNodeName", width: "11.1%"}
    ]
  }
}
