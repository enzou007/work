import React from "react";

import Gritter from "../../../../component/Gritter.jsx";

import action from "../../../../action/viewFrame";

const Delete = React.createClass({
  triggerDelete() {
    if (action.getDataCollection().selectedLength > 0) {
      var id = Gritter.add({
        title: '提示',
        class_name: 'gritter-center gritter-info',
        text: (
          <div>
            <h5>是否删除所选文档？</h5>
            <div style={{textAlign: "right"}}>
              <a className="btn btn-sm btn-danger" onClick={() => {
                action.deleteSelectedData().done(() => {
                  this.showInfo("gritter-success", "删除成功!");
                }).fail(() => {
                  this.showInfo("gritter-error", "删除失败!");
                });
                Gritter.remove(id);
              }}>确定</a>&nbsp;
              <a className="btn btn-sm" onClick={() => {
                Gritter.remove(id);
              }}>取消</a>
            </div>
          </div>
        )
      });
    }
  },
  showInfo(cn, info) {
    var id = Gritter.add({
      title: '提示',
      time: 1000,
      class_name: "gritter-light " + cn,
      text: (
        <div>
          <h5>{info}</h5>
          <div style={{textAlign: "right"}}>
            <a className="btn btn-sm" onClick={() => {
              Gritter.remove(id);
            }}>关闭</a>
          </div>
        </div>
      )
    });
  },
  render() {
    return (
      <div className="btn-group">
        <button className="btn btn-link" title="删除" onClick={this.triggerDelete}>
          <i className="ace-icon fa fa-trash-o"/>删除
        </button>
      </div>
    );
  }
});

export default Delete;
