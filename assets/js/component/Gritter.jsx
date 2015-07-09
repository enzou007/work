"use strict";

var React = require("react"),
  _ = require("underscore"),
  $ = require("gritter");

require("gritter/css/jquery.gritter.css");
require("../../less/component/gritter.less");

var Gritter = {};

Gritter.add = function (options) {
  var element = options.text,
    afterClose = options.after_close || _.noop;

  options = _.extend(options, {
    text: '<div class="gritter-container"></div>',
    after_close: function ($element) {
      React.unmountComponentAtNode($element.find(".gritter-container")[0]);
      afterClose.apply(this, arguments);
    }
  });

  var gid = $.gritter.add(options);
  React.render(element, $('#gritter-item-' + gid).find(".gritter-container")[0]);

  return gid;
};

Gritter.remove = function (id, params) {
  $.gritter.remove(id, params);
};

Gritter.removeAll = function (params) {
  $.gritter.removeAll(params);
};

module.exports = Gritter;