var File = require("../../file");

module.exports = function (data) {
  var docs = new File("mocks/static/system_workflow.json");

  var flows = docs.filter(function(doc){
    return doc.moduleId === data.params.moduleId;
  })

  return {json:{flows: flows}};
}
