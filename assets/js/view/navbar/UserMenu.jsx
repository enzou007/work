"use strict";

var React = require("react");

var Avatar = require("../../component/Avatar.jsx");

require("bootstrap/js/dropdown");

var sessionAction = require("../../action/session");

var UserMenu = React.createClass({
  getDefaultProps: function() {
    return {
      objectId: "",
      name: "",
      avatar: null,
      identicons: null
    };
  },
  propTypes: {
    name: React.PropTypes.string
  },
  logout: function(event) {
    sessionAction.logout();
    event.preventDefault();
  },
  render: function() {
    return (
      <li className="light-blue">
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
          <Avatar className="nav-user-photo" detail={false} img={this.props.avatar} size={40} userId={this.props.objectId}/>
          <span className="user-info">
            <small>欢迎您,</small>
            {this.props.name}
          </span>
          <i className="ace-icon fa fa-caret-down"/>
        </a>
        <ul className="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
          <li>
            <a href="#">
              <i className="ace-icon fa fa-cog"/>
              个人设置</a>
          </li>
          <li>
            <a href="profile.html">
              <i className="ace-icon fa fa-user"/>
              帮助
            </a>
          </li>
          <li className="divider"/>
          <li>
            <a href="javascript:logout" onClick={this.logout}>
              <i className="ace-icon fa fa-power-off"/>
              注销
            </a>
          </li>
        </ul>
      </li>
    );
  }
});

module.exports = UserMenu;
