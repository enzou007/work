import React from 'react';

const ExitBtn = React.createClass({

  getDefaultProps() {
    return {
      text: "关闭",
      className: "btn",
      icon: "fa fa-close",
      trigger: function () {}
    };
  },
  triggerClick() {
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

export default ExitBtn;
