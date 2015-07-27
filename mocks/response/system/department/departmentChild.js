var Mock = require("mockjs");

module.exports = function (data) {

  var result = {},
    template = {};
  var deptId = decodeURIComponent(data.params.deptId);
  var top = 0;

  if(deptId === "@root"){
    deptId = null;
    top = 3;
  }

  template["data|" + top + "-10"] = [{
    "objectId": "@string('lower' + 'upper' + 'number', 24)",
    "name": "@region",
    "size|0-10": 1,
    "parent": deptId
  }];

  result.json = Mock.mock(template).data;

  return result;
};
