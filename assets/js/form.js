import React from "react";
import $ from "jquery";
import iflux from 'iflux';

import "rctui/lang/zh-cn";

import "../less/form.less";

import {store as formStore, action as formAction, channel} from "./action/form";

let StoreMixin = iflux.mixins.StoreMixin;

formAction.resolve(location.search.substring(1));

require.ensure([], function (require) {
  require(`./module/${formAction.getFormPath() }.jsx`)(function (ModuleForm) {

    let BootElement = React.createClass({
      mixins: [StoreMixin(formStore)],
      render: function () {
        var store = formStore.data();
        return React.createElement(ModuleForm, {
          "session": store.get("session"),
          "flow": store.get("flow"),
          "log": store.get("log"),
          "form": store.get("form"),
          "channel": channel
        });
      }
    });

    React.render(React.createElement(BootElement), document.getElementById("form"));
  });
});
