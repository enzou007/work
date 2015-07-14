"use strict";

var React = require("react");

var TimeLineItem = require("./TimeLineItem.jsx")

var TimeLine = React.createClass({
  propTypes: {
    nodeName: React.PropTypes.string,
    user: React.PropTypes.string,
    time: React.PropTypes.string
  },
  render: function() {
    return (
      <div className="timeline-item clearfix">
        <div className="timeline-info">
          <i className="timeline-indicator icon-food btn btn-success no-hover"></i>
        </div>

        <div className="widget-box transparent">
          <div className="widget-header widget-header-small">
            {this.props.nodeName}
          </div>
					<div className="widget-body">
						<div className="widget-main">
              <div>
                <i className="fa fa-user"></i>
                {this.props.user}
              </div>
              <div>
                <i className="fa fa-clock-o"></i>
                {this.props.time}
              </div>
						</div>
					</div>
				</div>
      </div>
    );
  }
});

module.exports = TimeLine;
