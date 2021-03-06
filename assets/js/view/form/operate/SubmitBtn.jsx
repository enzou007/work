import React from 'react';
import Modal from 'Component/bootstrap/Modal.jsx';
import SubmitBox from './SubmitBox.jsx';

import BaseBtn from './ExitBtn.jsx';
export default class SubmitBtn extends BaseBtn{
  static defaultProps = {
    text: "提交",
    className: "btn btn-success",
    icon: "fa fa-arrow-right",
    onBeforeSubmit: () => true,
    onSubmit: () => true,
    showButton: true
  }
  buttonClick() {
    if(this.props.action.validateAll()){
      if(this.props.onBeforeSubmit("submit") !== false) {
        this.props.action.preview("submit").done(data => {
          this.ModalBox = Modal.create((
            <SubmitBox nodes={data} onCancel={this.closeModalBox.bind(this)} onConfirm={this.submit.bind(this)} />
          ), {
            id: "flowSubmitBox",
            className: "flow"
          });
        })
      }
    }
  }
  submit(option) {
    this.props.action.submit(option).done(resp => {
      this.props.onSubmit("submit", resp);
      this.showMessage("提交成功!", "y", ()=>{
        if (this.props.action.isNewNote()) {
          window.location.href = `/form.html?form=${this.props.action.getFormPath()}&path=${this.props.action.getPath()}&objectId=${resp["@objectId"]}`;
        }else{
          this.props.action.reload();
        }
      })
    }).fail(() => {
      this.showMessage("提交失败,请重试或联系管理员!", "n")
    });
  }
  closeModalBox() {
    if (this.ModalBox) {
      this.ModalBox.close();
    }
  }
};
