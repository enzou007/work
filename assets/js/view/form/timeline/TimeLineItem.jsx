"use strict";

var React = require("react");

var TimeLineItem = require("./TimeLineItem.jsx");

var operates = {
  "提交": "submit",
  "驳回": "reject"
}

var TimeLine = React.createClass({
  propTypes: {
    nodeName: React.PropTypes.string,
    user: React.PropTypes.string,
    operate: React.PropTypes.string,
    time: React.PropTypes.string
  },
  ellipsis: function(nodeName){
    if(nodeName.length > 4){
      return nodeName.substr(0,4) + "...";
    }else{
      return nodeName;
    }
  },
  render: function () {
    return (
      <div className="timeline-item clearfix">
        <div className={"timeline-info " + operates[this.props.operate]}>
          <i className="timeline-indicator btn"></i>
          <div className=" popover fade left in">
            <div className="tooltip-arrow"></div>
            <h3 className="popover-title">{this.props.nodeName}</h3>
            <div className="popover-content">
              <div>
                <i className="fa fa-user"></i>
                {this.props.user}
              </div>
              <div>
                <i className="fa fa-edit"></i>
                {this.props.operate}
              </div>
              <div>
                <i className="fa fa-clock-o"></i>
                {this.props.time}
              </div>
            </div>
          </div>
          <div className="item-title">{this.props.time.substring(11,16)}</div>
        </div>

        <div className="widget-box transparent">
          <div className="widget-header widget-header-small"></div>
          <div className="widget-body">
            <div className="widget-main">
              <div>
                <i className="fa fa-circle"></i>
                {this.ellipsis(this.props.nodeName)}
              </div>
              <div>
                <i className="fa fa-user"></i>
                {this.props.user}
              </div>
              <div>
                <i className="fa fa-edit"></i>
                {this.props.operate}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TimeLine;
