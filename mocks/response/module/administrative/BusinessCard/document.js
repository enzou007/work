var Document = require("../../Document");

module.exports = function (data) {
  var Doc = new Document({
    flowId: "card",
    docType: "card"
  })

  return {json:Doc.getDocument(data.params.objectId)};
}
