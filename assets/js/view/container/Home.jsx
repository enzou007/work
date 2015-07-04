"use strict";

var React = require("react"),
  Todo = require("./home/Todo.jsx"),
  ViewList = require("./home/component/ViewList.jsx"),
  Newsweekly = require("./home/Newsweekly.jsx"),
  Rankings = require("./home/Rankings.jsx"),
  Calendar = require("./home/Calendar.jsx"),
  Freshman = require("./home/Freshman.jsx");

require("../../../less/app/home.less");

var HomePage = React.createClass({
  render: function() {
    return (
      <div className="container-fluid" id="home">
        <div className="row">
          <div className="col-xs-12" id="home-content-area">
            <div className="row">
              <Todo/>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="widget-box">
                  <h2>
                    <a href="#">通知公告</a>
                  </h2>
                  <ViewList url="/1/xwgg/tzgg" count={6} formatter={
                    function(item, index){
                      return (
                        <li key={index}>
                          <span>{ "["+item[0].replace("2015-","")+"]" }</span><a href="#">{item[1]}</a>
                        </li>
                      );
                    }
                  }/>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="widget-box">
                  <h2>
                    <a href="#">人事任免</a>
                  </h2>
                  <ViewList url="/1/xwgg/rsrm" count={6} formatter={
                    function(item, index){
                      return (
                        <li key={index}>
                          <span>{ "["+item[0].replace("2015-","")+"]" }</span><a href="#">{item[1]}</a>
                        </li>
                      );
                    }
                  }/>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                {/* 周刊天地 */}
                <Newsweekly/>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                {/* 工作日历 */}
                <Calendar/>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                {/* 排名 */}
                <Rankings/>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <Freshman/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
