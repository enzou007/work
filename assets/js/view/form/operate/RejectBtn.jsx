import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Modal from 'Component/bootstrap/Modal.jsx';
import Gritter from 'Component/Gritter.jsx';
import SubmitBox from './SubmitBox.jsx';

const RejectBtn = React.createClass({
  getDefaultProps() {
    return {
      text: "驳回",
      className: "btn btn-info",
      icon: "fa fa-arrow-left",
      onBeforeSubmit: () => true,
      onSubmit: () => true
    };
  },
  PropTypes: {
    onBeforeSubmit: React.PropTypes.func,
    action: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func
  },
  render() {
    return (
      <button className={this.props.className} onClick={this.triggerClick}>
        <i className={"ace-icon "+this.props.icon}></i>
        {this.props.text}
      </button>
    );
  },
  triggerClick() {
    if (this.props.onBeforeSubmit("reject") !== false) {
      this.props.action.preview("reject").done(data => {
        this.ModalBox = Modal.create((
          <SubmitBox nodes={data} onCancel={this.closeModalBox} onConfirm={this.submit} defaultOpinion="不同意"/>
        ), {
          id: "flowSubmitBox",
          className: "flow"
        });
      })
    }
  },
  submit(option) {
    this.props.action.reject(option).done(() => {
      this.props.onSubmit();
      Gritter.show("驳回成功!", "y", ()=>{ window.location.reload() })
    }).fail(() => {
      Gritter.show("驳回失败,请重试或联系管理员!", "n", ()=>{ window.location.reload() })
    });
  },
  closeModalBox() {
    if (this.ModalBox) {
      this.ModalBox.close();
    }
  }
});

export default RejectBtn;
