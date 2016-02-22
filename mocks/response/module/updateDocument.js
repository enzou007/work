var File = require("../file");
var Mock = require("mockjs");
var _ = require("underscore");

delete require.cache["./flow/Flow"];
var Flow = require("./flow/Flow");

module.exports = function (data) {
  var paths = [];
  var index = 1;
  while(data.params["path"+index]){
    paths.push(data.params["path"+index]);
    index++;
  }

  var docs = new File("mocks/static/"+ paths.join("_") + ".json");

  var newDoc = JSON.parse(data.body.content);
  newDoc["@updatedAt"] = Mock.Random.now();

  if(newDoc["@flowId"]){
    //TODO 处理不同的提交类型
    var option = _.pick(data.header, "flowcontroltype", "flowusers", "flownodeid", "flowopinion");
    var flowMng = new Flow(newDoc["@flowId"], newDoc["@objectId"], newDoc);
    var node = flowMng.processFlow(option);
    newDoc["@curNodeId"] = node.id;
    newDoc["@curNodeName"] = node.name;
    console.log("updateDocument: " + paths.join("/") + " , FlowControlType: " + option.flowcontroltype);
  }else{
    console.log("updateDocument: " + paths.join("/"));
  }

  newDoc = docs.updateByObjectId(newDoc);
  docs.save();

  return {json: newDoc};
}
