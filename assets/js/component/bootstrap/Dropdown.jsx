"use strict";

var React = require("react"),
    $ = require("jquery"),
    CSSTransitionGroup = require("../react/CSSTransitionGroup/CSSTransitionGroup.js");

var Dropdown = React.createClass({
    getInitialState: function () {
        return {
            show: false
        };
    },
    propTypes: {
        type: React.PropTypes.string,
        icon: React.PropTypes.string,
        clickMenuClose: React.PropTypes.bool,
        readOnly: React.PropTypes.bool,
        children: React.PropTypes.node.isRequired
    },
    getDefaultProps: function () {
        return {
            type: "button",  //input OR button
            icon: "fa fa-caret-down",
            clickMenuClose: true,
            readOnly: false
        };
    },

    componentDidMount: function () {
        var flag = true;
        $(document).on("click.dropdown",function(e){
          if(flag){
            this.setState({
                show: false
            });
          }else{
            if(this.props.clickMenuClose){
              this.setState({
                  show: false
              });
            }
          }
          flag = true;
        }.bind(this));

        $(this.getDOMNode()).find(".dropdown-menu").on("click.dropdown",  function(e) {
            flag = false;
        });

        $(document).on("click.dropdown", ".dropdown > i", function(e) {
            e.stopPropagation();
        });
        $(document).on("click.dropdown", ".dropdown > button", function(e) {
            e.stopPropagation();
        });
    },
    toggleShow: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            show: !this.state.show
        });
    },
    componentWillUnmount: function(){
        $(document).off("click.dropdown");
    },
    render: function () {
        var child = React.Children.only(this.props.children);
        child.props.className = "dropdown-menu" + (child.props.className ? " " + child.props.className : "");

        if(this.props.type === "button"){
          return (
              <span className={"dropdown" + (this.state.show ? " open" : "")}>
                  <button className={this.props.className}  onClick={this.toggleShow} disabled={this.props.readOnly}>
                    {this.props.value + " "}
										<i className={this.props.icon}></i>
									</button>
                  {child}
              </span>
          );
        }else{
          return (
              <span className={"dropdown block input-icon input-icon-right" + (this.state.show ? " open" : "")}>
                  <input className={this.props.className}  type="text" value={this.props.value} disabled={this.props.readOnly}/>
                  <i className={this.props.icon} onClick={this.toggleShow}></i>
                  {child}
              </span>
          );
        }
    }
});

module.exports = Dropdown;
