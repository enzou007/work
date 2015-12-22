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
  getDoneNodes: function(curNode){
    curNode = curNode || this.getCurNode();
    if(curNode.parent.length === 0){
      return [];
    }
    var parentNodes = this.getNodes(curNode.parent);
    var result = [];
    _.each(parentNodes, function(node){
      if(node.done){
        if(node["@type"] === "decision"){
          result = result.concat(this.getDoneNodes(node));
        }else{
          result.push(node)
        }
      }
    }.bind(this));
    return result;
  },
  getNextNodes: function(doc, curNode){
    var result = [];
    curNode = curNode || this.getCurNode();
    var nextNodes = _.filter(this._flow.flow.nodes, function(node){
      return node.parent.indexOf(curNode.id) > -1;
    });
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

    if(option.flowcontroltype === "submit"){
      while(nextNode.parent.indexOf(curNode.id) === -1){
        for(var i = 0; i < nextNode.parent.length; i++){
          var node = this.getNode(nextNode.parent[i]);
          if(node["@type"] === "decision"){
            node.done = true;
            nextNode = node;
          }
        }
      }
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
  getMiddleNodes: function(nextNode, curNode){
    var result = [];
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
