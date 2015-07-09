"use strict";

var React = require("react"),
  Gritter= require("../../../../component/Gritter.jsx");

var action = require("../../../../action/viewFrame");

var Delete = React.createClass({
  triggerDelete: function () {

    if (action.getDataCollection().selectedLength > 0) {
      var id = Gritter.add({
        title: '提示',
        class_name: 'gritter-center gritter-info',
        text: (
          <div>
            <h5>是否删除所选文档？</h5>
            <div style={{textAlign: "right"}}>
              <a className="btn btn-sm btn-danger" onClick={function() {
                action.deleteSelectedData();
                Gritter.remove(id);
              }}>确定</a>&nbsp;
              <a className="btn btn-sm" onClick={function() {
                Gritter.remove(id);
              }}>取消</a>
            </div>
          </div>
        )
      });
    }
  },
  render: function () {
    return (
      <div className="btn-group">
        <button className="btn btn-link" title="删除" onClick={this.triggerDelete}>
          <i className="ace-icon fa fa-trash-o"/>删除
        </button>
      </div>
    );
  }
});

module.exports = Delete;