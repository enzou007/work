var Flow = require("./Flow");

module.exports = function (data) {
  console.log("getDefaultFlow: flowId=" + data.params.flowId);

  var flowMng = new Flow(data.params.flowId);

  return {json: flowMng.getDefaultFlow()};
}
