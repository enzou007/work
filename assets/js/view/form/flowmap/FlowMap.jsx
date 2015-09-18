import React from 'react';
import FlowNode from './FlowNode.jsx';
import $ from 'jquery';
import _ from 'underscore';
import Scrollbar from 'Component/Scrollbar.jsx'

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
    readonly: React.PropTypes.bool
  },
  addNodeItem(item) {
    this.setState({
      nodes: this.state.flow.get("nodes").push(item)
    })
  },
  draggable() {
    if (!this.props.readonly) {
      this.flowMap.draggable(jsPlumb.getSelector(".canvas .node"));
    }
  },
  render() {
    return (
      <Scrollbar style={{height:"400px", width:"100%"}}>
        <div className={"canvas" + (this.props.readonly?" readonly":"")} id="canvas">
          {
            this.state.flow.get("nodes").map(node => {
              return <FlowNode key={node.get("nodeId")} {...node.toJS()}/>
            })
          }
        </div>
      </Scrollbar>
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

    this.state.flow.get("nodes").forEach(node => {
      toId = node.get("nodeId");
      node.readonly
      nodeConfig = config.getEndpointStyle(node.toJS(), {
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
    this.state.flow.get("lines").forEach(line => {
      this.flowMap.connect({
        source: line.get("source"),
        target: line.get("target"),
        anchors: line.get("connect").toArray(),
        paintStyle: {
          strokeStyle: (line.get("flowPast") ? "#8BC34A" : "#CACDCF"),
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
