var _ = require("underscore"),
  departments = require("../../../static/department");

departments = _.chain(departments)
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
  var limit = data.query.limit || 50;

  var conditions = JSON.parse(data.header.condition);
  // 目前先只支持单条件
  var first = conditions[0];

  switch (first[0]) {
    case "objectId":
        var objectIds = first[2];

        result.json = _.filter(departments, function (item) {
          return _.indexOf(objectIds, item.objectId) !== -1;
        }).slice(0, limit);
      break;
    case "@key":
      var key = decodeURIComponent(first[2]);

      result.json = _.filter(departments, function (item) {
        return item.name.indexOf(key) !== -1 || item.shortName.indexOf(key) === 0
      }).slice(0, limit);
      break;
    case "parent":
      var parentId = first[2];

      result.json = _.filter(departments, function (item) {
        return item.parent === parentId;
      });
  }

  return result;
};
