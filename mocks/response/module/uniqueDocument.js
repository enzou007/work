var File = require("../file");

module.exports = function (data) {
  var paths = [];
  var index = 1;
  while(data.params["path"+index]){
    paths.push(data.params["path"+index]);
    index++;
  }
  console.log("uniqueDocument: " + paths.join("/"));
  var key = data.query.key;
  var value = data.query.value;
  // var unique = data.query.unique;

  var docs = new File("mocks/static/"+ paths.join("_") + ".json");

  var doc = docs.find(function(doc){
    // for(var i = 0; i < unique.length; i++){
    //   if(doc[unique[i].key] !== unique[i].value){
    //     return false;
    //   }
    // }
    // return true;
    return doc[key] === value;
  })

  if(doc){
    return {json:{"status":"exist"}};
  }else{
    return {json:{"status":"none"}};
  }
}
