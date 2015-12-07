var _ = require("underscore"),
  departments = require("../../../static/department"),
  personnels = require("../../../static/personnel"),
  Paging = require("../../Paging");

module.exports = function (data) {

  if(data.params.objectId){
    var user = _.find(personnels, function(psn){
      return psn["@objectId"] === data.params.objectId;
    });
    user.departments = _.find(departments, function(dept){
      return dept["@objectId"] === user.departmentId;
    })

    user.departmentId = [user.departmentId];

    return {json: user}
  }

  var result = {},
    template = {};
  var limit = data.query.limit || 50;

  var conditions = JSON.parse(decodeURIComponent(data.header.condition));

  // 目前先只支持单条件
  var first = conditions[0];

  var users;
  if(first){
    switch (first[0]) {
      case "@objectId":
        var objectIds = first[2];
        users = _.filter(personnels, function (item) {
          return _.indexOf(objectIds, item["@objectId"]) !== -1;
        }).slice(0, limit);
        break;
      case "@key":
        var key = decodeURIComponent(first[2]);

        users = _.filter(personnels, function (item) {
          return item.name.indexOf(key) !== -1 || item.shortName.indexOf(key) === 0
        }).slice(0, limit);
        break;
      case "departmentId":
        var departmentId = first[2];

        users = _.filter(personnels, function (item) {
          return item.departmentId === departmentId;
        });
        break;
      default:
        users = personnels;
        break;
    }
  }else{
    users = personnels;
  }

  if(data.query.page !== undefined && data.query.count !== undefined){
    result = Paging(users, parseInt(data.query.page), parseInt(data.query.count))
  }else{
    result = {"json": users}
  }

  result.json = _.map(result.json, function (item) {
    item.departments = [_.findWhere(departments, {
      objectId: item.departmentId
    })];

    return item;
  });

  return result;
};
