var JsonFile = require("../file.js");
var _ = require("underscore");
var Mock = require("mockjs");

var flowsData = new JsonFile("mocks/response/flow/flows.json");
var docFlowsData = new JsonFile("mocks/response/flow/docFlows.json");

module.exports = function (data) {

  this.getDocFlow = function (flowId, objectId) {
    return _.find(docFlowsData.getData(), function (flow) {
      return flow.flowId === flowId && flow.objectId === objectId;
    })
  }

  this.getDefaultFlow = function (flowId) {
    return _.find(flowsData.getData(), function (flow) {
      return flow.id === flowId;
    })
  }

  this.createFlow = function (flowId, objectId) {
    var flow = {
      flowId: flowId,
      objectId: objectId,
      flow: this.getDefaultFlow(flowId)
    }
    docFlowsData.add(flow);
    this.saveDocFlowInfo();

  }

  this.saveFlowInfo = function () {
    flowsData.save();
  }

  this.saveDocFlowInfo = function () {
    docFlowsData.save();
  }

  this.save = function () {
    this.saveDocFlowInfo();
    this.saveFlowInfo();
  }

  if (data && data.params) {
    if (data.params.flowId && data.params.objectId) {
      return {
        "json": this.getDocFlow(data.params.flowId, data.params.objectId)
      }
    } else if (data.params.flowId) {
      return {
        "json": this.getDefaultFlow(data.params.flowId)
      }
    }
  }
};
