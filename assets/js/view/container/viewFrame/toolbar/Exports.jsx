"use strict";

var React = require("react");

var action = require("../../../../action/viewFrame");

var Exports = React.createClass({
  render: function () {
    return (
      <div className="btn-group">
        <button className="btn btn-link dropdown-toggle" data-toggle="dropdown" title="导出">
          <i className="ace-icon fa fa-share"/>导出
        </button>
        <ul className="dropdown-menu dropdown-default pull-right export">
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
      </div>
    );
  }
});

module.exports = Exports;