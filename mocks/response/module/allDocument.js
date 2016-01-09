var File = require("../file");

module.exports = function (data) {
  var paths = [];
  var index = 1;
  while(data.params["path"+index]){
    paths.push(data.params["path"+index]);
    index++;
  }
  console.log("allDocument: " + paths.join("/"));
  var docs = new File("mocks/static/"+ paths.join("_") + ".json");

  var condition = data.header.condition ? JSON.parse(decodeURIComponent(data.header.condition)) : [];

  var page = data.query.page ? parseInt(data.query.page) : 0;

  var count = data.query.count ? parseInt(data.query.count) : 0;

  return docs.getDataByPage(page, count, condition);
}
