import React from 'react';
import $ from 'jquery';

const TimeLineItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    user: React.PropTypes.string,
    operate: React.PropTypes.string,
    time: React.PropTypes.string
  },
  ellipsis(name) {
    if (name.length > 4) {
      return name.substr(0, 4) + "...";
    } else {
      return name;
    }
  },
  componentDidMount() {
    $(this.refs.timeNode.getDOMNode()).mouseover(this.showInfo).mouseout(this.closeInfo);
  },
  componentWillUnmount(){
    $(this.refs.timeNode.getDOMNode()).off("mouseover mouseout");
  },
  showInfo() {
    const windowHeight = $(window).height();
    const windowScrollTop = $(window).scrollTop();
    const $node = $(this.refs.timeNode.getDOMNode());
    const position = $node.offset();

    let style = {
      position: "fixed",
      display: "block",
      top: position.top - windowScrollTop - 10,
      bottom: "auto",
      left: position.left - 200
    }
    React.render(this.getDetailInfo(style, false), $("<div id='timeline-detail-info'></div>").appendTo(document.body)[0], reactNodeInfo => {
      if ($("#timeline-detail-info div:first").height() + style.top > windowHeight) {
        style.top = "auto";
        style.bottom = windowHeight - position.top + windowScrollTop - 23;
        React.render(this.getDetailInfo(style, true), $("#timeline-detail-info")[0])
      }
    });
  },
  getDetailInfo(style, dropup) {
    let info = [];
    info.push(
      <h3 className="popover-title">{this.props.name}
        <div className="tooltip-arrow"></div>
      </h3>
    );
    info.push(
      <div className="popover-content">
        <div>
          <i className="fa fa-user"></i>
          {this.props.user}
        </div>
        <div>
          <i className="fa fa-edit"></i>
          {operates[this.props.operate]}
        </div>
        <div>
          <i className="fa fa-clock-o"></i>
          {this.props.time}
        </div>
      </div>
    );

    if (dropup) {
      info.reverse();
    }

    return (
      <div className={"timeline-detail-info popover fade left in " + this.props.operate} style={style}>
        {info}
      </div>
    )
  },
  closeInfo() {
    React.unmountComponentAtNode(document.getElementById("timeline-detail-info"));
    $("#timeline-detail-info").remove();
  },
  render() {    
    return (
      <div className="timeline-item clearfix">
        <div className={"timeline-info " + this.props.operate}>
          <i className="timeline-indicator btn" ref="timeNode"></i>
          <div className="item-title">{this.props.time.substring(11,16)}</div>
        </div>

        <div className="widget-box transparent">
          <div>
            <i className="fa fa-circle"></i>
            {this.ellipsis(this.props.name)}
          </div>
          <div>
            <i className="fa fa-user"></i>
            {this.props.user}
          </div>
          <div>
            <i className="fa fa-edit"></i>
            {operates[this.props.operate]}
          </div>
        </div>
      </div>
    );
  }
});

const operates = TimeLineItem.operates = {
  "submit": "提交",
  "reject": "驳回"
}

export default TimeLineItem;
