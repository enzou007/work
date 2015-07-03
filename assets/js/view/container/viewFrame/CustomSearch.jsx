"use strict";

var React = require("react");

var CustomSearch = React.createClass({
  render: function() {
    return (
      <div className="custom-search-panel">
        <div className="row">
          <div className="col-xs-6">
            条件
          </div>
          <div className="col-xs-6">
            列选择
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-primary btn-sm"><i className="ace-icon fa fa-save"/>保存</button>
          <button className="btn btn-success btn-sm"><i className="ace-icon fa fa-search"/>查询</button>
        </div>
      </div>
    );
  }
});

module.exports = CustomSearch;
