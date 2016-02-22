import React from 'react';

import Dropdown from 'Component/bootstrap/Dropdown.jsx'
import Toolbar from './Toolbar.jsx';

import SubmitBtn from './operate/SubmitBtn.jsx';
import SaveBtn from './operate/SaveBtn.jsx';
import RejectBtn from './operate/RejectBtn.jsx';
import TurnBtn from './operate/TurnBtn.jsx';
import ApostilleBtn from './operate/ApostilleBtn.jsx';
import JumpBtn from './operate/JumpBtn.jsx';
import AccessBtn from './operate/AccessBtn.jsx';
import StopFlowBtn from './operate/StopFlowBtn.jsx';
import NotifyBtn from './operate/NotifyBtn.jsx';
import PressBtn from './operate/PressBtn.jsx';
import WithdrawBtn from './operate/WithdrawBtn.jsx';

export default class FlowToolbar extends React.Component{
  render() {
    return (
      <Toolbar title={this.props.action.getStore("flow").get("name") || "表单"}>
        { this.renderToolbar() }
      </Toolbar>
    );
  }
  renderToolbar() {
    //TODO 加入权限控制
    let action = this.props.action;
    let flow = action.getStore("flow");
    let buttons = [];
    let other = [];
    if(flow.size > 0){
      let doc = action.getStore("form");
      let session = {}
      let curNode = action.getCurNode();
      let nodeId = curNode.get("id");

      let isStart = nodeId === "Start";
      let isEnd = nodeId === "End";
      let isDoing = !isStart && !isEnd;
      let isAdmin = true;

      if(!isEnd){
        buttons.push(<li key="save"><SaveBtn action={action}/></li>);
        buttons.push(<li key="submit"><SubmitBtn onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit} action={action}/></li>);
      }

      if(isDoing){
        if(curNode.get("rejectType") !== "NONE"){
          buttons.push(<li key="reject"><RejectBtn onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit} action={action}/></li>);
        }

        if(curNode.get("allowTurn") == "true"){
          other.push(<li key="turn"><TurnBtn showButton={false} onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit} action={action}/></li>);
        }

        if(curNode.get("allowApostille") == "true"){
          other.push(<li key="apostille"><ApostilleBtn showButton={false} onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit} action={action}/></li>);
        }

        if(flow.get("allowNotify") == "true"){
          other.push(<li key="Notify"><NotifyBtn showButton={false} onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit} action={action}/></li>);
        }

        if(flow.get("allowPress") == "true"){
          other.push(<li key="Press"><PressBtn showButton={false} onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit} action={action}/></li>);
        }

        if(flow.get("allowWithdraw") == "true"){
          other.push(<li key="Withdraw"><WithdrawBtn showButton={false} onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit} action={action}/></li>);
        }

        if(other.length > 0){
          buttons.push(
            <li key="other">
              <Dropdown>
                <button className="btn dropdown-toggle">
                  操作&nbsp;<i className="ace fa fa-caret-down" />
                </button>
                <ul className="dropdown-menu">
                  { other }
                </ul>
              </Dropdown>
            </li>
          )
        }
      }

      if(isAdmin){
        buttons.push(
          <li key="admin">
            <Dropdown>
              <button className="btn dropdown-toggle">
                管理员操作&nbsp;<i className="ace fa fa-caret-down" />
              </button>
              <ul className="dropdown-menu">
                <li><JumpBtn key="Jump" showButton={false} onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit} action={action}/></li>
                <li><AccessBtn key="Access" showButton={false} onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit} action={action}/></li>
                <li><StopFlowBtn key="StopFlow" showButton={false} onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit} action={action}/></li>
              </ul>
            </Dropdown>
          </li>
        )
      }
    }
    return buttons;
  }
};
