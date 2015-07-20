var Mock = require("mockjs");

module.exports = function (data) {

  var result = {};

  var template = {
    "@flowId": "5582272444ae2b5937e53930",
    "@objectId": "THIS_IS_A_OBJECTID",
    "AppPsnCn": "@chineseName",
    "StDate": "@date",
    "Subject": "@title",
    "SourceCompName": "@sentence(2,3)",
    "NewSource": "@sentence(2,3)",
    "PubDate": "@date"
  };

  result.json = Mock.mock(template);

  return result;
};
