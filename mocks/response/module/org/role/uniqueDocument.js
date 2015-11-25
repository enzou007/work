var File = require("../../../file");
var _ = require("underscore");

module.exports = function (data) {

  var docs = new File("mocks/response/module/org/role/docs.json");
  var key = data.query.key;
  var value = data.query.value;
  console.log(data);
  var doc =  _.find(docs.getData(), function (doc) {
    return doc[key] === value;
  });
console.log(doc);
  if(doc){
    return {json:{"status":"exist"}};
  }else{
    return {json:{"status":"none"}};
  }


}
