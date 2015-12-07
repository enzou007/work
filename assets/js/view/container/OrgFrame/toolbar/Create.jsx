import React from "react";
import _ from "underscore";
import action from "Action/viewFrame";
import Dropdown from "Component/bootstrap/Dropdown.jsx";

let Create = React.createClass({
  createPersonnel() {
    //action._activeDeptId 在view/container/OrgFrame/Sidebar.jsx changeOrgTree方法触发时写入值
    window.open(action.getOption().formURL.personnel + (action._activeDeptId ? "&parent="+action._activeDeptId : ""));
  },
  createDepartment() {
    window.open(action.getOption().formURL.department + (action._activeDeptId ? "&parent="+action._activeDeptId : ""));
  },
  render() {
    return (
      <Dropdown className="btn-group">
        <button className="btn btn-link" title="新建">
          <i className="ace-icon fa fa-file-text-o"/>新建
        </button>
        <ul>
          <li>
            <a onClick={this.createPersonnel}>
              <i className="ace-icon fa fa-file-text-o"/>新建人员
            </a>
          </li>
          <li>
            <a onClick={this.createDepartment}>
              <i className="ace-icon fa fa-file-text-o"/>新建部门
            </a>
          </li>
        </ul>
      </Dropdown>
    );
  }
});

export default Create;
