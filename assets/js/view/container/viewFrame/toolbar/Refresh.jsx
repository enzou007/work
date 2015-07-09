"use strict";

var React = require("react");

var action = require("../../../../action/viewFrame");

var Refresh = React.createClass({
  triggerRefresh: function () {
    action.refreshDataCollection();
  },
  render: function () {
    return (
      <div className="btn-group">
        <button className="btn btn-link" title="刷新" onClick={this.triggerRefresh}>
          <i className="ace-icon fa fa-refresh"/>刷新
        </button>
      </div>
    );
  }
});

module.exports = Refresh;