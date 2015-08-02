var Document = require("../../Document");

module.exports = function (data) {
  var Doc = new Document({
    flowId: "xwsd",
    filePath: "mocks/response/module/xwgg/xwsd/docs.json"
  })

  return {json:Doc.getDocument(data.params.objectId)};
}
