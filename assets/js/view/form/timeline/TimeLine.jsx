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
          <th>操作时间</th>
          <th>操作人</th>
          <th>环节</th>
          <th>操作类型</th>
          <th>意见</th>
        </thead>
        <tbody>
          {
            groupLogs.map(item => {
              return(
                <tr>
                  <td>{item.get("time")}</td>
                  <td>{item.get("user")}</td>
                  <td>{item.get("nodeName")}</td>
                  <td>{TimeLineItem.operates[item.get("operate")]}</td>
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
      <div className="timeline-container timeline-style2 timeline">
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
    );
  }
});

export default TimeLine;
