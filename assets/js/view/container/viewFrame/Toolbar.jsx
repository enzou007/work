"use strict";

var React = require("react");

require("bootstrap/js/dropdown");

var Toolbar = React.createClass({
  render: function() {
    return (
      <div className="frame-toolbar btn-toolbar">
        {this.props.children}
        <div className="btn-group">
          <button className="btn btn-link" title="新建">
            <i className="ace-icon fa fa-file-text-o"/>新建
          </button>
        </div>
        <div className="btn-group">
          <button className="btn btn-link" title="删除">
            <i className="ace-icon fa fa-trash-o"/>删除
          </button>
        </div>
        <div className="btn-group">
          <button className="btn btn-link" title="刷新">
            <i className="ace-icon fa fa-refresh"/>刷新
          </button>
        </div>
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
      </div>
    );
  }
});

module.exports = Toolbar;
