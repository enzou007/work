import React from 'react';
import _ from 'underscore';
import $ from 'jquery';
import { getAction } from 'Action/form';

import classnames from 'classnames';

import FlowToolbar from './FlowToolbar.jsx';
import TimeLine from './timeline/TimeLine.jsx';
import FlowMap from './flowmap/FlowMap.jsx';
import Form from 'Component/form/Form.jsx';
import Tabs from 'Component/bootstrap/Tabs.jsx';
import Scrollbar from 'Component/Scrollbar.jsx';
import Message from 'rctui/message';

import 'Less/flowform.less';

const FlowForm = React.createClass({
  propTypes: {
    onCreate: React.PropTypes.func,
    onLoad: React.PropTypes.func,
    onBeforeSubmit: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },
  getInitialState() {
    return {
      showFlow: false,
      action: getAction('@main')
    };
  },
  getDefaultProps() {
    return {
      hintType: 'pop',
      layout: 'aligned',
      onBeforeSubmit: () => true,
      onSubmit: () => true
    };
  },
  componentWillMount: function () {
    let formAction = this.state.action;

    $.when(formAction.bindSession(), formAction.getObjectId() ? formAction.bindDocument() : formAction.bindFlow())
      .done(() => {
        if (formAction.getObjectId()) {
          formAction.bindFlowLog().then(() => {
            if (this.props.onLoad) {
              this.props.onLoad();
            }
          });
        } else if (this.props.onCreate) {
          this.props.onCreate();
        }
      })
      .fail((xhr1) => {
        console.log(this);
        console.log(xhr1);
      });
  },
  showFlowMap(tabName, tabIndex) {
    if(!this.state.showFlow){
      this.setState({
        showFlow: true
      });
    }
  },
  render() {
    let action = this.state.action,
      store = action.getStore().data();
    let log = store.get('log');
    let curNode = action.getCurNode();
    return (
      <div className="no-skin">
        <Message clickaway={true} top={true}/>
        <FlowToolbar onBeforeSubmit={this.props.onBeforeSubmit} onSubmit={this.props.onSubmit} action={action}/>
        <div className="main-container" id="main-container">
          <Form hintType={this.props.hintType} layout={this.props.layout}
            className={`container ${log.size === 0 ? "container-center" : ""}`} channel={action} store={store.get("form")} >
            <Tabs>
              {this.props.children}
              <div className="form-content" tab="流程信息" onShow={this.showFlowMap}>
                <div className="page-header">
                  <h1>{store.get("flow").get("name") + "-流程图"}</h1>
                </div>
                {this.state.showFlow ? <Scrollbar style={{height:"500px", width:"100%"}} className="ex3" autoshow={true}><FlowMap log={log} curNode={curNode} flow={store.get("flow").get("nodes")} n /></Scrollbar> : <div />}

                <div className="hr hr-double dotted"></div>

                <div className="page-header">
                  <h1>{store.get("flow").get("name") + "-操作日志"}</h1>
                </div>
                <TimeLine log={log} type="table" curNode={curNode}/>
              </div>
            </Tabs>
          </Form>
        </div>
        <TimeLine log={log} curNode={curNode}/>
      </div>
    );
  }
});

export default FlowForm;
