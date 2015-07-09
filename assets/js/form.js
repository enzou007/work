"use strict";

var React = require("react");

require("rctui/lang/zh-cn");
require("../less/form.less");


var path = "xwgg/xwsd/note";
var objectId = "sadfjkasfd";

//TODO 获取Model

require.ensure([], function (require) {
  require("./module/" + path +".jsx")(function (ModuleForm) {
    var Form = React.createFactory(ModuleForm);
    React.render(Form(), document.getElementById("form"));
  });
});
