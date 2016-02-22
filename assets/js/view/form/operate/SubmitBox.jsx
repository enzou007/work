var React = require('react');
import $ from 'jquery';
import _ from 'underscore';
import Immutable from 'immutable';
import Personnel from 'Component/form/Personnel.jsx';
import { Checkbox } from 'Component/form/Checkbox.jsx';
import { Radio } from 'Component/form/Radio.jsx';
import Gritter from 'Component/Gritter.jsx';

var SubmitBox = React.createClass({
  getDefaultProps() {
    return {
      title: "流程流转",
      nodes: [],
      showOpinion: true,
      showNodes: true,
      defaultOpinion: "同意"
    };
  },
  getInitialState: function() {
    return {
      activeNode: this.props.nodes[0]
    };
  },
  render() {
    let activeNode = this.state.activeNode;
    let psnReadOnly = false;
    let psnRegion = "";
    let psnValue = "";
    if(this.props.showNodes){
      if(activeNode.id === "Start" || activeNode.id === "End"){
        psnReadOnly = true;
        psnRegion = "";
        psnValue = "";
      }else{
        psnReadOnly = activeNode.allowChangePerson === "false";
        psnRegion = activeNode.deptRegion || "";
        psnValue = activeNode.users && Immutable.fromJS(activeNode.users);
      }
    }
    return (
      <div className="submitBox">
        <div className="title">{this.props.title}</div>
        <div className="row content">
          {
            !this.props.showNodes ? null
              :<div className="flownodes col-md-6">
                <font>环节</font>
                <ul>
                  {
                    _.map(this.props.nodes, (node, index) => {
                      if(node.id === activeNode.id){
                        return (
                          <li key={node.id} onClick={this.toggleNodeItem.bind(this, node)} className="active">
                            <Radio defaultChecked defaultValue={node.id} name="nodes">{node.name}</Radio>
                          </li>
                        );
                      }else{
                        return (<li key={node.id} onClick={this.toggleNodeItem.bind(this, node)}><Radio defaultValue={node.id} name="nodes">{node.name}</Radio></li>);
                      }
                    })
                  }
                </ul>
              </div>
          }
          <div className={"psns" + (this.props.showNodes ? " col-md-6" : " col-md-12")}>
            <font>人员</font>
            <div>
              <Personnel ref="ref_flow_user" name="flowUser" mult={true} readOnly={psnReadOnly} region={psnRegion} value={psnValue}/>
            </div>
          </div>
        </div>
        {
          !this.props.showOpinion ? <div className="hr hr-20"></div>
            :(<div className="opinion">
              <textarea id="opinion" ref="ref_opinion" placeholder={this.props.defaultOpinion}></textarea>
            </div>)
        }
        <div className="row operate">
          <button className="btn" onClick={this.cancelClick}>
            取消<i className="fa fa-times"></i>
          </button>
          <button className="btn btn-success" onClick={this.confirmClick}>
            确定<i className="fa fa-arrow-right "></i>
          </button>
        </div>
      </div>
    );
  },
  toggleNodeItem(node) {
    this.setState({
      activeNode: node
    })
  },
  cancelClick(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.onCancel();
  },
  confirmClick(event){
    event.preventDefault();
    event.stopPropagation();
    $("#flowSubmitBox").css("zIndex", "1000");
    var data = {
      FlowUsers: this.refs.ref_flow_user.getValue()
    };

    if(this.props.showNodes){
      let nodeId = this.state.activeNode.id;
      if(nodeId !== "Start" && nodeId !== "End"){
        if(data.FlowUsers.length === 0){
          Gritter.show("处理人不能为空!", "n");
          $("#flowSubmitBox").css("zIndex", "1050");
          return false;
        }
      }
      data.FlowNodeId = this.state.activeNode.id;
    }else{
      if(data.FlowUsers.length === 0){
        Gritter.show("处理人不能为空!", "n");
        $("#flowSubmitBox").css("zIndex", "1050");
        return false;
      }
    }

    if(this.props.showOpinion){
      data.FlowOpinion = escape(this.refs.ref_opinion.getDOMNode().value || this.props.defaultOpinion)
    }

    this.props.onConfirm(data);
  }

});

module.exports = SubmitBox;
