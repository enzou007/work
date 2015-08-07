import React from 'react';
import $ from 'jquery';
import ScrollBar from 'fixed-data-table/internal/Scrollbar.react.js';

import 'fixed-data-table/dist/fixed-data-table.min.css'

const Scrollbar = React.createClass({
  getInitialState() {
    return {
      top: 0,
      left: 0,
      containerHeiget: 500,
      contentHeiget: 800,
      containerWidth: 1000,
      contentWidth: 1400
    };
  },
  componentDidMount() {
    let $node = $(this.getDOMNode());
    let $content = $node.find("div:first");
    let state = { };
    // $node.height($content.height());
    // //$node.width($content.width());
    //
    // $content.height("auto");
    // $content.width("auto");
    //
    // state.contentHeiget = $content.height();
    // state.contentWidth = $content.width();
    //
    // state.containerHeiget = $node.height();
    // state.containerWidth = $node.width();
    //
    // this.setState(state);
  },
  scrollY(scrollPos) {
    this.setState({
      top:-scrollPos
    })
  },
  scrollX(scrollPos) {
    this.setState({
      left:-scrollPos
    })
  },
  render() {
    let style = {
      top: this.state.top + "px",
      left: this.state.left + "px",
      position: "relative"
    }

    return (
      <div className="custom-scrollbar">
        <div {...this.props} style={style}>
          {this.props.children}
        </div>
        <ScrollBar size={this.state.containerHeiget} contentSize={this.state.contentHeiget} onScroll={this.scrollY}/>
        <ScrollBar orientation="horizontal" size={this.state.containerWidth} contentSize={this.state.contentWidth} onScroll={this.scrollX} />
      </div>
    );
  }

});

export default Scrollbar;
