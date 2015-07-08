"use strict";

var React = require("react");

require("../less/form.less");
var path = "xwgg/xwsd/note";

require.ensure([], function (require) {
  require("./module/" + path +".jsx")(function (ModuleForm) {
    var Form = React.createFactory(ModuleForm);
    React.render(Form(), document.getElementById("form"));
  });
});
