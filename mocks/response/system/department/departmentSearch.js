var Mock = require("mockjs");

module.exports = function (data) {

  var result = {},
    template = {};
  var limit = data.query.limit || 50;

  var conditions = JSON.parse(data.header.condition);
  // 目前先只支持单条件
  var first = conditions[0];

  switch (first[0]) {
    case "objectId":
      var objectIds = first[2],
        templates = objectIds.map(function (objectId) {
          return {
            "objectId": objectId,
            "name": "@region"
          };
        });

        result.json = templates.map(function (template) {
          return Mock.mock(template);
        });
      break;
    case "@key":
      template["data|1-" + limit] = [{
        "objectId|24": "",
        "name": "@region",
        "parent": ""
      }];
      result.json = Mock.mock(template).data;
      break;
  }

  return result;
};
