import React from 'react';
import Modal from 'Component/bootstrap/Modal.jsx';

import BaseBtn from './ExitBtn.jsx';

export default class AccessBtn extends BaseBtn{
  static defaultProps = {
    text: "权限控制",
    className: "btn btn-info",
    icon: "fa fa-check",
    showButton: true
  }
  buttonClick() {
    this.ModalBox = Modal.create((
      <div className="submitBox">
        <div className="title">权限控制</div>
          权限控制
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
  submit(option) {
    this.closeModalBox();
  }
  closeModalBox() {
    if (this.ModalBox) {
      this.ModalBox.close();
    }
  }
};
