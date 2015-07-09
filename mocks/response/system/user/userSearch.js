module.exports = function(data) {

  var users = require("./userList.json");

  var key = data.query.key;

  var result;

  if(key){
    result = users.filter(function(item){
      return item.indexOf(key) > -1;
    });
  }else {
    result = users;
  }

  return {
    json:result
  };
};
