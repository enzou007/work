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
    this.props.action.save(null, option => {
      var cn = classnames({
        "gritter-light": true,
        "gritter-success": option.status === "succeed",
        "gritter-error": option.status === "failure"
      })
      var id = Gritter.add({
        title: '提示',
        time: 1500,
        class_name: cn,
        after_close() {
          if (option.status === "succeed") {
            if (option.isNewNote) {
              window.location.href = option.url;
            }
          } else {
            window.location.reload();
          }
          Gritter.remove(id);
        },
        text: (
          <div>
            <h5>{option.status == "succeed" ? "保存成功!" : "保存失败!"}</h5>
            <div style={{textAlign: "right"}}>
              <a className="btn btn-sm btn-primary" onClick={() => Gritter.remove(id)}>确定</a>
            </div>
          </div>
        )
      })
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
