"use strict";

var BaseOption = require("../../baseOption");

module.exports = BaseOption.extend({
  Model: require("./model/Personnel"),
  form: {
    "人员": "system/organization/Personnel"
  },
  View: require("View/container/OrgFrame.jsx"),
  DefaultButton: ["Delete", "Refresh", "Exports"],
  CustomButton: [
    require("View/container/OrgFrame/toolbar/Search.jsx"),
    require("View/container/OrgFrame/toolbar/Create.jsx")
  ],
  formURL: {
    personnel: "form.html?form=system/organization/Personnel&path=1/system/user",
    department: "form.html?form=system/organization/Department&path=1/system/department"
  },
  menu: [{
    name: "人员列表",
    ico: "fa fa-reorder",
    children:[{
      isDefault: true,
      name: "全部人员列表",
      path: "system/user",
      formPath: "system/organization/Personnel",
      column:[
        {label: "姓名", dataKey: "name", width: "50%"},
        {label: "编号", dataKey: "id", width: "50%"}
      ]
    }, {
      name: "人员列表-冻结",
      path: "system/user",
      formPath: "system/organization/Personnel",
      column:[
        {label: "姓名", dataKey: "name", width: "50%"},
        {label: "编号", dataKey: "id", width: "50%"}
      ]
    }]
  }]
});
