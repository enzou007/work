import React from "react";

import Toolbar from "./Toolbar.jsx";
import Form from "Component/form/Form.jsx";

import Message from 'rctui/Message';

import {store as formStore, action as formAction} from "../../action/form";

var DataForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
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
    $.when(formAction.bindModule(), formAction.getObjectId() ? formAction.bindDocument() : null)
      .then(() => {
        if (formAction.getObjectId() && this.props.onLoad) {
          this.props.onLoad();
        } else if (this.props.onCreate) {
          this.props.onCreate();
        }
      });
  },
  render: function() {
    return (
      let store = formStore.data();

      return (
        <div className="no-skin">
          <Message clickaway={true} top={true}/>
          <Toolbar title={this.props.title}>{this.props.toolbar}</Toolbar>
          <div className="main-container" id="main-container">
            <Form className="container" hintType={this.props.hintType} layout={this.props.layout}
              onSubmit={this.props.onSubmit} store={store.get("form")}>
              {this.props.children}
            </Form>
          </div>
        </div>
      );
    );
  }
});

export default DataForm;
