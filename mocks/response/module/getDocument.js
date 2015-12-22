var File = require("../file");

module.exports = function (data) {
  var paths = [];
  var index = 1;
  while(data.params["path"+index]){
    paths.push(data.params["path"+index]);
    index++;
  }
  console.log("getDocument: " + paths.join("/"));
  var docs = new File("mocks/static/"+ paths.join("_") + ".json");

  return {json: docs.findByObjectId(data.params.objectId)};
}
