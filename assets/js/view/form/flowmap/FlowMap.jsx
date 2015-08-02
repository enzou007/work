import React from 'react';
import FlowNode from './FlowNode.jsx';
import $ from 'jquery';
import _ from 'underscore';

import 'jsplumb/dist/js/dom.jsPlumb-1.7.6.js';
import '../../../../less/flowmap.less';
import 'jsplumb/css/jsPlumbToolkit-defaults.css';

import config from './flowMapConfig.js';

const FlowMap = React.createClass({
  getDefaultProps() {
    return {
      readonly: true,
      flow: null
    };
  },
  getInitialState() {
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
  addNodeItem(item) {
    this.setState({
      nodes: this.state.nodes.concat([item])
    })
  },
  draggable() {
    if (!this.props.readonly) {
      this.flowMap.draggable(jsPlumb.getSelector(".canvas .node"));
    }
  },
  render() {
    return (
      <div className={"canvas" + (this.props.readonly?" readonly":"")} id="canvas">
        {
          _.map(this.state.flow.nodes, node => {
            return <FlowNode key={node.nodeId} {...node}/>
          })
        }
      </div>
    );
  },
  componentDidMount() {
    _.defer(() => {
      this.initFlow();
    });
  },
  initFlow() {
/*延迟执行 所以不用写在jsPlumb.ready里面 还可提高执行效率 */
    var flowMap = this.flowMap = window.flowMap = jsPlumb.getInstance(config.instance);

    this.buildNodes();
    this.buildLines();
    this.draggable();

// ???
    jsPlumb.fire("jsPlumbDemoLoaded", flowMap);
  },
  buildNodes(nodes) {
    var toId = "";
    var nodeConfig;
    _.each(this.state.flow.nodes, node => {
      toId = node.nodeId;
      node.readonly
      nodeConfig = config.getEndpointStyle(node, {
        readonly: this.props.readonly
      });
      _.each(config.anchors, anchor => {
        var sourceUUID = toId + anchor;
        this.flowMap.addEndpoint(toId, nodeConfig, {
          anchor: anchor,
          uuid: sourceUUID
        });
      })
    })
  },
  buildLines(lines) {
    _.each(this.state.flow.lines, line => {
      this.flowMap.connect({
        source: line.source,
        target: line.target,
        anchors: line.connect,
        paintStyle: {
          strokeStyle: (line.flowPast ? "#8BC34A" : "#CACDCF"),
          lineWidth: 3
        },
        endpoints: [
          "Blank", "Blank"
        ],
        connector: [
          "Flowchart", {
            stub: [40, 60],
            gap: 10,
            cornerRadius: 5,
            alwaysRespectStubs: true
          }
        ]
      })
    })
  }
});

export default FlowMap;
