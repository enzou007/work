"use strict";

var Options = function () {
  this.container = require("./Home.jsx");
};

Options.prototype.getOption = function () {
  return this;
};

module.exports = Options;
