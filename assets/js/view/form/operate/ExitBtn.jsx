import React from 'react';
import Gritter from 'Component/Gritter.jsx';

export default class ExitBtn extends React.Component{
  static defaultProps = {
    text: "关闭",
    className: "btn",
    icon: "fa fa-close",
    showButton: true
  }
  buttonClick() {
    this.props.trigger();
    if (navigator.userAgent.indexOf("MSIE") > 0) {
      if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
        window.opener = null;
        window.close();
      } else {
        window.open('', '_top');
        window.top.close();
      }
    } else if (navigator.userAgent.indexOf("Firefox") > 0) {
      window.location.href = 'about:blank ';
    } else {
      window.opener = null;
      window.open('', '_self', '');
      window.close();
    }
  }
  render() {
    if(this.props.showButton){
      return (
        <button className={this.props.className} onClick={this.buttonClick.bind(this)}>
          <i className={"ace-icon "+this.props.icon}/>
          {this.props.text}
        </button>
      );
    }else{
      return (
        <a onClick={this.buttonClick.bind(this)}>
          {this.props.text}
        </a>
      );
    }
  }
  showMessage(info, type, cb = () => true){
    Gritter.show(info, type, cb);
  }
};
