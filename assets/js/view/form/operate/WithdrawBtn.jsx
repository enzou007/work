import React from 'react';
import Modal from 'Component/bootstrap/Modal.jsx';
import BaseBtn from './ExitBtn.jsx';
export default class WithdrawBtn extends BaseBtn{
  static defaultProps = {
    text: "抽单",
    className: "btn btn-info",
    icon: "fa fa-check",
    showButton: true
  }
  buttonClick() {
    this.ModalBox = Modal.create((
      <div className="submitBox">
        <div><b>是否确定要抽单?</b></div>
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
    this.props.action.withdraw().done(resp => {
      this.props.onSubmit("withdraw", resp);
      this.showMessage("抽单成功!", "y", ()=>{ this.props.action.reload() })
    }).fail(() => {
      this.closeModalBox();
      this.showMessage("抽单失败,请重试或联系管理员!", "n");
    });
  }
  closeModalBox() {
    if (this.ModalBox) {
      this.ModalBox.close();
    }
  }
};
