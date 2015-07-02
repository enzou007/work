"use strict";

module.exports = {
  menu: [{
    name: "按状态检索",
    ico: "fa fa-reorder",
    children: [{
      name: "草稿"
    }, {
      name: "审批中",
      isDefault: true
    }, {
      name: "已完结"
    }]
  }]
};
