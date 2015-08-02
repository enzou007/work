var Document = require("../../Document");

module.exports = function (data) {
  var Doc = new Document({
    flowId: "xwsd",
    filePath: "mocks/response/module/xwgg/xwsd/docs.json"
  })

  return Doc.getDocumentsByPage(parseInt(data.query.page), parseInt(data.query.count));
}
