var Document = require("../../Document");

module.exports = function (data) {
  var Doc = new Document({
    flowId: "entry",
    docType: "entry"
  })

  return {json:Doc.getDocument(data.params.objectId)};
}
