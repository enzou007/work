import React from "react";
import $ from "jquery";
import Toolbar from "./Toolbar.jsx";
import Form from "Component/form/Form.jsx";
import SaveBtn from "./operate/SaveBtn.jsx";
import { getAction } from '../../action/form';

var DataForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    toolbar: React.PropTypes.array,
    onCreate: React.PropTypes.func,
    onLoad: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    onBeforeSubmit: React.PropTypes.func
  },
  getInitialState() {
    return {
      action: getAction('@main')
    };
  },
  getDefaultProps() {
    return {
      hintType: "pop",
      layout: "aligned"
    };
  },
  componentWillMount: function () {
    let formAction = this.state.action;
    $.when(formAction.bindSession(), formAction.getObjectId() ? formAction.bindDocument() : null)
      .then(() => {
        if (formAction.getObjectId() && this.props.onLoad) {
          this.props.onLoad();
        } else if (this.props.onCreate) {
          this.props.onCreate();
        }
      });
  },
  render: function() {
    let action = this.state.action,
        store = action.getStore().data();
      return (
        <div className="no-skin">
          <Toolbar title={this.props.title || "配置单"}>
            <li><SaveBtn action={action} onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit}/></li>
            {this.props.toolbar}
          </Toolbar>
          <div className="main-container" id="main-container">
            <Form className="container" channel={action} hintType={this.props.hintType} layout={this.props.layout}
              onSubmit={this.props.onSubmit} store={store.get("form")}>
              {this.props.children}
            </Form>
          </div>
        </div>
      );
  }
});

export default DataForm;
