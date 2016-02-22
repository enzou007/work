import React from 'react';
import Modal from 'Component/bootstrap/Modal.jsx';
import SubmitBox from './SubmitBox.jsx';
import BaseBtn from './ExitBtn.jsx';

export default class ApostilleBtn extends BaseBtn{
  static defaultProps = {
    text: "加签",
    className: "btn btn-info",
    icon: "fa fa-check",
    showButton: true
  }
  buttonClick(){
    if(this.props.action.validateAll()){
      if(this.props.onBeforeSubmit("apostille") !== false) {
        this.ModalBox = Modal.create((
          <SubmitBox title="加签" onCancel={this.closeModalBox.bind(this)} onConfirm={this.submit.bind(this)} showNodes={false} showOpinion={false}/>
        ), {
          id: "flowSubmitBox",
          className: "flow"
        });
      }
    }
  }
  submit(option) {
    this.props.action.apostille(option).done(resp => {
      this.props.onSubmit("apostille", resp);
      this.showMessage("加签成功!", "y", ()=>{
        this.props.action.reload();
      })
    }).fail(() => {
      this.closeModalBox();
      this.showMessage("加签失败,请重试或联系管理员!", "n");
    });
  }
  closeModalBox() {
    if (this.ModalBox) {
      this.ModalBox.close();
    }
  }
};
