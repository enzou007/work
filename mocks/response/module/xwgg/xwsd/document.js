var Document = require("../../Document");

module.exports = function (data) {
  var Doc = new Document({
    flowId: "xwsd",
    docType: "xwsd"
  })

  return {json:Doc.getDocument(data.params.objectId)};
}
