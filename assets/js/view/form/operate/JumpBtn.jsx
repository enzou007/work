import React from 'react';
import Modal from 'Component/bootstrap/Modal.jsx';
import SubmitBox from './SubmitBox.jsx';

import BaseBtn from './ExitBtn.jsx';
export default class JumpBtn extends BaseBtn{
  static defaultProps = {
    text: "强制跳转",
    className: "btn btn-info",
    icon: "fa fa-check",
    onBeforeSubmit: () => true,
    onSubmit: () => true,
    showButton: true
  }
  buttonClick() {
    if(this.props.action.validateAll()){
      if(this.props.onBeforeSubmit("jump") !== false) {
        this.props.action.preview("jump").done(data => {          
          this.ModalBox = Modal.create((
            <SubmitBox nodes={data} onCancel={this.closeModalBox.bind(this)} onConfirm={this.submit.bind(this)} showOpinion={false}/>
          ), {
            id: "flowSubmitBox",
            className: "flow"
          });
        })
      }
    }
  }
  submit(option) {
    this.props.action.jump(option).done(resp => {
      this.props.onSubmit("jump", resp);
      this.showMessage("跳转成功!", "y", ()=>{
        if (this.props.action.isNewNote()) {
          window.location.href = `/form.html?form=${this.props.action.getFormPath()}&path=${this.props.action.getPath()}&objectId=${resp["@objectId"]}`;
        }else{
          this.props.action.reload();
        }
      })
    }).fail(() => {
      this.showMessage("跳转失败,请重试或联系管理员!", "n")
    });
  }
  closeModalBox() {
    if (this.ModalBox) {
      this.ModalBox.close();
    }
  }
};
