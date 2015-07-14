"use strict";

var React = require("react"),
    _ = require("underscore");

var TimeLineItem = require("./TimeLineItem.jsx")

var TimeLine = React.createClass({
  getDefaultProps: function() {
    return {
      logs:[
        {nodeName:"开始",user:"张三",time:"2015-07-01 14:22:29"},
        {nodeName:"部门主管",user:"张三",time:"2015-07-01 17:45:22"},
        {nodeName:"部门经理",user:"张三",time:"2015-07-02 10:53:10"},
        {nodeName:"人力资源",user:"张三",time:"2015-07-03 12:41:38"}
      ]
    };
  },
  render: function() {
    return (
      <div className="timeline-container timeline hidden-xs hidden-sm">
        <div className="timeline-items">
          { _.map(this.props.logs,function(item,index){
            return <TimeLineItem {...item} key={index}/>
          }) }

          <div className="timeline-item clearfix">
            <div className="timeline-info">
              <i className="timeline-indicator icon-food btn btn-warning no-hover"></i>
            </div>
  					<span className="label label-primary arrowed-in-right label-lg">
  						<b>人力资源总经理</b>
  					</span>
  				</div>

          <div className="timeline-item clearfix">
            <div className="timeline-info">
              <i className="timeline-indicator icon-food btn btn-default no-hover"></i>
            </div>
            <div className="widget-box transparent">
              <div className="widget-header widget-header-small">
                结束
              </div>
    					<div className="widget-body">
    						<div className="widget-main"></div>
    					</div>
    				</div>
  				</div>

        </div>
      </div>
    );
  }
});

module.exports = TimeLine;
