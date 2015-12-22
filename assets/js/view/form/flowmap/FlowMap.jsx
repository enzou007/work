import React from 'react';
import FlowNode from './FlowNode.jsx';

import 'jsplumb/dist/js/dom.jsPlumb-1.7.6.js';
import 'Less/flowmap.less';
import 'jsplumb/css/jsPlumbToolkit-defaults.css';

import config from './flowMapConfig.js';
window.FP = config

const FlowMap = React.createClass({
  propTypes: {
    readonly: React.PropTypes.bool
  },
  _flowMap: null,
  _conns: [],
  getDefaultProps() {
    return {
      readonly: true,
      flow: null,
      onDrop: function() {},
      onDragOver: function() {}
    };
  },
  getInitialState() {
    return {
      flow: this.props.flow
    };
  },
  componentDidMount() {
    this.initFlow();
    window.FM = this;
  },
  componentWillReceiveProps(nextProps) {

    let nodeCount = this.state.flow.count();
    this.setState({
      flow: nextProps.flow
    }, () => {
      if(nodeCount === 0){
        this.initFlow()
      }else if(nodeCount > nextProps.flow.count()){

      }else if(nodeCount !== nextProps.flow.count()){
        this.draggable();
        this.buildNodes();
      }
    });
  },
  render() {
    return (
      <div className={"canvas" + (this.props.readonly?" readonly":"")} id="canvas"
        onDrop={this.props.onDrop} onDragOver={this.props.onDragOver} onClick={this.nodeClick.bind(this, "__flow")}>
        {
          this.state.flow.map(node => {
            return <FlowNode key={node.get("unid")} onNodeClick={this.nodeClick} readOnly={this.props.readonly} onRemoveNode={this.removeNode} {...node.toJS()}/>
          })
        }
      </div>
    );
  },
  getValue(nodesMap){
    return this.state.flow.map(node => {
      let unid = node.get("unid");
      let flowNode = document.getElementById(unid);
      let endpoints = this._flowMap.getEndpoints(unid);
      let chlidrenNodes = [],
          parentNodes = [];
      if(endpoints){
        for(var i = 0; i < endpoints.length; i++){
          let conn = endpoints[i].connections[0];
          if(conn.sourceId === unid){
            chlidrenNodes.push(nodesMap[conn.targetId]);
          }else{
            parentNodes.push(nodesMap[conn.sourceId]);
          }
        }
      }
      return {
        unid: unid,
        parent: parentNodes,
        x: flowNode.style.left,
        y: flowNode.style.top
      }
    });
  },
  initFlow() {
    if(!this._flowMap){
      this._flowMap = jsPlumb.getInstance(config.instance);
    }
    this.draggable();
    this.buildNodes();
    this.buildLines();
    this.buildEvents();
  },
  nodeClick(unid, nodeId){
    if(this.props.onNodeClick){
      this.props.onNodeClick(unid, nodeId)
    }
  },
  removeNode(unid, nodeId){
    this.setState({
      flow: this.state.flow.delete(this.state.flow.findIndex(item => {return item.get("unid") === unid}))
    }, () => {
      this._flowMap.remove(unid);
      if(this.props.onRemoveNode){
        this.props.onRemoveNode(unid, nodeId);
      }
    });
  },
  draggable() {
    if (!this.props.readonly) {
      this._flowMap.draggable(jsPlumb.getSelector(".canvas .task"));
    }
  },
  buildEvents() {
    if (!this.props.readonly) {
      this._flowMap.bind("dblclick", (conn, originalEvent) => {
        this._flowMap.detach(conn);
      });

      this._flowMap.bind("beforeDrop", (conn, originalEvent) => {
        let endpoints = this._flowMap.getEndpoints(conn.sourceId);
        let count = 1;
        if(endpoints){
          for(var i = 0; i < endpoints.length; i++){
            if(endpoints[i].connections[0].targetId === conn.targetId){
              if(count > 1){
                return false;
              }
              count++;
            }
          }
        }
        return true;
      });
      this._flowMap.bind("connection", (conn, originalEvent) => {


      });
    }
  },
  buildNodes(nodes) {
    if(this.state.flow.count() > 0){
      this.state.flow.forEach(node => {
        let flowNode = document.getElementById(node.get("unid"));
        this._flowMap.makeSource(flowNode, config.source);
      });
      this._flowMap.makeTarget(jsPlumb.getSelector(".canvas .task"), config.target);
    }
  },
  buildLines(lines) {
    this._flowMap.detachEveryConnection();
    this.state.flow.forEach(node => {
      if(node.get("parent")){
        node.get("parent").forEach(id => {
          let parentNode = this.state.flow.find(pnode => {
            return pnode.get("id") === id;
          });
          let lineColor = config.defaultLineColor;
          if(parentNode.get("done") && (node.get("done") || node.get("cur"))){
            lineColor = config.doneLineColor;
          }
          this._flowMap.connect({
              source: parentNode.get("unid"),
              target: node.get("unid"),
              paintStyle: {
                lineWidth: 3,
                strokeStyle: lineColor,
                joinstyle: "round"
              }
          });
        });
      }
    });
  }
});

export default FlowMap;
