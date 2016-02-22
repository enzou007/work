import React from 'react';
import _ from 'underscore';
import $ from 'jquery';
import { mixins } from 'iflux';
import { Map } from 'immutable';
import GeminiScrollbar from 'gemini-scrollbar';

import 'rctui/lang/zh-cn';

import 'Less/form.less';

import Action from 'Action/flow';
import { urlParamToObject } from 'Util/Strings';
window.$ = $;
let search = location.search.substring(1),
  param = urlParamToObject(search);
if (param.path) {
  param.path = _.compact(param.path.split("/")).join("/");
}

if (!param.form) {
  throw Error(`Can't not get 'form' by location.search '${search}'`);
}
if (!param.path) {
  throw Error(`Can't not get 'path' by location.search '${search}'`);
}

require.ensure([], function (require) {
  require(`./module/${param.form}.jsx`)(function (ModuleForm) {
    // 记录当前参数，并添加主表单标识
    let action = new Action(_.extend({
      id: '@main'
    }, param));

    let BootElement = React.createClass({
      componentDidMount: function() {
        this.PageScroll = new GeminiScrollbar({
          element : document.body
        }).create();
      },
      componentDidUpdate: function() {
        this.PageScroll.update();
      },
      mixins: [mixins.StoreMixin(action.getStore())],
      render: function () {
        return React.createElement(ModuleForm, {
          'session': this.state.get('session'),
          'flow': this.state.get('flow'),
          'log': this.state.get('log'),
          'form': this.state.get('form'),
          'action': action
        });
      }
    });

    React.render(React.createElement(BootElement), document.getElementById('form'));
  });
});
