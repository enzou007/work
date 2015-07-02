"use strict";

var React = require("react"),
  $ = require("jquery");

var Newsweekly = React.createClass({
  getInitialState: function () {
    return {
      data: []
    };
  },
  componentDidMount: function () {
    $.get("/1/xwgg/zktd", {
      key: ["2015"],
      count: 4
    }).done(function (resp) {
      if (this.isMounted()) {
        this.setState({
          data: resp
        });
      }
    }.bind(this))
      .fail(function (err) {
        console.error(err);
      });
  },
  render: function () {
    return (
      <div className="widget-box">
        <h2><a href="#">周刊天地</a></h2>
        <div className="newsweekly-box">
          <dl>
            <dd><img src={require("../../../../images/container/home/jczk-bg.png")}/></dd>
            <dt><b>监察周刊</b><span>{this.state.data[0]}</span></dt>
          </dl>
          <dl>
            <dd><img src={require("../../../../images/container/home/fwzk-bg.png")}/></dd>
            <dt><b>法务周刊</b><span>{this.state.data[1]}</span></dt>
          </dl>
          <dl>
            <dd><img src={require("../../../../images/container/home/cwzk-bg.png")}/></dd>
            <dt><b>财务周刊</b><span>{this.state.data[2]}</span></dt>
          </dl>
          <dl>
            <dd><img src={require("../../../../images/container/home/tzzk-bg.png")}/></dd>
            <dt><b>投资周刊</b><span>{this.state.data[3]}</span></dt>
          </dl>
        </div>
      </div>
    );
  }
});

module.exports = Newsweekly;
