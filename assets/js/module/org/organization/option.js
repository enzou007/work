"use strict";

var BaseOption = require("../../baseOption");
var action = require("../../../action/orgFrame")

module.exports = BaseOption.extend({
  Container: require("../../../view/container/OrgFrame.jsx"),
  View:{
    default:"",
    department:{
      columns:[
        {label: "部门名称", dataKey: "name", width: "50%"},
        {label: "部门编号", dataKey: "@objectId", width: "50%"}
      ],
      Model: require("./Department"),
      url: "1/system/department",
      formPath:"org/organization/view/Department"
    },
    personnel:{
      columns:[
        {label: "姓名", dataKey: "name", width: "50%"},
        {label: "编号", dataKey: "id", width: "50%"}
      ],
      Model: require("./Personnel"),
      url: "1/system/user",
      formPath:"org/organization/view/Personnel"
    }
  },
  bindViewFrame: function() {
    action.bind(this)
  }
});
