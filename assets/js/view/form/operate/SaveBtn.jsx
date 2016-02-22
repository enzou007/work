import React from 'react';

import BaseBtn from './ExitBtn.jsx';
export default class SaveBtn extends BaseBtn{
  static defaultProps = {
    text: "保存",
    className: "btn btn-info",
    icon: "fa fa-check",
    showButton: true
  }
  buttonClick(){
    if(this.props.onBeforeSubmit){
      if(this.props.onBeforeSubmit("save") === false){
        return false;
      }
    }
    this.props.action.save({}).done(resp => {
      if(this.props.onSubmit){
        this.props.onSubmit("save", resp);
      }
      this.showMessage("保存成功!", "y", ()=>{
        if (this.props.action.isNewNote()) {
          window.location.href = `/form.html?form=${this.props.action.getFormPath()}&path=${this.props.action.getPath()}&objectId=${resp["@objectId"]}`;
        }
      })
    }).fail(() => {
      this.showMessage("保存失败!", "n")
    })
  }
};
