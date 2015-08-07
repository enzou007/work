import React from 'react';

const TimeLineItem = React.createClass({
  propTypes: {
    nodeName: React.PropTypes.string,
    user: React.PropTypes.string,
    operate: React.PropTypes.string,
    time: React.PropTypes.string
  },
  ellipsis(nodeName) {
    if (nodeName.length > 4) {
      return nodeName.substr(0, 4) + "...";
    } else {
      return nodeName;
    }
  },
  render() {
    return (
      <div className="timeline-item clearfix">
        <div className={"timeline-info " + this.props.operate}>
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
                {operates[this.props.operate]}
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
