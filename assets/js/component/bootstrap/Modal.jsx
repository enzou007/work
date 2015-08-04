"use strict";

var React = require("react"),
  $ = require("jquery"),
  classNames = require("classnames"),
  _ = require("underscore");

require("bootstrap/js/modal");

var Modal = React.createClass({
  statics: {
    create: function(element, props, parent = document.body) {
      var $container = $("<div>").appendTo(parent);
      return React.render(<Modal {...props}>{element}</Modal>, $container[0]);
    }
  },
  propTypes: {
    id: React.PropTypes.string,
    fade: React.PropTypes.bool,
    keyboard: React.PropTypes.bool,
    backdrop: React.PropTypes.oneOfType([
      React.PropTypes.bool, React.PropTypes.string
    ]),
    children: React.PropTypes.node.isRequired
  },
  getDefaultProps: function() {
    return {
      fade: true,
      keyboard: true,
      backdrop: true
    };
  },
  componentDidMount: function() {
    this.$modal = $(this.getDOMNode()).modal({
      backdrop: this.props.backdrop,
      keyboard: this.props.keyboard
    });
    this.$modal.one("hidden.bs.modal", function() {
// 这里的this就是当前的DOM 节点了
      React.unmountComponentAtNode(this.parentNode);
    });
  },
  componentWillUnmount: function() {
    var $parent = $(this.getDOMNode()).parent();
    _.defer(function() {
      $(parent).remove();
    });
  },
  render: function() {
    return (
      <div className={classNames("modal", this.props.className, {fade: this.props.fade})} id={this.props.id}>
        <div className="modal-dialog">
          <div className="modal-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },
  close: function() {
    this.$modal.modal('hide');
  }
});

module.exports = Modal;
