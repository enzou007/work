var File = require("../file.js");
var Mock = require("mockjs");
var Flow = require("../flow/Flow.js");
var _ = require("underscore");

var Document = function(option) {
  this.docs = new File(FilePath[option.docType]);
  this.flow = new Flow(option.flowId);
  this.initialize(option);
}

var log = function(info){
  //console.log(Mock.Random.now() + ":  " + info);
}

_.extend(Document.prototype, {
  initialize: function(option) {
    this._option = option;
  },

  createDocument: function(doc, option){
    var objectId = Mock.Random.guid();
    doc["@objectId"] = objectId;
    doc["@flowId"] = this.flow.getFlowId();
    doc["@createDate"] = Mock.Random.now();

    this.flow.createFlow(objectId);
    var curNode = this.flow.getCurNode();
    doc["@CurNodeId"] = curNode.nodeId;
    doc["@CurNodeName"] = curNode.nodeName;

    if (option && option.flownodeid) {
      this.flow.setObjectId(objectId);
      var curNode = this.flow.submit(option);

      doc["@CurNodeId"] = curNode.nodeId;
      doc["@CurNodeName"] = curNode.nodeName;
    }
    this.docs.add(doc);
    this.docs.save();
    return doc;
  },
  updateDocument: function(doc, option){
    var objectId = doc["@objectId"];

    if (option && option.flownodeid) {
      this.flow.setObjectId(objectId);
      var curNode = this.flow.submit(option);

      doc["@CurNodeId"] = curNode.nodeId;
      doc["@CurNodeName"] = curNode.nodeName;
    }
    var newDoc = _.extend(this.getDocument(objectId), doc);
    this.docs.save();
    return newDoc;
  },
  getDocument: function(objectId){
    return _.find(this.getAllDocuments(), function (doc) {
      return doc["@objectId"] === objectId;
    });
  },
  getDocuments: function(callback){
    return _.filter(this.getAllDocuments(), callback);
  },
  getAllDocuments: function(){
    return this.docs.getData();
  },
  deleteDocument: function(objectIds){
    this.docs.setData(_.filter(this.getAllDocuments(), function(doc){
      return objectIds.indexOf(doc["@objectId"]) === -1;
    }));
    this.docs.save();
  },
  getDocumentsByPage: function(page, count, condition){
    var docs = this.getAllDocuments();

    if(condition){
      docs = this.getDocuments(function(doc){
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

      }.bind(this));
    }

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

var FilePath = {
  "xwsd": "mocks/response/module/xwgg/xwsd/docs.json",
  "entry": "mocks/response/module/hr/entry/docs.json"
}

module.exports = Document;
