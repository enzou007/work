var File = require("../../../file");
var _ = require("underscore");

module.exports = function (data) {

  var docs = new File("mocks/response/module/org/role/docs.json");
  var objectId = data.params.objectId;

  var olddoc =  _.find(docs.getData(), function (doc) {
    return doc["@objectId"] === objectId;
  });

  var doc = JSON.parse(data.body.content);
  var newDoc = _.extend(olddoc, doc);
  docs.save();

  return {json:newDoc};
}
