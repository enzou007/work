import React from 'react';
import classNames from 'classnames';

const FlowNode = React.createClass({
  getDefaultProps() {
    return {
      nodeId:"",
      type: "node",
      nodeName: "未定义",
      done: false,
      cur: false
    };
  },
  propTypes: {
    nodeId: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['node', 'start', 'end', 'condition']),
    nodeName: React.PropTypes.string,
    done: React.PropTypes.bool,
    cur: React.PropTypes.bool
  },
  render() {
    var cn = classNames({
      "node": true,
      "start": this.props.type === "start",
      "end": this.props.type === "end",
      "condition": this.props.type === "condition",
      "done": this.props.done,
      "cur": this.props.cur
    });
    return (
      <div id={this.props.nodeId} className={cn} style={{left:this.props.x,top:this.props.y}}>{this.props.nodeName}</div>
    );
  }

});

export default FlowNode;
