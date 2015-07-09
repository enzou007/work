"use strict";

var React = require("react"),
    $ = require("jquery");


var Navbar = React.createClass({
    getDefaultProps: function () {
      return {
        title: "OA办公系统"
      };
    },
    PropTypes:{
      operate:React.PropTypes.func
    },
    operate: function(e){
      var trigger = $(e.target).data("trigger");
      this.props.operate(trigger);
    },
    render: function () {
        return (
            <div id="navbar" className="navbar navbar-default">
              <div className="navbar-header pull-left">
      					<span className="navbar-brand">
      						<small><i className="fa fa-leaf"></i>{this.props.title}</small>
      					</span>
      				</div>

              <div className="navbar-header pull-right" onClick={this.operate}>
                {this.props.children}
                <button className="btn btn-inverse" data-trigger="save">
                  保存
                  <i className="fa fa-user"></i>
                </button>
                <button className="btn btn-inverse" data-trigger="exit">
                  退出
                  <i className="fa fa-user"></i>
                </button>
      				</div>
            </div>
        );
    }
});

module.exports = Navbar;
