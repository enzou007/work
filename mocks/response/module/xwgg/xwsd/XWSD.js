var File = require("../../file.js");
var Mock = require("mockjs");
var Flow = require("../../flow/Flow.js");
var _ = require("underscore");

var docs = new File("mocks/response/xwgg/xwsd/docs.json");

var flow = new Flow("xwsd");

module.exports = function (data) {
  var log = function (info) {
    //console.log(Mock.Random.now() + ":  " + info);
  }

  this.createDoc = function (doc, option) {
    log("creatre doc");
    var objectId = Mock.Random.guid();
    doc["@objectId"] = objectId;
    doc["@flowId"] = flow.getFlowId();
    doc["@createDate"] = Mock.Random.now();

    docs.add(doc);
    flow.createFlow(objectId);
    docs.save();
    if (option && option.flownodeid) {
      log("createDoc ==> flow next " + option.flownodeid);
      flow.setObjectId(objectId);
      flow.submit(option);
    }
    return doc;
  }

  this.editDoc = function (objectId, doc, option) {
    log("edit doc");
    var docIndex = _.findLastIndex(docs.getData(), {
      "@objectId": objectId
    });
    var newdoc = _.extend(docs.getData()[docIndex], doc);
    if (option && option.flownodeid) {
      log("editDoc ==> flow next " + option.flownodeid);
      flow.setObjectId(objectId);
      flow.submit(option);
    }
    docs.save();
    return newdoc;
  }

  this.getDocument = function (objectId) {
    return _.find(docs.getData(), function (doc) {
      return doc["@objectId"] === objectId;
    });
  }

  this.getDocList = function () {
    return docs.getData();
  }

  function doPost() {
    var result = {
      status: 200
    };
    //apimock 将所有字母都转换成了小写.
    var option = _.pick(data.header, "flowcontroltype", "flowusers", "flownodeid", "flowopinion");

    try {
      if (data.params && data.params.objectId) {
        result.json = this.editDoc(data.params.objectId, data.body, option);
      } else {
        result.json = this.createDoc(data.body, option);
      }
    } catch (e) {
      console.log(e);
      log("ERROR " + e);
      result.status = 500;
    }
    return result;
  }

  function doGet() {
    var result = {
      status: 200
    };
    if (data.params && data.params.objectId) {
      result.json = this.getDocument(data.params.objectId);
    } else {
      var docs = this.getDocList();
      var page = data.query.page - 1;
      var count = parseInt(data.query.count);
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
    }

    return result;
  }

  if (data) {
    switch (data.method.toUpperCase()) {
      case "POST":
        return doPost();
        break;
      case "GET":
        return doGet();
        break;
    }
  }

};
