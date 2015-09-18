import React from 'react';
import $ from 'jquery';
import GeminiScrollbar from 'react-gemini-scrollbar';
import '../../less/component/scrollbar.css';

const Scrollbar = React.createClass({
  componentDidMount: function() {
    var $content =$(this.refs.custom_scroll.refs["scroll-view"].getDOMNode());
    $content.width($content.width()+1);
  },

  render() {
    return (
      <GeminiScrollbar ref="custom_scroll" {...this.props}>
        {this.props.children}
      </GeminiScrollbar>
    );
  }
});

export default Scrollbar;
