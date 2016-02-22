import React from 'react';
import Modal from 'Component/bootstrap/Modal.jsx';
import SubmitBox from './SubmitBox.jsx';
import BaseBtn from './ExitBtn.jsx';

export default class NotifyBtn extends BaseBtn{
  static defaultProps = {
    text: "通知",
    className: "btn btn-info",
    icon: "fa fa-check",
    showButton: true
  }
  buttonClick(){
    if(this.props.action.validateAll()){
      this.ModalBox = Modal.create((
        <SubmitBox title="通知" onCancel={this.closeModalBox.bind(this)} onConfirm={this.submit.bind(this)} showNodes={false} showOpinion={false}/>
      ), {
        id: "flowSubmitBox",
        className: "flow"
      });
    }
  }
  submit(option) {
    this.props.action.notify(option).done(resp => {
      this.showMessage("通知成功!", "y");
      this.closeModalBox();
    }).fail(() => {
      this.showMessage("通知失败,请重试或联系管理员!", "n");
      this.closeModalBox();
    });

  }
  closeModalBox() {
    if (this.ModalBox) {
      this.ModalBox.close();
    }
  }
};
