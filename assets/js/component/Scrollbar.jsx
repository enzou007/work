import React from 'react';
import $ from 'jquery';
import GeminiScrollbar from 'gemini-scrollbar';

const Scrollbar = React.createClass({
  propTypes: {
    autoshow: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      autoshow: false
    }
  }, 
  scrollbar: null,
  componentDidMount() {
    this.scrollbar = new GeminiScrollbar({
      element: this.getDOMNode(),
      autoshow: this.props.autoshow,
      createElements: false
    }).create();
    let $content = $(this.refs.scroll_view.getDOMNode());
    $content.width($content.width() + 1);
    this.toggleScroll();
    $(window).on("resize",this.toggleScroll);
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
    return (
      <div className={classes} {...other}>
        <div className='gm-scrollbar -vertical' ref="VerticalScroll">
          <div className='thumb'></div>
        </div>
        <div className='gm-scrollbar -horizontal' ref="HorizontalScroll">
          <div className='thumb'></div>
        </div>
        <div className='gm-scroll-view' ref='scroll_view'>
          {children}
        </div>
      </div>
    );
  }
});

export default Scrollbar;
