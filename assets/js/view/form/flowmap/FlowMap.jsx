"use strict";

var React = require('react'),
  FlowNode = require("./FlowNode.jsx"),
  $ = require("jquery"),
  _ = require("underscore");

require("jsplumb/dist/js/dom.jsPlumb-1.7.6.js");
require("../../../../less/flowmap.less");
require("jsplumb/css/jsPlumbToolkit-defaults.css");

var config = require("./flowMapConfig.js");
var FlowMap = React.createClass({
  getDefaultProps: function (e) {
    return {
      readonly: true,
      flow: null
    };
  },
  getInitialState: function () {
    return {
      flow: this.props.flow
    };
  },
// shouldComponentUpdate: function (nextProps, nextState) {
//   return nextState.flow.nodes.length != this.state.flow.nodes.length;
// },
  propTypes: {
    readonly: React.PropTypes.bool,
    data: React.PropTypes.object
  },
  addNodeItem: function (item) {
    this.setState({
      nodes: this.state.nodes.concat([item])
    })
  },
  draggable: function () {
    if (!this.props.readonly) {
      this.flowMap.draggable(jsPlumb.getSelector(".canvas .node"));
    }
  },
  render: function () {
    return (
        <div className={"canvas" + (this.props.readonly?" readonly":"")} id="canvas">
          { _.map(this.state.flow.nodes,function(item){
            return <FlowNode key={item.nodeId} {...item}/>
            }.bind(this))
          }
        </div>
    );
  },
  componentDidMount: function () {
    _.defer(function () {
      this.initFlow();
    }.bind(this));
  },
  initFlow: function () {
/*延迟执行 所以不用写在jsPlumb.ready里面 还可提高执行效率 */
    var flowMap = this.flowMap = window.flowMap = jsPlumb.getInstance(config.instance);

    this.buildNodes();
    this.buildLines();
    this.draggable();

// ???
    jsPlumb.fire("jsPlumbDemoLoaded", flowMap);
  },
  buildNodes: function (nodes) {
    var toId = "";
    var nodeConfig;
    _.each(this.state.flow.nodes, function (node) {
      toId = node.nodeId;
      node.readonly
      nodeConfig = config.getEndpointStyle(node, {
        readonly: this.props.readonly
      });
      _.each(config.anchors, function (anchor) {
        var sourceUUID = toId + anchor;
        this.flowMap.addEndpoint(toId, nodeConfig, {
          anchor: anchor,
          uuid: sourceUUID
        });
      }.bind(this))
    }.bind(this))
  },
  buildLines: function (lines) {
    _.each(this.state.flow.lines, function (line) {

      this.flowMap.connect({
        source:line.source,
        target:line.target,
        anchors: line.connect,
        paintStyle: {strokeStyle:(line.flowPast ? "#8BC34A" : "#CACDCF"), lineWidth:3},
        endpoints: ["Blank", "Blank"],
        connector: ["Flowchart", {stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true}]
      })
    }.bind(this))
  }
});

module.exports = FlowMap;
