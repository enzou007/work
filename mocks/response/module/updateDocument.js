var File = require("../file");
var Mock = require("mockjs");
var _ = require("underscore");
var Flow = require("./flow/Flow");

module.exports = function (data) {
  var paths = [];
  var index = 1;
  while(data.params["path"+index]){
    paths.push(data.params["path"+index]);
    index++;
  }
  console.log("updateDocument: " + paths.join("/"));
  var docs = new File("mocks/static/"+ paths.join("_") + ".json");

  var newDoc = JSON.parse(data.body.content);
  newDoc["@modifyDate"] = Mock.Random.now();

  if(newDoc["@flowId"] && data.header.flowcontroltype !== "save"){
    var option = _.pick(data.header, "flowcontroltype", "flowusers", "flownodeid", "flowopinion");
    var flowMng = new Flow(newDoc["@flowId"], newDoc["@objectId"]);
    var node = flowMng.submit(option);
    newDoc["@curNodeId"] = node.id;
    newDoc["@curNodeName"] = node.name;
  }

  newDoc = docs.updateByObjectId(newDoc);
  docs.save();

  return {json: newDoc};
}
