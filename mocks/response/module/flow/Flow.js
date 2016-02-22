var File = require("../../file.js");
var _ = require("underscore");
var Mock = require("mockjs");


function Flow(flowId, objectId, doc) {
  this.flowLogDocs = new File("mocks/static/system_docflows.json");
  this.flows = new File("mocks/static/system_workflow.json");
  this._flowId = flowId;
  this._objectId = objectId;
  this._doc = doc;
  this._flow = null;
  this._logs = null;
  this.initialize();
}

_.extend(Flow.prototype, {
  initialize: function(){
    this.setDefaultFlow(this._flowId);
    if(this._objectId){
      this.setDocFlowLog(this._flowId, this._objectId)
    }
  },
  setDefaultFlow: function(flowId){
    this._flow = this.flows.findByObjectId(flowId);
  },
  getDefaultFlow: function(){
    return this._flow;
  },
  setDocFlowLog: function(flowId, objectId){
    this._logs = this.flowLogDocs.find(function(log){
      return log["@objectId"] === objectId && log["@flowId"] === flowId;
    })
  },
  getFlowInfo: function(){
    return {
      flow: this._flow,
      log: this._logs ? this._logs.log : []
    };
  },
  // setObjectId: function(objectId){
  //   this._objectId = objectId;
  //   this._flow = this.getDocFlow(flowId, objectId);
  // },
  createFlow: function(objectId){
    this._objectId = objectId;
    this._logs = {
      "@objectId" : objectId,
      "@flowId": this._flowId,
      "log": []
    }
    this.flowLogDocs.add(this._logs);
    return this._logs;
  },
  saveFlow: function(){
    this.flowLogDocs.save();
  },
  getCurNode: function(){
    if(this._doc){
      return this.getNode(this._doc["@curNodeId"]);
    }else{
      return this.getNode("Start");
    }
  },
  getNode: function(id, nodes){
    return _.find(nodes || this._flow.nodes, function(node){
      return node.id === id;
    })
  },
  getNodes: function(ids, nodes){
    return _.filter(nodes || this._flow.nodes, function(node){
      return ids.indexOf(node.id) > -1;
    })
  },
  isDoneNode: function(node){

  },
  getDoneNodes: function(){
    var result = [];
    var curNode = this.getCurNode();
    if(curNode.id === "Start"){
      return result;
    }
    //[NONE, START, BEFORE, HISTORY, RANGE]
    switch (curNode.rejectType) {
      case "START":
        result.push(this.getNode("Start"));
        break;
      case "BEFORE":
        result = this.getParentDoneNodes(curNode);
        break;
      case "HISTORY":
        result = this.getAllDoneNodes(curNode);
        break;
      case "RANGE":
        result = this.getRangeDoneNodes(curNode.rejectRange);
        break;
    }
    return result;
  },
  getParentDoneNodes: function(curNode){
    var result = [];
    var parentNodes = _.filter(this._flow.nodes, function(node){
      return node.outputs.indexOf(curNode.id) > -1;
    });
    _.each(parentNodes, function(node){
      if(isDoneNode(node)){
        if(node["@type"] === "decision"){
          result = result.concat(this.getParentDoneNodes(node));
        }else{
          result.push(this.setFlowProcessors(node));
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
    var parentNodes = _.filter(this._flow.nodes, function(node){
      return node.outputs.indexOf(curNode.id) > -1;
    })
    _.each(parentNodes, function(node){
      if(isDoneNode(node)){
        if(node["@type"] !== "decision"){
          result.push(this.setFlowProcessors(node));
        }
        result = result.concat(this.getAllDoneNodes(node));
      }
    }.bind(this));
    return result;
  },
  getRangeDoneNodes: function(nodes){
    var result = [];
    _.each(nodes, function(id){
      var node = this.getNode(id);
      if("_start_task_".indexOf(node["@type"]) > -1 && isDoneNode(node)){
        result.push(this.setFlowProcessors(node));
      }
    }.bind(this));
    return result;
  },
  getJumpNodes: function(){
    var result = [];
    _.each(this._flow.nodes, function(node){
      if("_start_end_task_".indexOf(node["@type"]) > -1){
        result.push(this.setFlowProcessors(node));
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
        result.push(this.setFlowProcessors(node));
      }
    }.bind(this));

    return result;
  },
  judgeNode: function(doc, decisionNode, nodes){
    //TODO 处理条件分支
    if(decisionNode.script){
      var func = eval("(function(doc){"+decisionNode.script+"})");

      var nodeIds = func(doc);

      if(typeof(nodeIds) === "string"){
        return this.getNode(nodeIds, nodes);
      }else if(typeof(nodeIds) === "array"){
        return this.getNodes(nodeIds, nodes);
      }else{
        return [];
      }
    }else{
      return nodes;
    }
  },
  setFlowProcessors: function(node){

    if("_start_end_".indexOf(node["@type"]) > -1){
      return node;
    }
    //TODO 计算处理人 考虑流程变更过处理人的情况
    var users = ["pnrmunuprorueprrmnrppbbp", "ewepwneueemnlrerrlrumene"];

    return _.extend({ }, node, {users: users})
  },
  createFlowLog: function(node, option){
    if (!this._logs.log) {
      this._logs.log = [];
    }
    this._logs.log.push({
      "name": node.name,
      "id": node.id,
      "unid": node.unid,
      "opinion": option.flowopinion ? unescape(option.flowopinion) : "",
      "user": "admin",
      "operate": option.flowcontroltype,
      "time": Mock.Random.now()
    });
  },
  processFlow: function (option){
    //TODO 处理不同的提交类型
    if (!this._objectId) {
      return false;
    }

    var result = this[option.flowcontroltype](option);

    return result;
  },
  save: function(option){
    //TODO
    return this.getCurNode();
  },
  submit: function(option){
     var curNode = this.getCurNode();

    // curNode.cur = false;
    // curNode.done = true;
    //
    // var submitNode = this.getNode(option.flownodeid);
    // submitNode.cur = true;
    // if(curNode.outputs.indexOf(submitNode.id) === -1){
    //   _.each(curNode.outputs, function(id){
    //     var node = this.getNode(id);
    //     if(node["@type"] === "decision" && node.outputs.indexOf(submitNode.id) > -1){
    //       node.done = true;
    //     }
    //   }.bind(this))
    // }

    this.createFlowLog(curNode, option);
    this.saveFlow();
    return this.getNode(option.flownodeid);
  },
  //驳回
  reject: function(option) {
    return this.jump(option);
  },
  //强制跳转
  jump: function(option) {
    var curNode = this.getCurNode();
    // curNode.cur = false;
    // curNode.done = true;
    // var nextNode = this.getNode(option.flownodeid);
    // nextNode.cur = true;
    this.createFlowLog(curNode, option);
    this.saveFlow();
    return this.getNode(option.flownodeid);
  },
  //催办
  press: function(option){
    return this.save(option);
  },
  //通知
  notify: function(option){
    return this.save(option);
  },
  //加签
  apostille: function(option) {
    //TODO
    var curNode = this.getCurNode();
    this.createFlowLog(curNode, option);
    this.saveFlow();
    return this.getCurNode();
  },
  //转办
  turn: function(option) {
    //TODO
    var curNode = this.getCurNode();
    this.createFlowLog(curNode, option);
    this.saveFlow();
    return this.getCurNode();
  },
  //终止
  stop: function(option){
    //TODO
    return this.getCurNode();
  },
  //抽单
  withdraw: function(option){
    //TODO
    return this.getCurNode();
  },
  //权限变更
  access: function(option){
    //TODO
    return this.getCurNode();
  }
})

module.exports = Flow;
