import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import session from '../store/session';

import Login from '../view/login/Login.jsx';

// 在首页初始化时，登录框不需要屏蔽层
let loginModalBackdrop = false;

// 注册事件，控制ajax请求头
$(document).ajaxSend(function (event, jqXHR, options) {
  var url = options.url;
  if (url.slice(0, 4) !== "http" || url.indexOf(`${location.protocol}//${location.host}/`) === 0) {
    jqXHR.setRequestHeader("Authorization", " Bearer " + (session.getToken() || ""));
  }
});

// 注册事件，响应特定错误码
$(document).ajaxError(function (event, jqXHR, settings, thrownError) {
  var url = settings.url;
  // 当为401错误时，打开登录层
  if (jqXHR.status === 401 && (url.slice(0, 4) !== "http" || url.indexOf(`${location.protocol}//${location.host}/`) === 0)) {
    Login.show({
      backdrop: loginModalBackdrop
    });
  }
});

class Action {
  getSession() {
    return session;
  }
  logout() {
    return session.destroy().done(function () {
      location.href = "/";
    });
  }
  validate(bootstrap) {
    // 判定用户状态
    if (session.isAnonymous()) {
      // 显示登录对话框，等待匿名用户完成登录
      session.once("sync", bootstrap);
      Login.show({
        backdrop: loginModalBackdrop
      });
    } else {
      // 校验用户Token，如果成功触发sync事件。如果校验失败，同样等待用户完成登录。
      session.ping().then(function () {
        loginModalBackdrop = true;
        bootstrap();
      });
    }
  }
};

export default new Action();
