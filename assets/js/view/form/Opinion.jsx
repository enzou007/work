import React from 'react';
import $ from 'jquery';
import FormControl from 'Component/form/FormControl.jsx';

import SaveBtn from './operate/SaveBtn.jsx';
import SubmitBtn from './operate/SubmitBtn.jsx';
import RejectBtn from './operate/RejectBtn.jsx';

const Opinion = React.createClass({
  getDefaultProps() {
    return {
      fixed: false
    };
  },
  componentDidMount() {
    if(this.props.fixed){
      $(".opinion").width($(".container").width()-23)
      $(window).on("resize",() => {
        $(".opinion").width($(".container").width()-23)
      });

      $(".container").css("marginBottom",$(".opinion").height()+30)
    }
  },
  render() {
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

export default Opinion;
