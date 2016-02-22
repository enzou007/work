var Flow = require("./Flow.js");

module.exports = function (data) {

  var doc = JSON.parse(data.body.content);

  var flowMng = new Flow(data.params.flowId, data.params.objectId, doc);

  var result = {};

  switch (data.header.flowcontroltype) {
    case "submit":
      console.log("previewNextNodes->submit: flowId=" + data.params.flowId + ", objectId=" + data.params.objectId);
      result.json = flowMng.getNextNodes(doc);
      break;
    case "reject":
      console.log("previewNextNodes->reject: flowId=" + data.params.flowId + ", objectId=" + data.params.objectId);
      result.json = flowMng.getDoneNodes();
      break;
    case "jump":
      console.log("previewNextNodes->jump: flowId=" + data.params.flowId + ", objectId=" + data.params.objectId);
      result.json = flowMng.getJumpNodes();
      break;
  }

  return result;
}
