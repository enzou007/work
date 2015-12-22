var Flow = require("./Flow.js");

module.exports = function (data) {
  console.log("getDocFlow: flowId=" + data.params.flowId + ", objectId=" + data.params.objectId);
  
  var flowMng = new Flow(data.params.flowId, data.params.objectId);

  return {json: flowMng.getFlowInfo()};
}
