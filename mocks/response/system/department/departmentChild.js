var _ = require("underscore"),
  departments = require("../../../static/department");

var departments = _.chain(departments)
  .sortBy(function (item) {
    return item.sort;
  })
  .map(function (item) {
    item.size = _.where(departments, {
      parent: item.objectId
    }).length;

    return item;
  }).value();

module.exports = function (data) {

  var result = {};
  var deptId = decodeURI(data.params.deptId);

  if(deptId === "@root"){
    deptId = null;
  }

  result.json = _.filter(departments, function (item) {
    return item.parent === deptId;
  });

  return result;
};
