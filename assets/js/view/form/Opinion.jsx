"use strict";

var React = require('react'),
  $ = require("jquery"),
  FormControl = require("Component/form/FormControl.jsx");

var SaveBtn = require("./operate/SaveBtn.jsx"),
  SubmitBtn = require("./operate/SubmitBtn.jsx"),
  RejectBtn = require("./operate/RejectBtn.jsx");

var Opinion = React.createClass({
  getDefaultProps: function() {
    return {
      fixed: false
    };
  },
  componentDidMount: function() {
    if(this.props.fixed){
      $(".opinion").width($(".container").width()-23)
      $(window).on("resize",function(){
        $(".opinion").width($(".container").width()-23)
      });

      $(".container").css("marginBottom",$(".opinion").height()+30)
    }
  },
  render: function() {
    return (
      <div className={"opinion"+(this.props.fixed?" fixed":"")}>
        <FormControl layout="aligned" type="textarea" label="意见" name="opinion" responsive={{xl: 24}}/>
        <hr />
        <ul className="nav ace-nav pull-right">
          <li><SaveBtn /></li>
          <li><SubmitBtn /></li>
          <li><RejectBtn /></li>
        </ul>
     </div>
    );
  }
});

module.exports = Opinion;
