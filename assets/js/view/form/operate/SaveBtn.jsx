import React from 'react';
import Gritter from 'Component/Gritter.jsx';
import classnames from 'classnames';

const SaveBtn = React.createClass({
  getDefaultProps() {
    return {
      text: "保存",
      className: "btn btn-info",
      icon: "fa fa-check"
    };
  },
  propTypes: {
    action: React.PropTypes.object.isRequired
  },
  triggerClick(){
    if(this.props.onBeforeSubmit){
      if(this.props.onBeforeSubmit() === false){
        return false;
      }
    }
    this.props.action.save({}).done(resp => {
      if(this.props.onSubmit){
        this.props.onSubmit();
      }
      if(this.props.action.isNewNote()){
        this.showMessage("succeed", resp["@objectId"]);
      }else{
        this.showMessage("succeed");
      }
    }).fail(() => {
      this.showMessage("failure");
    })
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
        if (status === "succeed") {
          if (objectId) {
            window.location.href = `/form.html?form=${this.props.action.getFormPath()}&path=${this.props.action.getPath()}&objectId=${objectId}`;
          }
        } else {
          window.location.reload();
        }
        Gritter.remove(id);
      },
      text: (
        <div>
          <h5>{status == "succeed" ? "保存成功!" : "保存失败!"}</h5>
          <div style={{textAlign: "right"}}>
            <a className="btn btn-sm btn-primary" onClick={() => Gritter.remove(id)}>确定</a>
          </div>
        </div>
      )
    })
  },
  render() {
    return (
      <button className={this.props.className} onClick={this.triggerClick}>
        <i className={"ace-icon "+this.props.icon}/>
        {this.props.text}
      </button>
    );
  }
});

export default SaveBtn;
