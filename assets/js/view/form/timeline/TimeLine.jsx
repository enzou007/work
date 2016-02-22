import React from 'react';
import _ from 'underscore';
import $ from 'jquery';
import TimeLineItem from './TimeLineItem.jsx';
import { fromJS } from 'immutable';
import Mock from 'mockjs';
import 'Less/component/timeline.less';
const STEP = 4;
const TIME_STEP = 10;

const TimeLine = React.createClass({
  getDefaultProps() {
    return {
      type: "timeline",
      now: new Date(),
      log: []
    };
  },
  componentWillReceiveProps: function () {
    if (this.props.type === "timeline") {
      _.defer(() => this.scrollEnd("up"));
    }
  },
  render() {
    if (this.props.type === "table") {
      return this.renderTable();
    } else {
      return this.renderTimeLine();
    }
  },
  renderTable() {
    let groupLogs = this.props.log.sortBy(item => item.time);
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
          { groupLogs.map((item, index) => { return(
          <tr key={index}>
            <td>{item.get("name")}</td>
            <td>{TimeLineItem.operates[item.get("operate")]}</td>
            <td>{item.get("time")}</td>
            <td>{item.get("user")}</td>
            <td>{item.get("opinion")}</td>
          </tr>
          ) }) }
        </tbody>
      </table>
    )
  },
  renderTimeLine() {
    if (this.props.log.size === 0) {
      return false;
    }
    let log = this.props.log;
    let curNode = this.props.curNode;
    if(curNode){
      log = log.push(fromJS({
        name: curNode.get("name"),
        opinion: "",
        user: "",
        operate: "curNode",
        time: Mock.Random.now()
      }));
    }
    var year = this.props.now.getFullYear();
    let groupLogs = log.sortBy(item => item.time).groupBy(item => {
      let date = item.get("time").substr(0, 10);
      if (date.substr(0, 4) == year) {
        date = date.substr(5, 10);
      }
      return date;
    });

    return (
      <div className="timeline">
        <div className="scroll-up fa fa-angle-up fa-2x"
          onClick={this.scrollEnd.bind(this, "down")}
          onMouseOut={this.scrollStop}
          onMouseOver={this.scrollStart.bind(this, "down")}>
        </div>
        <div className="timeline-content">
          <div className="timeline-container timeline-style2">
            {
              groupLogs.map((log, key) => {
                return(
                  <div key={key}>
                    <span className="timeline-label">
                      <b>{key}</b>
                    </span>
                    <div className="timeline-items">
                      { log.map((item, index) => { return <TimeLineItem key={index} {...item.toJS()}/>}) }
                    </div>
                  </div>
                )
              })
            }
            </div>
          </div>
          <div className="scroll-down fa fa-angle-down fa-2x"
            onClick={this.scrollEnd.bind(this, "up")}
            onMouseOut={this.scrollStop}
            onMouseOver={this.scrollStart.bind(this, "up")}>
          </div>
        </div>
    );
  },
  scrolling: null,
  scrollStart(flag) {
    this.scrollStop();

    let $content = $(".timeline-container");
    let contentTop = Math.abs(parseInt($content[0].style.top));
    let contentHieght = $content.height();
    let height = $(".timeline-content").height() + STEP;

    if (contentHieght < height) {
      return;
    }

    if (flag === "up") {
      this.scrolling = setInterval(function () {
        if (contentHieght - contentTop >= height) {
          contentTop += STEP;
          $content.animate({
            top: -contentTop + "px"
          }, TIME_STEP)
        }
      }, TIME_STEP)
    } else {
      this.scrolling = setInterval(function () {
        if (contentTop > 1) {
          contentTop -= STEP;
          $content.animate({
            top: -contentTop + "px"
          }, TIME_STEP)
        }
      }, TIME_STEP)
    }
  },
  scrollStop() {
    if (this.scrolling) {
      clearInterval(this.scrolling);
      this.scrolling = null;
    }
  },
  scrollEnd(flag) {
    this.scrollStop();
    let $container = $(".timeline-container");
    let contentHieght = $(".timeline-container").height();
    let height = $(".timeline-content").height();

    if (contentHieght < height) {
      return;
    }
    $container.stop();
    if (flag === "up") {
      $container.animate({
        top: (height - contentHieght) + "px"
      }, 300);
    } else {
      $container.animate({
        top: "0px"
      }, 300);
    }
  }
});

export default TimeLine;
