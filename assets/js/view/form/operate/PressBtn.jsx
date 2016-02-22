import React from 'react';

import BaseBtn from './ExitBtn.jsx';
export default class PressBtn extends BaseBtn{
  static defaultProps = {
    text: "催办",
    className: "btn btn-info",
    icon: "fa fa-check",
    showButton: true
  }
  buttonClick(){
    this.props.action.press().done(resp => {
      this.showMessage("催办成功!", "y")
    }).fail(() => {
      this.showMessage("催办失败,请重试或联系管理员!", "n")
    });
  }
};
