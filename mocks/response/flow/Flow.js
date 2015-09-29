var FlowData = require("./FlowData.js");
var _ = require("underscore");
var Mock = require("mockjs");
var flowData = new FlowData();

var Flow = function (flowId, objectId) {
  this._flowId = FlowID[flowId];
  this._objectId = objectId;
  this.initialize();
}
var log = function (info) {
  //console.log(Mock.Random.now() + ":  " + info);
}

_.extend(Flow.prototype, {
  initialize: function () {
    log("Flow initialize");
    if (this._objectId) {
      log("Flow initialize " + this._objectId);
      this._flowInfo = this.getFlowById(this._flowId, this._objectId);
    } else {
      this._flowInfo = {flow: this.getDefaultFlow()};
    }
  },

  getFlowInfo: function () {
    return this._flowInfo;
  },

  getFlowId: function () {
    return this._flowId;
  },

  setObjectId: function (objectId) {
    log("Flow setObjectId");
    this._objectId = objectId;
    this.initialize();
  },

  createFlow: function (objectId) {
    log("Flow createFlow");
    var flow = flowData.createFlow(this._flowId, objectId);
    this.setObjectId(objectId);
    return flow;
  },

  deleteFlow: function(objectIds){
    return flowData.deleteDocFlow(this._flowId, objectIds);
  },

  getDefaultFlow: function () {
    return flowData.getDefaultFlow(this._flowId);
  },

  getFlowById: function(flowId, objectId){
    return flowData.getDocFlow(flowId, objectId);
  },

  getCurNode: function () {
    return _.find(this.getFlowInfo().flow.nodes, function (node) {
      return node.cur
    });
  },

  getNode: function (nodeId) {
    return _.find(this.getFlowInfo().flow.nodes, function (node) {
      return node.nodeId === nodeId;
    });
  },

  getLines: function (nodeId) {
    return _.filter(this.getFlowInfo().flow.lines, function (line) {
      return line.source === nodeId;
    });
  },

  getLine: function (nodeId, nextNodeId) {
    return _.find(this.getFlowInfo().flow.lines, function (line) {
      return line.source === nodeId && line.target === nextNodeId;
    });
  },

  getNextNodes: function (nodeId) {
    var lines = this.getLines(nodeId);
    var nodes = [];
    for (lineIndex in lines) {
      nodes.push(this.getNode(lines[lineIndex].target))
    }
    return nodes;
  },

  submit: function (option) {
    if (!this._objectId) {
      return false;
    }
    var flowInfo = this.getFlowInfo();
    var curNode = this.getCurNode();
    if (curNode.nodeId === option.flownodeid) {
      return false;
    }

    curNode.cur = false;
    curNode.done = true;

    var nextNode = this.getNode(option.flownodeid);
    nextNode.cur = true;
    if (!flowInfo.log) {
      flowInfo.log = [];
    }

    var line = this.getLine(curNode.nodeId, option.flownodeid);
    if(line){
      line.flowPast = true;
      line.operate = option.flowcontroltype;
    }

    flowInfo.log.push({
      "nodeName": curNode.nodeName,
      "nodeId": curNode.nodeId,
      "opinion": unescape(option.flowopinion),
      "user": "admin",
      "operate": option.flowcontroltype,
      "time": Mock.Random.now()
    });

    flowData.saveDocFlowInfo();

    return nextNode;
  }
});

var FlowID = {
  xwsd: "5582272444ae2b5937e53930",
  entry: "5582272444ae2b5937e53931",
  leave: "5582272444ae2b5937e53932"
}

module.exports = Flow;
