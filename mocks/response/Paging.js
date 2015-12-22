var _ = require("underscore");

function Paging(docs, page, count, condition) {

  if(condition){
    docs = getDocs(docs, condition);
  }

  var result = {};
  if(page == 0 && count == 0){
    return {
      json: docs
    }
  }
  page = page - 1;

  var len = docs.length;
  if (page > 0) {
    page = page * count;
    count = page + count;
  }

  if (count > len) {
    count = len;
  }

  result.json = docs.slice(page, count);
  result.header = {
    total: len
  }
  return result;
}

function getDocs(docs, condition){
  docs = _.filter(docs, function(doc){
    var key,value;
    for(var i = 0; i < condition.length; i++){
      if(doc[condition[i][0]] === undefined){
        return false;
      }

      key = condition[i][0];
      value = condition[i][2];

      switch (condition[i][1]) {
        case "eq":  //等于
          if(doc[key] !== value){
            return false;
          }
          break;
        case "neq":  //不等于
          if(doc[key] === value){
            return false;
          }
          break;
        case "le":  //包含
          if((doc[key].indexOf(value) === -1)){
            return false;
          }
          break;
        case "nle": //不包含
          if((doc[key].indexOf(value) > -1)){
            return false;
          }
          break;
        case "st":  //起始于
          if((doc[key].indexOf(value) !== 0)){
            return false;
          }
          break;
        case "in":  //部门 包含于

          break;
        case "nin": //部门 不包含于

          break;
        case "gt":  //date 大于
          if(doc[key] < value){
            return false;
          }
          break;
        case "gte": //date 大于等于
          if(!doc[key] >= value){
            return false;
          }
          break;
        case "lt":  //date 小于
          if(doc[key] > value){
            return false;
          }
          break;
        case "lte":  //date 小于等于
          if(!doc[key] <= value){
            return false;
          }
          break;
      }
    }
    return true;
  });
  return docs;
}

module.exports = Paging;
