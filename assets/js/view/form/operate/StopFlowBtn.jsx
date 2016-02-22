import React from 'react';
import Modal from 'Component/bootstrap/Modal.jsx';

import BaseBtn from './ExitBtn.jsx';
export default class StopFlowBtn extends BaseBtn{
  static defaultProps = {
    text: "终止",
    className: "btn btn-info",
    icon: "fa fa-check",
    showButton: true
  }
  buttonClick() {
    this.ModalBox = Modal.create((
      <div className="submitBox">
        <div><b>是否确定要终止此流程?</b></div>
        <div className="hr hr-20"></div>
        <div className="row operate">
          <button className="btn btn-sm" onClick={this.closeModalBox.bind(this)}>
            取消<i className="fa fa-times"></i>
          </button>
          <button className="btn btn-sm btn-success" onClick={this.submit.bind(this)}>
            确定<i className="fa fa-arrow-right "></i>
          </button>
        </div>
      </div>
    ), {
      id: "flowSubmitBox",
      className: "flow"
    });
  }
  submit() {
    this.props.action.stopFlow().done(resp => {
      this.props.onSubmit("stop", resp);
      this.showMessage("终止成功!", "y", ()=>{ this.props.action.reload() })
    }).fail(() => {
      this.showMessage("终止败,请重试或联系管理员!", "n", ()=>{ this.props.action.reload() })
    });
  }
  closeModalBox() {
    if (this.ModalBox) {
      this.ModalBox.close();
    }
  }
};
