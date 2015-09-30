var Document = require("../../Document");
var _ = require("underscore");

module.exports = function (data) {
  var Doc = new Document({
    flowId: "card",
    docType: "card"
  })

  var doc = JSON.parse(data.body.content);
  var option = _.pick(data.header, "flowcontroltype", "flowusers", "flownodeid", "flowopinion");

  return {json:Doc.createDocument(doc, option)};
}
