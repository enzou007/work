var File = require("../../../file");
var _ = require("underscore");

module.exports = function (data) {

  var docs = new File("mocks/response/module/org/role/docs.json");
  var objectId = data.params.objectId;
  var doc =  _.find(docs.getData(), function (doc) {
    return doc["@objectId"] === objectId;
  });

  return {json:doc};
}
