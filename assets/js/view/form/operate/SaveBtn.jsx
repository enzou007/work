import React from 'react';
import Gritter from 'Component/Gritter.jsx';

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
      if(this.props.onBeforeSubmit("save") === false){
        return false;
      }
    }
    this.props.action.save({}).done(resp => {
      if(this.props.onSubmit){
        this.props.onSubmit();
      }
      Gritter.show("保存成功!", "y", ()=>{
        if (this.props.action.isNewNote()) {
          window.location.href = `/form.html?form=${this.props.action.getFormPath()}&path=${this.props.action.getPath()}&objectId=${resp["@objectId"]}`;
        }
      })
    }).fail(() => {
      Gritter.show("保存失败!", "n")
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
