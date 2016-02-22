import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Modal from 'Component/bootstrap/Modal.jsx';
import SubmitBox from './SubmitBox.jsx';

import BaseBtn from './ExitBtn.jsx';
export default class RejectBtn extends BaseBtn{
  static defaultProps = {
    text: "驳回",
    className: "btn btn-info",
    icon: "fa fa-arrow-left",
    onBeforeSubmit: () => true,
    onSubmit: () => true,
    showButton: true
  }
  buttonClick() {
    if (this.props.onBeforeSubmit("reject") !== false) {
      this.props.action.preview("reject").done(data => {
        this.ModalBox = Modal.create((
          <SubmitBox nodes={data} onCancel={this.closeModalBox.bind(this)} onConfirm={this.submit.bind(this)} defaultOpinion="不同意"/>
        ), {
          id: "flowSubmitBox",
          className: "flow"
        });
      })
    }
  }
  submit(option) {
    this.props.action.reject(option).done(resp => {
      this.props.onSubmit("reject", resp);
      this.showMessage("驳回成功!", "y", ()=>{ this.props.action.reload() })
    }).fail(() => {
      this.closeModalBox();
      this.showMessage("驳回失败,请重试或联系管理员!", "n");
    });
  }
  closeModalBox() {
    if (this.ModalBox) {
      this.ModalBox.close();
    }
  }
};
