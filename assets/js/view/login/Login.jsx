"use strict";

var React = require("react"),
  Backbone = require("backbone"),
  _ = require("underscore"),
  $ = require("jquery"),
  classNames = require("classnames");

var Modal = require("../../component/bootstrap/Modal.jsx"),
  Button = require("../../component/bootstrap/Button.jsx");

var session = require("../../store/session"),
  action = require("../../action/session");

require("../../../less/app/login.less");
require("backbone-react-component");

var Login = React.createClass({
  statics: {
    show: function(options) {
      var modal = Modal.create(<Login model={session}/>, _.extend({
        id: "loginModal",
        keyboard: false,
        backdrop: "static"
      }, options));
      session.once("sync", function() {
        modal.close();
      });
    }
  },
  mixins: [Backbone.React.Component.mixin],
  propTypes: {
    model: React.PropTypes.instanceOf(Backbone.Model).isRequired
  },
  getInitialState: function() {
    return {
      remember: false
    };
  },
  handleChange: function(e) {
    var state = {
      isInvalid: false,
      hasError: false
    };
    state[e.target.name] = e.target.value;
    this.setState(state);
  },
  handleChecked: function(e) {
    this.setState({
      "remember": e.target.checked
    });
  },
  onSubmit: function(e) {
    action.login(_.pick(this.state, "email", "password", "remember"));
    e.preventDefault();
  },
  getValidationInfo: function() {
    if (this.state.isInvalid) {
      return this.getModel().validationError
    }
    if (this.state.hasError) {
      switch (this.state.error.responseText.split(",")[0]) {
      case "Code 100":
        return {
          email: "该邮箱未注册"
        };
      case "Code 101":
        return {
          password: "您输入的密码有误"
        };
      default:
        return {};
      }
    }
    return {};
  },
  render: function() {
    var validation = this.getValidationInfo();

    return (
      <form onSubmit={this.onSubmit}>
        <div className="modal-header center">
          <h1>
            <i className="ace-icon fa fa-leaf green"/>
            <span className="red">
              Ace</span>
            <span className="white">
              Application</span>
          </h1>
          <h4 className="light-blue">© Company Name</h4>
        </div>
        <div className="modal-body">
          <fieldset>
            <legend className="header blue lighter smaller">
              <i className="ace-icon fa fa-coffee green"/>
              请输入您的信息
            </legend>
            <div className={classNames("form-group input-icon input-icon-right", {"has-error": validation.email})}>
              <input className="form-control " name="email" onChange={this.handleChange}
                placeholder="请输入注册邮箱" type="email"/>
              <i className="ace-icon fa fa-user fa-fw"/>
              <span className="help-block">{validation.email}</span>
            </div>
            <div className={classNames("form-group input-icon input-icon-right", {"has-error": validation.password})}>
              <input className="form-control " name="password" onChange={this.handleChange}
                placeholder="请输入登录密码" type="password"/>
              <i className="ace-icon fa fa-lock fa-fw"/>
              <span className="help-block">{validation.password}</span>
            </div>
          </fieldset>
        </div>
        <div className="modal-footer">
          <div className="pull-left">
            <label className="inline remember">
              <input className="ace" name="remember" onClick={this.handleChecked} type="checkbox"/>
              <span className="lbl">
                十天内免登录</span>
            </label>
          </div>
          <Button bsStyle="primary" className="width-20 pull-right" loading={this.state.isRequesting}
            loadingText={<span><i className="ace-icon fa fa-spinner fa-spin"/>登录中...</span>} size="sm" type="submit">
            <i className="ace-icon fa fa-key"/>
            登录
          </Button>
        </div>
      </form>
    );
  }
});

module.exports = Login;
