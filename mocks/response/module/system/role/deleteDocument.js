var File = require("../../../file");
var _ = require("underscore");
module.exports = function (data) {
  var docs = new File("mocks/response/module/system/role/docs.json");

  var result = {status: 200, json: {info: "OK"}};

  try {
    var objectIds = data.body.objectIds;
    docs.setData(_.filter(docs.getData(), function(doc){
      return objectIds.indexOf(doc["@objectId"]) === -1;
    }));

    docs.save();
  } catch (e) {
    result.status = 500;
    result.json.info = e;
  }
  return result;
}
