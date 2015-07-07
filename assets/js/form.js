"use strict";

var React = require("react");


require("../less/form.less");
var modulePath = "./module/xwgg/xwsd/note.jsx"

var FormApp = React.createFactory(require("./module/xwgg/xwsd/note.jsx"));

React.render(FormApp(),document.getElementById("form"));