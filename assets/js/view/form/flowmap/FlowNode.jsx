"use strict";

var React = require('react'),
  classNames = require("classnames");

var FlowNode = React.createClass({
  getDefaultProps: function() {
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
  render: function() {
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

module.exports = FlowNode;
