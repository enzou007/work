"use strict";

var BaseModel = require("../../baseModel");

var Model = BaseModel.extend({

}, {
  fields: [{
    label: "标题1",
    dataKey: "Subject",
    type: "text"
  }, {
    label: "发布单位",
    dataKey: "SourceCompName",
    type: "department"
  }, {
    label: "发布部门",
    dataKey: "NewSource",
    type: "department"
  }, {
    label: "拟稿人",
    dataKey: "AppPsnCn",
    type: "person"
  }, {
    label: "发布日期",
    dataKey: "PubDate",
    type: "date"
  }]
});

module.exports = Model;
