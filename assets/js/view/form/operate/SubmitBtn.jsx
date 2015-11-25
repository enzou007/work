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
      if (this.props.onBeforeSubmit("save") !== false) {
        this.ModalBox = Modal.create(this.getSubmitBox(), {
          id: "flowSubmitBox",
          className: "flow"
        });
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
  getSubmitBox() {
    return (
      <div className="submitBox">
        <div className="title">
          流程流转</div>
        <hr></hr>
        <div className="row content">
          <div className="col-md-6 flownodes">
            <font>环节</font>
            <ul onClick={this.toggleItem}>
              {this.getNextNodes()}
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
    )
  },
  getNextNodes() {
    let curNode = _.find(this.props.flow.nodes, node => node.cur);

    let lines = _.filter(this.props.flow.lines, line => line.source === curNode.nodeId);

    return _.map(lines, (line, index) => {
      let node = _.find(this.props.flow.nodes, node => node.nodeId === line.target)
      if (index !== 0) {
        return (
          <li >
            <Radio defaultValue={node.nodeId} name="nodes">{node.nodeName}</Radio>
          </li>
        );
      } else {
        return (
          <li className="active">
            <Radio defaultChecked defaultValue={node.nodeId} name="nodes">{node.nodeName}</Radio>
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
      time: 1500,
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
