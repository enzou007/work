import React from "react";

import action from "../../../../action/viewFrame";

const Refresh = React.createClass({
  triggerRefresh() {
    action.refreshDataCollection();
  },
  render() {
    return (
      <div className="btn-group">
        <button className="btn btn-link" title="刷新" onClick={this.triggerRefresh}>
          <i className="ace-icon fa fa-refresh"/>刷新
        </button>
      </div>
    );
  }
});

export default Refresh;
