"use strict";

var React = require("react"),
  _ = require("underscore"),
  $ = require("gritter");
import classnames from 'classnames';
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

Gritter.show = function(text, status, cb){
  let cn = classnames({
    "gritter-light": true,
    "gritter-success": status === "y",
    "gritter-error": status === "n"
  });
  let id = Gritter.add({
    title: '提示',
    time: 1500,
    class_name: cn,
    after_close: cb,
    text: (
      <div>
        <h5>{text}</h5>
        <div style={{textAlign: "right"}}>
          <a className="btn btn-sm btn-primary" onClick={() => Gritter.remove(id, {fade: false})}>确定</a>
        </div>
      </div>
    )
  })
}

module.exports = Gritter;
