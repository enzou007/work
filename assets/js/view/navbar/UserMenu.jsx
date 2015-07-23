import React from "react";

import Avatar from "../../component/Avatar.jsx";
import Dropdown from "../../component/bootstrap/Dropdown.jsx";

import sessionAction from "../../action/session";

const UserMenu = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      objectId: "",
      name: "",
      avatar: null,
      identicons: null
    };
  },
  logout(event) {
    sessionAction.logout();
    event.preventDefault();
  },
  render() {
    return (
      <Dropdown tag="li" className="light-blue" align="right">
        <a href="javascrip:user-menu">
          <Avatar className="nav-user-photo" detail={false} img={this.props.avatar} size={40} userId={this.props.objectId}/>
          <span className="user-info">
            <small>欢迎您,</small>
            {this.props.name}
          </span>
          <i className="ace-icon fa fa-caret-down"/>
        </a>
        <ul className="user-menu dropdown-yellow dropdown-caret dropdown-close">
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
      </Dropdown>
    );
  }
});

export default UserMenu;
