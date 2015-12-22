var Flow = require("./Flow");

module.exports = function (data) {
  console.log("getNextNodes: flowId=" + data.params.flowId);
  
  var flowMng = new Flow(data.params.flowId);

  return {json: flowMng.getFlowInfo().flow};
}
