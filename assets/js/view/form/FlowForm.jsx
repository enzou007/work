import React from "react";
import _ from "underscore";
import $ from "jquery";

import iflux from 'iflux';

import Toolbar from "./Toolbar.jsx";
import TimeLine from "./timeline/TimeLine.jsx";
import Form from "Component/form/Form.jsx";

import Message from 'rctui/message';

import {store as formStore, action as formAction} from "../../action/form";

import "../../../less/flow.less";

const FlowForm = React.createClass({
  propTypes: {
    onCreate: React.PropTypes.func,
    onLoad: React.PropTypes.func,
    onBeforeSubmit: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      hintType: "pop",
      layout: "aligned"
    };
  },
  componentWillMount: function () {
    $.when(formAction.bindSession(), formAction.getObjectId() ? formAction.bindDocument() : formAction.bindFlow())
      .then(() => {
        if (formAction.getObjectId()) {
          formAction.bindFlowLog().then(() => {
            if (this.props.onLoad) {
              this.props.onLoad();
            }
          });
        } else if (this.props.onCreate) {
          this.props.onCreate();
        }
      });
  },
  render() {
    let store = formStore.data();

    return (
      <div className="no-skin">
        <Message clickaway={true} top={true}/>
        <Toolbar title={store.get("flow").get("name") || "表单"}>{this.props.toolbar}</Toolbar>
        <div className="main-container" id="main-container">
          <Form className="container" hintType={this.props.hintType} layout={this.props.layout} onSubmit={this.props.onSubmit} store={store.get("form")}>
            {this.props.children}
          </Form>
        </div>
        {/*<TimeLine/>*/}
      </div>
    );
  }
});

export default FlowForm;
