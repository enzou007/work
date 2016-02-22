import React from 'react';
import $ from 'jquery';
import _ from "underscore";
import GeminiScrollbar from 'gemini-scrollbar';
import 'Less/component/scrollbar.less'
const Scrollbar = React.createClass({
  propTypes: {
    autoshow: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      autoshow: false,
      vertical: "right",
      horizontal: "bottom"
    }
  },
  scrollbar: null,
  componentDidMount() {
    this.scrollbar = new GeminiScrollbar({
      element: this.getDOMNode(),
      autoshow: this.props.autoshow,
      createElements: false
    }).create();
  //  let $content = $(this.refs.scroll_view.getDOMNode());
  //  $content.width($content.width() + 1);
    this.toggleScroll();
    $(window).on("resize.scroll", _.debounce(this.toggleScroll, 200));
  },
  componentDidUpdate() {
    this.scrollbar.update();
    this.toggleScroll();
  },
  toggleScroll(){
    let $verticalScroll = $(this.refs.VerticalScroll.getDOMNode());
    let $horizontalScroll = $(this.refs.HorizontalScroll.getDOMNode());

    if($verticalScroll.find(".thumb").height() === 0){
      $verticalScroll.hide();
    }else{
      $verticalScroll.show();
    }
    if($horizontalScroll.find(".thumb").width() === 0){
      $horizontalScroll.hide();
    }else{
      $horizontalScroll.show();
    }
  },
  updateScrollbar(){
    setTimeout(()=>{this.componentDidUpdate();}, 0)
  },
  componentWillUnmount() {
    this.scrollbar.destroy();
    this.scrollbar = null;
  },
  render() {
    var {className, children, ...other} = this.props,
      classes = '';

    if (className) {
      classes += ' ' + className;
    }

    var verticalStyle = {};
    var horizontalStyle = {};
    if(this.props.vertical === "left"){
      verticalStyle.left = "4px";
    }
    if(this.props.horizontal === "top"){
      verticalStyle.top = "4px";
    }
    return (
      <div className={classes} {...other}>
        <div className='gm-scrollbar -vertical' style={verticalStyle} ref="VerticalScroll">
          <div className='thumb'></div>
        </div>
        <div className='gm-scrollbar -horizontal' style={horizontalStyle} ref="HorizontalScroll">
          <div className='thumb'></div>
        </div>
        <div className='gm-scroll-view' {...other} ref='scroll_view'>
          {children}
        </div>
      </div>
    );
  }
});

export default Scrollbar;
