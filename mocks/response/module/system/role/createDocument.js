var File = require("../../../file");
var Mock = require("mockjs");

module.exports = function (data) {

  var docs = new File("mocks/response/module/system/role/docs.json");
  var doc = JSON.parse(data.body.content);

  doc["@objectId"] = Mock.Random.guid();

  docs.add(doc);
  docs.save();

  return {json:doc};
}
