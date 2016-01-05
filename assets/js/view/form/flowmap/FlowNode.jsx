import React from 'react';
import classNames from 'classnames';
import $ from 'jquery';

const FlowNode = React.createClass({
  getDefaultProps() {
    return {
      unid: "",
      id:"",
      "@type": "node",
      name: "未定义",
      done: false,
      cur: false
    };
  },
  propTypes: {
    unid: React.PropTypes.string.isRequired,
    "@type": React.PropTypes.oneOf(['task', 'start', 'end', 'decision', 'text']),
    name: React.PropTypes.string,
    done: React.PropTypes.bool,
    cur: React.PropTypes.bool
  },
  render() {
    //start,end,task,decision,condition
    let nodeType = this.props["@type"];
    let cn = classNames({
      "task": true,
      "start": nodeType === "start",
      "end": nodeType === "end",
      "decision": nodeType === "decision",
      "text": nodeType === "text",
      "done": this.props.done,
      "cur": this.props.cur
    });
    return (
      <div id={this.props.unid}  className={cn} style={{left:this.props.x,top:this.props.y}} onClick={this.nodeClick} title={this.props.id}>
        <span className="task-name" dangerouslySetInnerHTML={{__html: this.props.name.replace(/\n/g, "<br />")}}></span>
        { this.props.readOnly ? null : <div className="task-operate">{ this.getOperate() }</div> }
      </div>
    );
  },
  getOperate(){
    let operates = [];
    let nodeType = this.props["@type"];
    if(nodeType !== "start" && nodeType !== "end"){
      operates.push(<i key="operate1" className="fa fa-close" onClick={this.deleteNode}></i>)
    }

    if(nodeType !== "end" && nodeType !== "text"){
      operates.push(<i key="operate2" className="flow-anchor fa fa-share-alt"></i>)
    }
    return operates;
  },
  nodeClick(event){
    event.stopPropagation();
    if(this.props.onNodeClick){
      this.props.onNodeClick(this.props.unid, this.props.id);
    }
  },
  deleteNode(event){
    event.stopPropagation();
    if(this.props.onRemoveNode){
      this.props.onRemoveNode(this.props.unid, this.props.id);
    }
  }

});

export default FlowNode;
