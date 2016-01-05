var File = require("../file");

module.exports = function (data) {
  var paths = [];
  var index = 1;
  while(data.params["path"+index]){
    paths.push(data.params["path"+index]);
    index++;
  }
  console.log("deleteDocument: " + paths.join("/"));
  var docs = new File("mocks/static/"+ paths.join("_") + ".json");

  var result = {status: 200, json: {info: "OK"}};
  try {
    docs.deleteByObjectId(data.body.objectIds);
    docs.save();
  } catch (e) {
    result.status = 500;
    result.json.info = e.toString();
  }

  return result;
}
