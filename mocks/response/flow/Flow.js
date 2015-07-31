var FlowData = require("./FlowData.js");
var _ = require("underscore");
var moment = require("moment");
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
      this._flowInfo = flowData.getDocFlow(this._flowId, this._objectId);
    } else {
      this._flowInfo = this.getDefaultFlow();
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
    return flowData.createFlow(this._flowId, objectId);
  },

  getDefaultFlow: function () {
    return flowData.getDefaultFlow(this._flowId);
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
    log("Flow nextNode Start");
    log("-------option-info-start----------");
    console.log(option);
    log("-------option-info-end----------");
    var flowInfo = this.getFlowInfo();

    var curNode = this.getCurNode();
    log("Flow nextNode curNode.nodeId===" + curNode.nodeId);

    if (curNode.nodeId === option.flownodeid) {
      log("Flow nextNode return false");
      return false;
    }

    curNode.cur = false;
    curNode.done = true;

    var nextNode = this.getNode(option.flownodeid);
    log(nextNode);
    nextNode.cur = true;
    log("Flow nextNode Change Node");
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
      "time": moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
    });
    log("Flow nextNode Save Log ");
    flowData.saveDocFlowInfo();
    log("Flow nextNode End");
  }
});

var FlowID = {
  xwsd: "5582272444ae2b5937e53930"
}

module.exports = Flow;
