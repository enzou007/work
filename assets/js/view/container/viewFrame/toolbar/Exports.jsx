import React from "react";

import Dropdown from "../../../../component/bootstrap/Dropdown.jsx";

import action from "../../../../action/viewFrame";

const Exports = React.createClass({
  render: function () {
    return (
      <Dropdown className="btn-group" align="right">
        <button className="btn btn-link" title="导出">
          <i className="ace-icon fa fa-share"/>导出
        </button>
        <ul className="dropdown-default export">
          <li>
            <a>导出所选项</a>
          </li>
          <li>
            <a>导出当前页</a>
          </li>
          <li>
            <a>导出所有页</a>
          </li>
        </ul>
      </Dropdown>
    );
  }
});

export default Exports;
