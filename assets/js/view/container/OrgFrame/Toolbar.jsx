var React = require('react');
import Search from "./toolbar/Search.jsx";
import Create from "./toolbar/Create.jsx";
import Delete from "./toolbar/Delete.jsx";
import Refresh from "./toolbar/Refresh.jsx";
import Exports from "./toolbar/Exports.jsx";
var Toolbar = React.createClass({

  render: function() {
    return (
      <div className="org-toolbar">
        <div className="page-header">
          <div className="view-breadcrumb">
            <h1>{this.props.title}</h1>
          </div>
          <div className="frame-toolbar btn-toolbar">
            <Search key="search"/>
            <Create key="create"/>
            <Delete key="delete"/>
            <Refresh key="refresh"/>
            <Exports key="export"/>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Toolbar;
