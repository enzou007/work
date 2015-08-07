import React from 'react';
import _ from 'underscore';
import $ from 'jquery';
import moment from 'moment';
import TimeLineItem from './TimeLineItem.jsx';

import 'moment/locale/zh-cn';

const TimeLine = React.createClass({
  getDefaultProps() {
    return {
      type: "timeline",
      now: moment(new Date()),
      logs: []
    };
  },
  getInitialState: function() {
    return {
      top: 0
    };
  },
  componentWillReceiveProps: function() {
    if(this.props.type === "timeline"){
      _.defer(() => this.scrollEnd("up"));
    }
  },
  render() {
    if(this.props.type === "table"){
      return this.renderTable();
    }else{
      return this.renderTimeLine();
    }
  },
  renderTable(){
    let groupLogs = this.props.logs.sortBy(item => item.time);
    return (
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <th width="15%">环节</th>
          <th width="15%">操作类型</th>
          <th width="15%">操作时间</th>
          <th width="15%">操作人</th>
          <th width="40%">意见</th>
        </thead>
        <tbody>
          {
            groupLogs.map(item => {
              return(
                <tr>
                  <td>{item.get("nodeName")}</td>
                  <td>{TimeLineItem.operates[item.get("operate")]}</td>
                  <td>{item.get("time")}</td>
                  <td>{item.get("user")}</td>
                  <td>{item.get("opinion")}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  },
  renderTimeLine(){
    if(this.props.logs.size === 0){
      return false;
    }

    var year = this.props.now.year();
    let groupLogs = this.props.logs
      .sortBy (item => item.time)
      .groupBy(item => {
        let date = item.get("time").substr(0,10);
        if(date.substr(0,4) == year){
          date = date.substr(5,10);
        }
        return date
      });

    return (
      <div className="timeline">
        <div className="scroll-up"
          onMouseOver={this.scrollStart.bind(this, "up")}
          onClick={this.scrollEnd.bind(this, "up")}
          onMouseOut={this.scrollStop}>
            <i className="fa fa-angle-up fa-2x"></i>
        </div>
        <div className="timeline-content">
          <div className="timeline-container timeline-style2" style={{top: this.state.top}}>
              {
                groupLogs.map((log, key) => {
                  return(
                    <div key={key}>
                      <span className="timeline-label">
              					<b>{key}</b>
              				</span>
                      <div className="timeline-items">
                        {
                          log.map((item, index)=> {
                            return <TimeLineItem key={index} {...item.toJS()}/>
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
          </div>
        </div>
        <div className="scroll-down"
          onMouseOver={this.scrollStart.bind(this, "down")}
          onClick={this.scrollEnd.bind(this, "down")}
          onMouseOut={this.scrollStop}>
            <i className="fa fa-angle-down fa-2x"></i>
        </div>
      </div>
    );
  },
  scrolling: null,
  scrollStart(flag) {
    const step = 4;
    const timeStep = 10;

    let $content = $(".timeline-container");
    let contentTop = Math.abs(parseInt($content[0].style.top));
    let contentHieght = $content.height();

    let height = $(".timeline-content").height();
    if(flag === "up"){
      this.scrolling = setInterval(function(){
        if(contentHieght - contentTop > height){
          contentTop += step;
          $content.animate({top: -contentTop + "px"},timeStep)
        }
      }, timeStep)
    }else{
      this.scrolling = setInterval(function(){
        if(contentTop > 0){
          contentTop -= step;
          $content.animate({top: -contentTop + "px"},timeStep)
        }
      }, timeStep)
    }
  },
  scrollStop() {
    if(this.scrolling){
      clearInterval(this.scrolling);
      this.scrolling = null;
    }
  },
  scrollEnd(flag) {
    this.scrollStop();
    let $container = $(".timeline-container");
    let contentHieght = $(".timeline-container").height();
    let height = $(".timeline-content").height();
    if(flag === "up"){
      $container.animate({top: (height - contentHieght) + "px"}, 100);
    }else{
      $container.animate({top: "0px"}, 300);
    }
  }
});

export default TimeLine;
