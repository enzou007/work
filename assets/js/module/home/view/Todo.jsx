"use strict";

var React = require("react"),
  $ = require("jquery");

var Todo = React.createClass({
  getInitialState: function () {
    return {
      db: [],
      dy: [],
      sp: [],
      tx: []
    };
  },
  componentDidMount: function () {
    $.get("/1/message/me", {
      count: 3
    }).done(function (resp) {
      if (this.isMounted()) {
        this.setState(resp);
      }
    }.bind(this))
      .fail(function (err) {
        console.error(err);
      });
  },
  _linkMaker: function (propName) {
    return this.state[propName].map(function (line, index) {
      return <a href="#" key={index}>{line[0]}</a>
    });
  },
  render: function () {
    return (
      <div className="todo-box">
        <dl className="col-lg-3 col-md-6 todo-box-green">
          <dd><a href="#">待办</a></dd>
          <dt>
            {this._linkMaker("db")}
          </dt>
        </dl>
        <dl className="col-lg-3 col-md-6 todo-box-blue">
          <dd><a href="#">待阅</a></dd>
          <dt>
            {this._linkMaker("dy")}
          </dt>
        </dl>
        <dl className="col-lg-3 col-md-6 todo-box-yellow">
          <dd><a href="#">审批中</a></dd>
          <dt>
            {this._linkMaker("sp")}
          </dt>
        </dl>
        <dl className="col-lg-3 col-md-6 todo-box-red">
          <dd><a href="#">提醒</a></dd>
          <dt>
            {this._linkMaker("tx")}
          </dt>
        </dl>
      </div>
    );
  }
});

module.exports = Todo;
