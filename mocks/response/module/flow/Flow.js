var File = require("../../file.js");
var _ = require("underscore");
var Mock = require("mockjs");


function Flow(flowId, objectId) {
  this.flowDocs = new File("mocks/static/system_docflows.json");
  this.flows = new File("mocks/static/system_workflow.json");
  this._flowId = flowId;
  this._objectId = objectId;
  this._flow = null;
  this.initialize();
}

_.extend(Flow.prototype, {
  initialize: function(){
    if(!this._flowId){
      throw Error("FlowMng not flowId");
    }
    if(this._objectId){
      this._flow = this.getDocFlow(this._flowId, this._objectId);
    }else{
      this._flow = {"@flowId": this._flowId, flow: this.getDefaultFlow(this._flowId)}
    }
  },
  getDocFlow: function(flowId, objectId){
    return this.flowDocs.find(function(flow){
      return flow["@flowId"] === flowId && flow["@objectId"] === objectId;
    })
  },
  getDefaultFlow: function(flowId){
    var flow = this.flows.findByObjectId(flowId);
    var node = _.find(flow.nodes, function(node){
      return node.id === "Start";
    });
    node.cur = true;
    return flow;
  },
  getFlowInfo: function(){
    return this._flow;
  },
  setObjectId: function(objectId){
    this._objectId = objectId;
    this._flow = this.getDocFlow(flowId, objectId);
  },

  createFlow: function(objectId){
    this._objectId = objectId;
    this._flow["@objectId"] = objectId;
    this.flowDocs.add(this._flow);
    return this._flow;
  },
  getDoneNodes: function(){
    var result = [];
    var curNode = this.getCurNode();
    if(curNode.id === "Start"){
      return result;
    }

    if(!curNode.allowRejectNodes){
      return this.getAllDoneNodes(curNode);
    }

    if(curNode.allowRejectNodes === "PARENT"){
      result = this.getParentDoneNodes(curNode);
    }else if(curNode.allowRejectNodes === "ALL"){
      result = this.getAllDoneNodes(curNode);
    }else{
      result = this.getCustomDoneNodes(curNode);
    }
    return result;
  },
  getParentDoneNodes: function(curNode, skip){
    var result = [];
    var parentNodes = _.filter(this._flow.flow.nodes, function(node){
      return node.outputs.indexOf(curNode.id) > -1;
    });
    _.each(parentNodes, function(node){
      if(node.done || skip){
        if(node["@type"] === "decision"){
          result = result.concat(this.getParentDoneNodes(node));
        }else{
          result.push(node);
        }
      }
    }.bind(this));
    return result;
  },
  getAllDoneNodes: function(curNode){
    var result = [];
    if(curNode.id === "Start"){
      return [curNode];
    }
    var parentNodes = _.filter(this._flow.flow.nodes, function(node){
      return node.outputs.indexOf(curNode.id) > -1;
    })
    _.each(parentNodes, function(node){
      if(node.done){
        if(node["@type"] !== "decision"){
          result.push(node);
        }
        result = result.concat(this.getAllDoneNodes(node));
      }
    }.bind(this));
    return result;
  },
  getCustomDoneNodes: function(curNode){
    var custcomNodeIds = curNode.allowRejectNodes.split(";");
    var result = [];
    _.each(custcomNodeIds, function(id){
      var node = this.getNode(id);
      if(node.done && node["@type"] !== "decision" && node["@type"] !== "text"){
        result.push(node);
      }
    }.bind(this));
    return result;
  },
  getNextNodes: function(doc, curNode){
    var result = [];
    curNode = curNode || this.getCurNode();
    var nextNodes = _.map(curNode.outputs, function(id){
      return this.getNode(id);
    }.bind(this));
    _.each(nextNodes, function(node){
      if(node["@type"] === "decision"){
        result = result.concat(this.judgeNode(doc, node, this.getNextNodes(doc, node)));
      }else{
        result.push(node);
      }
    }.bind(this));

    return result;
  },
  judgeNode: function(doc, decisionNode, nodes){
    //TODO 处理条件分支

    return nodes;
  },
  submit: function (option){
    if (!this._objectId) {
      return false;
    }
    var curNode = this.getCurNode();
    curNode.cur = false;
    curNode.done = true;

    var nextNode = this.getNode(option.flownodeid);
    nextNode.cur = true;
    if (!this._flow.log) {
      this._flow.log = [];
    }
    this._flow.log.push({
      "name": curNode.name,
      "id": curNode.id,
      "opinion": unescape(option.flowopinion),
      "user": "admin",
      "operate": option.flowcontroltype,
      "time": Mock.Random.now()
    });

    while(!(curNode.outputs.indexOf(nextNode.id) > -1)){
      var childNodes = this.getNodes(curNode.outputs);

      _.each(childNodes, function(node){
        if(node["@type"] === "decision"){
          node.done = true;
          curNode = node;
          return false;
        }

      })
    }

    this.saveFlow();
    return this.getNode(option.flownodeid);
  },
  saveFlow: function(){
    this.flowDocs.save();
  },
  getCurNode: function(){
    return _.find(this._flow.flow.nodes, function(node){
      return node.cur;
    })
  },
  getNode: function(id){
    return _.find(this._flow.flow.nodes, function(node){
      return node.id === id;
    })
  },
  getNodes: function(ids){
    return _.filter(this._flow.flow.nodes, function(node){
      return ids.indexOf(node.id) > -1;
    })
  },
  getMiddleNodes: function(curNode, nextNode){
    var result = [];
    while(!curNode.outputs.indexOf(nextNode.id)){
      var childNodes = this.getNodes(curNode.outputs)
    }


    while(!nextNode.parent.indexOf(curNode.id)){
      for(var i = 0; i < nextNode.parent.length; i++){
        var node = this.getNode(nextNode.parent[i]);
        if(node["@type"] === "decision"){

        }
      }
    }
    return result;
  }
})

module.exports = Flow;
