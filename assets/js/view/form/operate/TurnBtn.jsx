import React from 'react';
import Modal from 'Component/bootstrap/Modal.jsx';
import SubmitBox from './SubmitBox.jsx';
import BaseBtn from './ExitBtn.jsx';

export default class TurnBtn extends BaseBtn{
  static defaultProps = {
    text: "转办",
    className: "btn btn-info",
    icon: "fa fa-check",
    showButton: true
  }
  buttonClick(){
    if(this.props.action.validateAll()){
      if(this.props.onBeforeSubmit("submit") !== false) {
        this.ModalBox = Modal.create((
          <SubmitBox title="转办" onCancel={this.closeModalBox.bind(this)} onConfirm={this.submit.bind(this)} showNodes={false} showOpinion={false}/>
        ), {
          id: "flowSubmitBox",
          className: "flow"
        });
      }
    }
  }
  submit(option) {
    this.props.action.turn(option).done(resp => {
      this.props.onSubmit("turn", resp);
      this.showMessage("转办成功!", "y", ()=>{ this.props.action.reload() })
    }).fail(() => {
      this.closeModalBox();
      this.showMessage("转办失败,请重试或联系管理员!", "n");
    });
  }
  closeModalBox() {
    if (this.ModalBox) {
      this.ModalBox.close();
    }
  }
};
