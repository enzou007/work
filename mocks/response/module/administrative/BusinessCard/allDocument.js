var Document = require("../../Document");

module.exports = function (data) {
  var Doc = new Document({
    flowId: "card",
    docType: "card"
  })

  return Doc.getDocumentsByPage(parseInt(data.query.page), parseInt(data.query.count), JSON.parse(decodeURIComponent(data.header.condition)));
}
