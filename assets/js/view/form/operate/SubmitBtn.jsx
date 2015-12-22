import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Modal from 'Component/bootstrap/Modal.jsx';
import { Checkbox } from 'Component/form/Checkbox.jsx';
import { Radio } from 'Component/form/Radio.jsx';
import Gritter from 'Component/Gritter.jsx';
import classnames from 'classnames';

const SubmitBtn = React.createClass({
  getDefaultProps() {
    return {
      text: "提交",
      className: "btn btn-success",
      icon: "fa fa-arrow-right",
      onBeforeSubmit: () => true,
      action: React.PropTypes.object.isRequired,
      onSubmit: function () {}
    };
  },
  PropTypes: {
    onBeforeSubmit: React.PropTypes.func,
    action: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func
  },

  triggerClick() {
    if(this.props.action.validateAll()){
      if(this.props.onBeforeSubmit("save") !== false) {
        this.props.action.preview("submit").done(data => {
          this.showSubmitBox(data);
        })
      }
    }
  },
  render() {
    return (
      <button className={this.props.className} onClick={this.triggerClick}>
        <i className={"ace-icon "+this.props.icon}></i>
        {this.props.text}
      </button>
    );
  },
  showSubmitBox(nodes){
    this.ModalBox = Modal.create((
      <div className="submitBox">
        <div className="title">
          流程流转</div>
        <hr></hr>
        <div className="row content">
          <div className="col-md-6 flownodes">
            <font>环节</font>
            <ul onClick={this.toggleItem}>
              {this.renderNodeItem(nodes)}
            </ul>
          </div>

          <div className="col-md-6 psns">
            <font>人员</font>
            <ul>
              <span>张三</span>
            </ul>
          </div>
        </div>
        <div className="opinion">
          <textarea id="opinion" placeholder="同意"></textarea>
        </div>
        <div className="row operate">
          <button className="btn" onClick={this.closeModalBox}>
            取消
            <i className="fa fa-times"></i>
          </button>

          <button className="btn btn-success" onClick={this.submit}>
            确定
            <i className="fa fa-arrow-right "></i>
          </button>
        </div>
      </div>
    ), {
      id: "flowSubmitBox",
      className: "flow"
    });
  },
  renderNodeItem(nodes) {
    return _.map(nodes, (node, index) => {
      if (index !== 0) {
        return (
          <li >
            <Radio defaultValue={node.id} name="nodes">{node.name}</Radio>
          </li>
        );
      } else {
        return (
          <li className="active">
            <Radio defaultChecked defaultValue={node.id} name="nodes">{node.name}</Radio>
          </li>
        );
      }
    })
  },
  submit() {
    $("#flowSubmitBox").css("zIndex", "1000");
    let option = {
      FlowNodeId: $(".flownodes :checked").val(),
      FlowUsers: escape("张三/zhangsan"),
      FlowOpinion: escape($("#opinion").val() || "同意")
    };

    this.props.action.submit(option).done(resp => {
      this.props.onSubmit();
      this.showMessage("succeed", resp["@objectId"]);
    }).fail(() => {
      this.showMessage("failure");
    });
  },
  showMessage(status, objectId){
    let cn = classnames({
      "gritter-light": true,
      "gritter-success": status === "succeed",
      "gritter-error": status === "failure"
    });
    let id = Gritter.add({
      title: '提示',
      time: 900000000,
      class_name: cn,
      after_close: () => {
        if (this.props.action.isNewNote()) {
          window.location.href = `/form.html?form=${this.props.action.getFormPath()}&path=${this.props.action.getPath()}&objectId=${objectId}`;
        }  else {
          window.location.reload();
        }
        Gritter.remove(id);
      },
      text: (
        <div>
          <h5>{status == "succeed" ? "提交成功!" : "提交失败,请重试或联系管理员!"}</h5>
          <div style={{textAlign: "right"}}>
            <a className="btn btn-sm btn-primary" onClick={() => Gritter.remove(id)}>确定</a>
          </div>
        </div>
      )
    })
  },
  closeModalBox() {
    if (this.ModalBox) {
      this.ModalBox.close();
    }
  },
  toggleItem(e) {
    if (e.target.tagName.toUpperCase() != "UL") {
      var $item = $(e.target);
      $item.closest("ul").find("li").removeClass("active");
      $item.closest("li").addClass("active");
    }
  }
});

export default SubmitBtn;
