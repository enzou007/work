import React from "react";
import _ from "underscore";
import action from "../../../../action/orgFrame";
import Dropdown from "../../../../component/bootstrap/Dropdown.jsx";

let Create = React.createClass({
  createPersonnel() {
    action.createPersonnel();
  },
  createDepartment() {
    action.createDepartment();
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
