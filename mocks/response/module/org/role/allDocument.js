var File = require("../../../file");
var Paging = require("../../../Paging");
module.exports = function (data) {
  var docs = new File("mocks/response/module/org/role/docs.json");

  return Paging(docs.getData(), parseInt(data.query.page), parseInt(data.query.count))

}