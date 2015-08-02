var Document = require("../../Document");
var _ = require("underscore");

module.exports = function (data) {
  var Doc = new Document({
    flowId: "xwsd",
    filePath: "mocks/response/module/xwgg/xwsd/docs.json"
  })

  var doc = data.body;
  var option = _.pick(data.header, "flowcontroltype", "flowusers", "flownodeid", "flowopinion");

  return {json:Doc.updateDocument(doc, option)};
}
