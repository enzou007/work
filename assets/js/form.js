import React from "react";
import $ from "jquery";

import "rctui/lang/zh-cn";

import "../less/form.less";

import formAction from "./action/form";

formAction.bind(location.search.substring(1));

require.ensure([], function (require) {
  require("./module/" + formAction.getFormPath() + ".jsx")(function (ModuleForm) {
    var Form = React.createFactory(ModuleForm);
    React.render(Form({
      flow: formAction.getFlow(),
      store: formAction.getDocument()
    }), document.getElementById("form"));
  });
});
