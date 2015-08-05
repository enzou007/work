var Document = require("../../Document");
var _ = require("underscore");

module.exports = function (data) {
  var Doc = new Document({
    flowId: "xwsd",
    docType: "xwsd"
  })

  var doc = data.body;
  var option = _.pick(data.header, "flowcontroltype", "flowusers", "flownodeid", "flowopinion");

  return {json:Doc.createDocument(doc, option)};
}
