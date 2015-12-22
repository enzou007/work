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
  console.log("createDocument: " + paths.join("/"));
  var docs = new File("mocks/static/"+ paths.join("_") + ".json");

  var doc = JSON.parse(data.body.content);
  var objectId = Mock.Random.guid();

  doc["@objectId"] = objectId;
  doc["@createDate"] = Mock.Random.now();

  if(doc["@flowId"]){
    var option = _.pick(data.header, "flowcontroltype", "flowusers", "flownodeid", "flowopinion");
    var flowMng = new Flow(doc["@flowId"]);
    flowMng.createFlow(objectId);
    if(data.header.flowcontroltype === "save"){
      flowMng.saveFlow();
      doc["@curNodeId"] = "Start";
      doc["@curNodeName"] = "开始";
    }else{
      var node = flowMng.submit(option);
      doc["@curNodeId"] = node.id;
      doc["@curNodeName"] = node.name;
    }
  }

  docs.add(doc);
  docs.save();

  return {json: doc};
}
