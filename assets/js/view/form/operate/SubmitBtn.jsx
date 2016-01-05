import React from 'react';
import $ from 'jquery';
import _ from 'underscore';

import Modal from 'Component/bootstrap/Modal.jsx';
import Gritter from 'Component/Gritter.jsx';
import SubmitBox from './SubmitBox.jsx';

const SubmitBtn = React.createClass({
  getDefaultProps() {
    return {
      text: "提交",
      className: "btn btn-success",
      icon: "fa fa-arrow-right",
      action: React.PropTypes.object.isRequired,
      onBeforeSubmit: () => true,
      onSubmit: () => true
    };
  },
  render() {
    return (
      <button className={this.props.className} onClick={this.triggerClick}>
        <i className={"ace-icon "+this.props.icon}></i>
        {this.props.text}
      </button>
    );
  },
  triggerClick() {
    if(this.props.action.validateAll()){
      if(this.props.onBeforeSubmit("submit") !== false) {
        this.props.action.preview("submit").done(data => {
          this.ModalBox = Modal.create((
            <SubmitBox nodes={data} onCancel={this.closeModalBox} onConfirm={this.submit} />
          ), {
            id: "flowSubmitBox",
            className: "flow"
          });
        })
      }
    }
  },
  submit(option) {
    this.props.action.submit(option).done(resp => {
      this.props.onSubmit();
      Gritter.show("提交成功!", "y", ()=>{
        if (this.props.action.isNewNote()) {
          window.location.href = `/form.html?form=${this.props.action.getFormPath()}&path=${this.props.action.getPath()}&objectId=${resp["@objectId"]}`;
        }else{
          window.location.reload();
        }
      })
    }).fail(() => {
      Gritter.show("提交失败,请重试或联系管理员!", "n")
    });
  },
  closeModalBox() {
    if (this.ModalBox) {
      this.ModalBox.close();
    }
  }
});

export default SubmitBtn;
