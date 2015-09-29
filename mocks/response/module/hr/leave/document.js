var Document = require("../../Document");

module.exports = function (data) {
  var Doc = new Document({
    flowId: "leave",
    docType: "leave"
  })

  return {json:Doc.getDocument(data.params.objectId)};
}
