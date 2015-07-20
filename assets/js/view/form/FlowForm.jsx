import React from "react";
import $ from "jquery";

import Toolbar from "./Toolbar.jsx";
import TimeLine from "./timeline/TimeLine.jsx";
import Form from "Component/form/Form.jsx";

import Message from 'rctui/Message';

import formAction from "../../action/form";

import "../../../less/flow.less";

let FlowForm = React.createClass({
  propTypes: {
    onBeforeSubmit: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },
  getDefaultProps: function () {
    return {
      hintType: "pop",
      layout: "aligned"
    };
  },
  getInitialState() {
    return {
      flow: formAction.getFlow(),
      log: formAction.getOperateLog(),
      store: formAction.getDocument()
    };
  },
  componentWillMount () {
    formAction.on("load", () => {
      this.forceUpdate();
    });
  },
  render() {
    var title = this.state.flow.name || "表单";

    return (
      <div className="no-skin">
        <Message clickaway={true} top={true}/>
        <Toolbar title={this.state.flow.name || "表单"}>{this.props.toolbar}</Toolbar>
        <div className="main-container" id="main-container">
          <Form className="container" hintType={this.props.hintType} layout={this.props.layout}
            onSubmit={this.props.onSubmit} store={this.state.store}>
            {this.props.children}
          </Form>
        </div>
        <TimeLine/>
      </div>
    );
  }
});

export
default FlowForm;
