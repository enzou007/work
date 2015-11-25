import React from 'react';
import action from "../../../action/orgFrame";
import $ from 'jquery';

import Group from 'Component/bootstrap/Group.jsx'
import OrganizationTree from 'Component/form/OrganizationTree.jsx';
import clickAway from 'rctui/src/js/higherorder/clickaway';

@clickAway
export default class Sidebar extends React.Component {
  state={
    openContextMenu: false,
    contextMenuTop: 0,
    contextMenuLeft: 0,
  }

  _deptId = ""
  _deptName = ""
  componentWillUpdate(nextProps, nextState) {
    if (nextState.openContextMenu) {
      this.bindClickAway();
    } else {
      this.unbindClickAway();
    }
  }
  componentClickAway() {
    if(this.state.openContextMenu){
      this.setState({
        openContextMenu: false
      });
    }
  }
  changeOrgTree(item) {
    action.toggleChangeItem({
      type: "personnel",
      departmentId: item["@objectId"],
      condition: [["departmentId", "=", item["@objectId"]]]
    });

    this.props.onChange({
      title: item.name
    });
    this.componentClickAway();
    $(".orgMng-item").removeClass("active");
  }
  toggleChange(type, title, event){
    action.toggleChangeItem({ type });
    this.props.onChange({ title });
    $(".orgMng-item").removeClass("active");
    $(event.target).addClass("active");
  }
  RightClick(event, id, name){
    this._deptId = id;
    this._deptName = name;
    this.setState({
      openContextMenu: true,
      contextMenuTop: event.clientY,
      contextMenuLeft: event.clientX + 10
    });
  }
  DoubleClick(){
    action.modifyDepartment();
  }
  contextMenuClick(funcName){
    action[funcName](this._deptId, this._deptName);
    this.componentClickAway();
  }
  render () {
    // <li><a href={`${action.getPage()}?form=${action._option.View.department.formPath}&path=${action._option.View.department.url}&objectId=${this._deptId}`} target="_blank">修改部门</a></li>
    // <li><a href={`${action.getPage()}?form=${action._option.View.department.formPath}&path=${action._option.View.department.url}&parent=${this._deptId}`} target="_blank">新建部门</a></li>
    // <li><a href={`${action.getPage()}?form=${action._option.View.personnel.formPath}&path=${action._option.View.personnel.url}&parent=${this._deptId}`} target="_blank">新建人员</a></li>
    return (
      <Group maxHeight={this.props.maxHeight} defaultOpen="orgTree">
        <div tab="组织树" id="orgTree">
          <OrganizationTree value={[""]} onClick={this.changeOrgTree.bind(this)}
            onDoubleClick={this.DoubleClick.bind(this)} onRightClick={this.RightClick.bind(this)}/>
          {
            this.state.openContextMenu ?
              <ul className="dropdown-menu orgTree-contextMenu" style={{top: this.state.contextMenuTop + "px", left: this.state.contextMenuLeft + "px"}}>
                <li><b>{this._deptName}</b></li>
                <li className="divider"></li>
                <li><a onClick={this.contextMenuClick.bind(this, "modifyDepartment")}>修改部门</a></li>
								<li><a onClick={this.contextMenuClick.bind(this, "createDepartment")}>新建部门</a></li>
								<li><a onClick={this.contextMenuClick.bind(this, "createPersonnel")}>新建人员</a></li>
							</ul>
              : null
          }
        </div>
        <div tab="组织管理" id="orgMng">
          <div className="orgMng-item" onClick={this.toggleChange.bind(this,"department","部门列表")}>部门列表</div>
          <div className="orgMng-item" onClick={this.toggleChange.bind(this,"personnel","人员列表")}>人员列表</div>
          <div className="orgMng-item" onClick={this.toggleChange.bind(this,"personnel","人员列表-冻结")}>人员列表-冻结</div>
          <div className="orgMng-item" onClick={this.toggleChange.bind(this,"position","岗位列表")}>岗位列表</div>
          <div className="orgMng-item" onClick={this.toggleChange.bind(this,"role","角色列表")}>角色列表</div>
        </div>
      </Group>
    );
  }

}
