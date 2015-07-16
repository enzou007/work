"use strict";

var React = require("react"),
  $ = require("jquery"),
  CSSTransitionGroup = require("../react/CSSTransitionGroup/CSSTransitionGroup.js");

var Dropdown = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    icon: React.PropTypes.string,
    clickMenuClose: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    dropup: React.PropTypes.bool,
    children: React.PropTypes.node.isRequired
  },
  getDefaultProps: function () {
    return {
      type: "button", //input OR button
      icon: "fa fa-caret-down",
      clickMenuClose: true,
      dropup: false,
      readOnly: false
    };
  },

  componentDidMount: function () {
    var flag = true;
    var $node = $(this.getDOMNode());
    $(document).on("click.dropdown", function (e) {
      if (flag) {
        $node.removeClass("open");
      } else {
        if (this.props.clickMenuClose) {
          $node.removeClass("open");
        }
      }
      flag = true;
    }.bind(this));

    $node.find(".dropdown-menu").on("click.dropdown", function (e) {
      flag = false;
    });

    $(document).on("click.dropdown", ".dropdown > i", function (e) {
      e.stopPropagation();
    });
    $(document).on("click.dropdown", ".dropdown > button", function (e) {
      e.stopPropagation();
    });
    $(document).on("click.dropdown", ".dropdown > input", function (e) {
      e.stopPropagation();
    });
  },
  toggleShow: function (e) {
    e.preventDefault();
    e.stopPropagation();
    var $node = $(this.getDOMNode());
    if ($node.hasClass("open")) {
      $node.removeClass("open");
    } else {
      $(".dropdown").removeClass("open");
      $node.addClass("open");
    }
  },
  componentWillUnmount: function () {
    $(document).off("click.dropdown");
  },
  render: function () {
    var child = React.Children.only(this.props.children);
    child.props.className = "dropdown-menu" + (child.props.className ? " " + child.props.className : "");

    if (this.props.type === "button") {
      return (
        <span className={"dropdown" + (this.props.dropup ? " dropup" : "")}>
          <button className={this.props.className} disabled={this.props.readOnly} onClick={this.toggleShow}>
            {this.props.value + " "}
            <i className={this.props.icon}/></button>
          {child}
        </span>
      );
    } else {
      return (
        <span className={"dropdown block input-icon input-icon-right" + (this.props.dropup ? " dropup" : "")}>
          <input className={this.props.className} disabled={this.props.readOnly} onClick={this.toggleShow} type="text" value={this.props.value}/>
          <i className={this.props.icon} onClick={this.toggleShow}/>{child}
        </span>
      );
    }
  }
});

module.exports = Dropdown;
