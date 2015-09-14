import React from "react";
import _ from "underscore";

import Create from "./toolbar/Create.jsx";
import Delete from "./toolbar/Delete.jsx";
import Refresh from "./toolbar/Refresh.jsx";
import Exports from "./toolbar/Exports.jsx";

const Toolbar = React.createClass({
  propTypes: {
    page: React.PropTypes.string.isRequired,
    form: React.PropTypes.string.isRequired,
    showViewButton: React.PropTypes.bool.isRequired,
    customs: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
  },
  getInitialState: function () {
    return {
      allowWrite: true,
      allowDelete: true
    }
  },
  render: function () {
    var formPath = this.props.form,
      flows = this.props.model.get("flows").map(function (flow) {
        flow.form = formPath;
        return flow;
      });

    return (
      <div className="frame-toolbar btn-toolbar">
        {
          this.state.allowWrite ? (
            <Create page={this.props.page} forms={flows} moduleId={this.props.model.get("objectId")}/>
          ) : null
        }
        {
          this.props.customs.map(function (Item, index) {
            return <Item key={index} model={this.props.model}/>
          }, this)
        }
        {
          this.props.showViewButton ? [
            this.state.allowDelete ? <Delete key="delete"/> : null,
            <Refresh key="refresh"/>,
            <Exports key="export"/>
          ] : null
        }
      </div>
    );
  }
});

export default Toolbar;
