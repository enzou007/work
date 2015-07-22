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
            "id": "@first",
            "name": "@chineseName",
            "departments|1-3": [{
              "objectId|24": "",
              "name": "@area"
            }]
          };
        });

        result.json = templates.map(function (template) {
          return Mock.mock(template);
        });
      break;
    case "@key":
      template["data|1-" + limit] = [{
        "objectId|24": "",
        "id": "@first",
        "name": "@chineseName",
        "departments|1-3": [{
          "objectId|24": "",
          "name": "@area"
        }]
      }];
      result.json = Mock.mock(template).data;
      break;
  }

  return result;
};
