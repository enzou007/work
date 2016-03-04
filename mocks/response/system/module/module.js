var File = require("../../file");

module.exports = function (data) {
  var flows = new File("mocks/static/system_workflow.json");
  var modules = new File("mocks/static/system_module.json");

  var moduleId = data.params.moduleId;

  var Module = modules.findByObjectId(moduleId);

  Module.flows = flows.filter(function(flow){
    return flow.moduleId === data.params.moduleId;
  });

  return {json: Module};
}
