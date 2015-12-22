var Flow = require("./Flow.js");

module.exports = function (data) {
  console.log("getNextNodes: flowId=" + data.params.flowId + ", objectId=" + data.params.objectId);
  var doc = JSON.parse(data.body.content);

  var flowMng = new Flow(data.params.flowId, data.params.objectId);

  var result = {};

  switch (data.header.flowcontroltype) {
    case "submit":
      result.json = flowMng.getNextNodes(doc);
      break;
    case "reject":
      result.json = flowMng.getDoneNodes();
      break;
  }

  return result;
}
