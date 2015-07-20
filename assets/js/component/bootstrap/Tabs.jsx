"use strict";

var React = require("react"),
  _ = require("underscore"),
  $ = require("jquery"),
  classNames = require("classnames");

require("bootstrap/js/transition");

var Tabs = React.createClass({
  propTypes: {
    fade: React.PropTypes.bool,
    lazy: React.PropTypes.bool,
    triggerLink: React.PropTypes.bool,
    activated: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      fade: false,
      lazy: false,
      triggerLink: false,
      activated: 0
    };
  },
  getInitialState: function() {
    return {
      activated: this.props.activated,
      in: true
    };
  },
  toggleActive: function(clickIndex, event) {
    if (this.props.triggerLink && clickIndex === this.state.activated) {
      return;
    }
    if (this.props.fade && $.support.transition) {
      $(this.getDOMNode()).find(".in").one("bsTransitionEnd", function() {
        this.setState({
          activated: clickIndex, in: true
        });
      }.bind(this)).emulateTransitionEnd(150);

      this.setState({
        in: false
      });
    } else {
      this.setState({
        activated: clickIndex
      });
    }
    event.preventDefault();
  },
  render: function() {
    return (
      <div className={this.props.className}>
        <ul className="nav nav-tabs">
          {React.Children.map(this.props.children, function (child, index) {
            var boundClick = this.toggleActive.bind(this, index); return (
              <li className={classNames({active: index === this.state.activated})} key={index}>
                <a href={child.props.link || "#"} onClick={boundClick}>
                  { child.props.ico ? (
                    <i className={classNames("ace-icon",child.props.ico)}/>
                  ): null }
                  {child.props.tab || "未命名"}
                </a>
              </li>
            );
          }, this)}
        </ul>
        <div className="tab-content">
          { this.props.lazy ? (
            <div className="tab-pane active">{this.props.children[this.state.activated]}</div>
          ) : ( React.Children.map(this.props.children, function (child, index) { return (
            <div className={
                classNames("tab-pane",{
                  fade: this.props.fade,
                  active:index === this.state.activated,
                  in: this.props.fade && index === this.state.activated && this.state.in
                })
            }>{child}</div>
          ); }, this))}
        </div>
      </div>
    );
  }
});

module.exports = Tabs;
