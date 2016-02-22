import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import FlowNode from './FlowNode.jsx';

import 'jsplumb/dist/js/dom.jsPlumb-1.7.6.js';
import 'Less/component/flowmap.less';
import 'jsplumb/css/jsPlumbToolkit-defaults.css';

import config from './flowMapConfig.js';

const FlowMap = React.createClass({
  propTypes: {
    readonly: React.PropTypes.bool
  },
  _flowMap: null,
  getDefaultProps() {
    return {
      readonly: true,
      flow: null,
      log: null,
      curNode: null,
      onDrop: function() {},
      onDragOver: function() {}
    };
  },
  getInitialState() {
    return {
      flow: this.props.flow,
      log: this.props.log
    };
  },
  componentDidMount() {
    this.initFlow();
  },
  componentWillReceiveProps(nextProps) {
    let nodeCount = this.state.flow.count();
    let state = {
      flow: nextProps.flow
    }
    if(nextProps.log){
      state.log = log;
    }
    this.setState(state, () => {
      if(nodeCount === 0){
        this.draggable();
        this.buildNodes();
        this.buildLines();
      }else if(nodeCount !== nextProps.flow.count()){
        this.draggable();
        this.buildNodes();
      }
    });
  },
  render() {
    if(this.props.log){
      return this.renderColorFlow();
    }else{
      return this.renderFlow();
    }
  },
  renderFlow(){
    let { className, readonly, style } = this.props;
    className = className || "";
    return (
      <div className={"canvas " + className + (readonly?" readonly":"")} id="canvas" style={style}
        onDrop={this.props.onDrop} onDragOver={this.props.onDragOver} onClick={this.nodeClick.bind(this, "__flow")}>
        {
          this.state.flow.map(node => {
            return <FlowNode key={node.get("unid")} readOnly={readonly} onNodeClick={this.nodeClick} onRemoveNode={this.removeNode} {...node.toJS()}/>
          })
        }
      </div>
    );
  },
  renderColorFlow(){
    this.computeProcess();
    let curNodeUnid = this.props.curNode.get("unid");
    let { className, readonly, style } = this.props;
    className = className || "";
    return (
      <div className={"canvas " + className + (readonly?" readonly":"")} id="canvas" style={style}
        onDrop={this.props.onDrop} onDragOver={this.props.onDragOver} onClick={this.nodeClick.bind(this, "__flow")}>
        {
          this.state.flow.map(node => {
            return <FlowNode key={node.get("unid")} readOnly={readonly} onNodeClick={this.nodeClick} onRemoveNode={this.removeNode}
              done={this.DoneNodes[node.get("unid")]} cur={node.get("unid") === curNodeUnid} {...node.toJS()} />
          })
        }
      </div>
    );
  },
  DoneNodes: {},
  DoneLines: [],
  computeProcess(){
    if(this.DoneLines.length === 0){
      let logs = this.state.log;
      this.state.log.forEach((log, index) => {
        if(log.get("operate") === "submit"){
          let source = this.getNode(log.get("unid"));
          let target = logs.get(index + 1) || this.props.curNode;
          this.DoneNodes[source.get("unid")] = true;
          if(source.get("outputs").indexOf(target.get("id")) > -1){
            this.DoneLines.push({
              source: log.get("unid"),
              target: target.get("unid"),
              paintStyle: {
                lineWidth: 3,
                strokeStyle: config.doneLineColor,
                joinstyle: "round"
              }
            })
          }else{
            let outputs = source.get("outputs");
            for(let n = 0; n < outputs.size; n++){
              let child = this.getNode(outputs.get(n));
              if(child.get("outputs").indexOf(target.get("id")) > -1){
                this.DoneNodes[child.get("unid")] = true;
                this.DoneLines.push({
                  source: source.get("unid"),
                  target: child.get("unid"),
                  paintStyle: {
                    lineWidth: 3,
                    strokeStyle: config.doneLineColor,
                    joinstyle: "round"
                  }
                })
                this.DoneLines.push({
                  source: child.get("unid"),
                  target: target.get("unid"),
                  paintStyle: {
                    lineWidth: 3,
                    strokeStyle: config.doneLineColor,
                    joinstyle: "round"
                  }
                })
              }
            }
          }
        }
      });
    }
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
        outputs: chlidrenNodes,
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
    $(".canvas .task").removeClass("active");
    $("#"+unid).addClass("active");
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
        if(this.props.onConnection){
          this.props.onUnConnection(conn.targetId, conn.sourceId);
        }
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
      if(this.props.onConnection){
        this._flowMap.bind("connection", (conn, originalEvent) => {
          this.props.onConnection(conn.targetId, conn.sourceId);
        });
      }

    //   $(document).off("keydown.flowMap")
    //   $(document).on("keydown.flowMap", function(event){
    //     event.preventDefault();
    //     event.stopPropagation();
    //     var $curNode = window.cn = $(".canvas .task.active");
    //     if($curNode.length === 0){
    //       return false;
    //     }
    //     var top = $curNode.css("top").replace("px","");
    //     var left = $curNode.css("left").replace("px","");
    //     switch (event.keyCode) {
    //       case 37:
    //         $curNode.css("left", +left - 1 + "px")
    //         break;
    //       case 38:
    //         $curNode.css("top", +top - 1 + "px")
    //         break;
    //       case 39:
    //         $curNode.css("left", +left + 1 + "px");
    //         break;
    //       case 40:
    //         $curNode.css("top", +top + 1 + "px")
    //         break;
    //     }
    //     $curNode.trigger("dragover")
    //   })
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
  buildLines() {
    this._flowMap.detachEveryConnection();

    if(this.state.log){
      let lines = this.DoneLines;
      this.state.flow.forEach(node => {
        if(node.get("outputs")){
          node.get("outputs").forEach(id => {
            let chlidNode = this.state.flow.find(cnode => {
              return cnode.get("id") === id;
            });
            let line = _.find(lines, (line) => {
              return line.source === node.get("unid") && line.target === chlidNode.get("unid")
            })
            if(!line){
              this._flowMap.connect({
                  source: node.get("unid"),
                  target: chlidNode.get("unid"),
                  paintStyle: {
                    lineWidth: 3,
                    strokeStyle: config.defaultLineColor,
                    joinstyle: "round"
                  }
              });
            }
          });
        }
      });

      _.each(lines, line => {
        if(line){
          this._flowMap.connect(line);
        }
      })

    }else{
      this.state.flow.forEach(node => {
        if(node.get("outputs")){
          node.get("outputs").forEach(id => {
            let chlidNode = this.state.flow.find(cnode => {
              return cnode.get("id") === id;
            });
            this._flowMap.connect({
                source: node.get("unid"),
                target: chlidNode.get("unid"),
                paintStyle: {
                  lineWidth: 3,
                  strokeStyle: config.defaultLineColor,
                  joinstyle: "round"
                }
            });
          });
        }
      });
    }
  },
  getNode(id){
    return this.props.flow.find(node => {
      return node.get("id") === id || node.get("unid") === id;
    })
  }
});

export default FlowMap;
