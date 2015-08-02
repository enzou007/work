var File = require("../file.js");
var Mock = require("mockjs");
var Flow = require("../flow/Flow.js");
var _ = require("underscore");

var Document = function(option) {
  this.docs = new File(option.filePath);
  this.flow = new Flow(option.flowId);
  this.initialize(option);
}

var log = function(info){
  //console.log(Mock.Random.now() + ":  " + info);
}

_.extend(Document.prototype, {
  initialize: function(option) {

  },

  createDocument: function(doc, option){
    var objectId = Mock.Random.guid();
    doc["@objectId"] = objectId;
    doc["@flowId"] = this.flow.getFlowId();
    doc["@createDate"] = Mock.Random.now();
    this.docs.add(doc);
    this.flow.createFlow(objectId);
    this.docs.save();

    if (option && option.flownodeid) {
      log("createDoc ==> flow next " + option.flownodeid);
      this.flow.setObjectId(objectId);
      this.flow.submit(option);
    }
    return doc;
  },
  updateDocument: function(doc, option){
    var objectId = doc["@objectId"];
    var newDoc = _.extend(this.getDocument(objectId), doc);

    if (option && option.flownodeid) {
      log("editDoc ==> flow next " + option.flownodeid);
      this.flow.setObjectId(objectId);
      this.flow.submit(option);
    }

    return newDoc;
  },
  getDocument: function(objectId){
    return _.find(this.getAllDocuments(), function (doc) {
      return doc["@objectId"] === objectId;
    });
  },
  getDocuments: function(callback){
    return _.filter(this.getAllDocuments(), callback(doc));
  },
  getAllDocuments: function(){
    return this.docs.getData();
  },
  deleteDocument: function(objectIds){

  },
  getDocumentsByPage: function(page, count){
    var docs = this.getAllDocuments();
    var result = {};

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
});

module.exports = Document;
