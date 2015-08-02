import React from 'react';

const ExitBtn = React.createClass({

  getDefaultProps() {
    return {
      text: "关闭",
      className: "btn",
      icon: "fa fa-close",
      trigger: function(){}
    };
  },
  render() {
    return (
      <button className={this.props.className} onClick={this.props.trigger}>
        <i className={"ace-icon "+this.props.icon}/>
        {this.props.text}
      </button>
    );
  }

});

export default ExitBtn;
