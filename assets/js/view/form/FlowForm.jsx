import React from 'react';
import _ from 'underscore';
import $ from 'jquery';

import iflux from 'iflux';

import Toolbar from "./Toolbar.jsx";
import TimeLine from "./timeline/TimeLine.jsx";
import FlowMap from "./flowmap/FlowMap.jsx";
import Form from "Component/form/Form.jsx";
import Tabs from "Component/bootstrap/Tabs.jsx";
import Message from 'rctui/message';

import {store as formStore, action as formAction} from '../../action/form';

import '../../../less/flow.less';

const FlowForm = React.createClass({
  propTypes: {
    onCreate: React.PropTypes.func,
    onLoad: React.PropTypes.func,
    onBeforeSubmit: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },
  getInitialState() {
    return {
      showFlow: false
    };
  },
  getDefaultProps() {
    return {
      hintType: 'pop',
      layout: 'aligned'
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

  tabClick(tabName, tabIndex) {
    if(tabName === "流程信息"){
      if(!this.state.showFlow){
        this.setState({
          showFlow: true
        });
      }
    }
  },
  render() {
    let store = formStore.data();
    var logs = store.get("log").toJS();
    return (
      <div className='no-skin'>
        <Message clickaway={true} top={true}/>
        <Toolbar title={store.get("flow").get("name") || "表单"} onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit}>{this.props.toolbar}</Toolbar>
        <div className="main-container" id="main-container">
          <Form hintType={this.props.hintType} layout={this.props.layout}
            className={"container" + (logs.length === 0 ? " container-center" : "")}
            onSubmit={this.props.onSubmit} store={store.get("form")} >
            <Tabs tabClick={this.tabClick}>
              {this.props.children}
              <div className="form-content" tab="流程信息">
                {this.state.showFlow ? <FlowMap flow={store.get("flow").toJS()} /> : <div />}
              </div>
            </Tabs>
          </Form>
        </div>
        <TimeLine logs={logs} />
      </div>
    );
  }
});

export default FlowForm;
