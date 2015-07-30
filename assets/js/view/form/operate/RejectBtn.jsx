import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Modal from 'Component/bootstrap/Modal.jsx';
import Checkbox from 'Component/Checkbox.jsx';
import Radio from 'Component/Radio.jsx';
import Gritter from 'Component/Gritter.jsx';


const RejectBtn = React.createClass({
  getDefaultProps() {

var React = require("react"),
  $ = require("jquery"),
  _ = require('underscore');
var Modal = require("Component/bootstrap/Modal.jsx");
var Checkbox = require("Component/Checkbox.jsx");
var Radio = require("Component/Radio.jsx");
var Gritter = require('Component/Gritter.jsx');

var RejectBtn = React.createClass({

  getDefaultProps: function () {
    return {
      text: "驳回",
      className: "btn btn-info",
      icon: "fa fa-arrow-left",
      befer: () => true
    };
  },
  PropTypes: {
    onBeforeSubmit: React.PropTypes.func,
    trigger: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },
  triggerClick() {
    this.ModalBox = Modal.create(this.getSubmitBox(), {
      id: "flowSubmitBox",
      className: "flow"
    });
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
          <textarea id="opinion" placeholder="不同意"></textarea>
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
    var nodes = _.filter(this.props.flow.nodes, node => node.done);

    return _.map(nodes, (node, index) => {
      if (index !== 0) {
        return (
          <li>
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
      FlowOpinion: escape($("#opinion").val() || "不同意")
    };
    this.props.trigger(option, result => {
      var id = Gritter.add({
        title: '提示',
        time: 1000,
        sticky: result.status == "failure",
        class_name: "gritter-center " + (result.status == "succeed"
          ? "gritter-success"
          : "gritter-error"),
        after_close() {
          if (result.isNewNote) {
            window.location.href = result.url;
          } else {
            window.location.reload();
          }
          Gritter.remove(id, {
            fade: false,
            speed: 'fast'
          });
        },
        text: (
          <div>
            <h5>{result.status == "succeed" ? "驳回成功!" : "驳回失败,请重试或联系管理员!"}</h5>
            <div style={{textAlign: "right"}}>
              <a className="btn btn-sm btn-primary" onClick={function(){Gritter.remove(id, {fade: false,speed: 'fast'});}}>确定</a>
            </div>
          </div>
        )
      });
    });
    this.props.onSubmit();
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

export default RejectBtn;
