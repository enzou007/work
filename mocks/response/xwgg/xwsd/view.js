var Mock = require("mockjs");

module.exports = function (data) {
  var result = {};

  if (data.query.total) {
    result.header = {
      total: Mock.Random.integer(20, 500)
    };
  }

  var template = {};
  template["data|" + data.query.count] = [{
    "@objectId|24": "",
    "Subject": "@title",
    "SourceCompName": "@sentence(2,3)",
    "NewSource": "@sentence(2,3)",
    "AppPsnCn": "@chineseName",
    "PubDate": "@date"
  }];

  result.json = Mock.mock(template).data;

  return result;
};
