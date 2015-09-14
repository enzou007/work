import React from 'react';
import _ from 'underscore';
import $ from 'jquery';
import { mixins } from 'iflux';
import { Map } from 'immutable';

import session from './action/session';

import 'rctui/lang/zh-cn';

import '../less/form.less';

import Action from './action/flow';
import { urlParamToObject } from './util/Strings';

let search = location.search.substring(1),
  param = urlParamToObject(search);
if (param.path) {
  param.path = _.compact(param.path.split("/")).join("/");
}

if (!param.form) {
  throw Error(`Can't not get 'form' by location.search '${search}'`);
}
if (!param.moduleId) {
  throw Error(`Can't not get 'moduleId' by location.search '${search}'`);
}

require.ensure([], function (require) {
  require(`./module/${param.form}.jsx`)(function (ModuleForm) {
    // 记录当前参数，并添加主表单标识
    let action = new Action(_.extend({
      id: '@main'
    }, param));

    let BootElement = React.createClass({
      mixins: [mixins.StoreMixin(action.getStore())],
      render: function () {
        return React.createElement(ModuleForm, {
          'session': new Map(session.getSession().toJSON()),
          'module': this.state.get('module'),
          'flow': this.state.get('flow'),
          'log': this.state.get('log'),
          'form': this.state.get('form'),
          'action': action
        });
      }
    });

    session.validate(function () {
      React.render(React.createElement(BootElement), document.getElementById('form'));
    });
  });
});
