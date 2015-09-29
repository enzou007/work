var Document = require("../../Document");

module.exports = function (data) {
  var Doc = new Document({
    flowId: "leave",
    docType: "leave"
  })
  var result = {status: 200, json: {info: "OK"}};
  try {
    Doc.deleteDocument(data.body.objectIds);
  } catch (e) {
    result.status = 500;
    result.json.info = e;
  }
  return result;
}
