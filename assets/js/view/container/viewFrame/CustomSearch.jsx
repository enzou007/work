"use strict";

var React = require("react"),
  _ = require("underscore"),
  $ = require("jquery");

var Condition = require("./customSearch/Condition.jsx");

var CustomSearch = React.createClass({
  getInitialState: function () {
    var defaultItem = {};
    defaultItem[_.uniqueId("condition_")] = null;
    return {
      condition: this.props.condition ? _.reduce(this.props.condition, function (memo, item) {
        memo[_.uniqueId("condition_")] = item;
        return memo;
      }, {}) : defaultItem
    };
  },
  render: function () {
    return (
      <div className="custom-search-panel">
        <div className="search-container">
          <div>
            检索名称：<input className="input-sm" defaultValue={"自定义检索"} type="text"/>
          </div>
          <div className="hr hr-10 dotted hr-double"/>
          <div className="row">
            <div className="col-xs-12 form-horizontal">
              检索条件
              {
                _.map(this.state.condition, function (value, key) { return (
                  <Condition fields={this.props.fields} key={key} ref={key} value={value}
                    onRemove={this._removeCondition.bind(null, key)}/>
                );}, this)
              }
              <div className="clearfix" style={{marginTop: 20}}>
                <a href="javascript:plus" onClick={this._addCondition}><i className="ace-icon fa fa-plus"/>添加条件</a>
              </div>
            </div>
            <div className="col-xs-6 hidden">
              列选择
            </div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-primary btn-sm"><i className="ace-icon fa fa-save"/>保存</button>
          <button className="btn btn-success btn-sm" onClick={this.doQuery}><i className="ace-icon fa fa-search"/>查询</button>
        </div>
      </div>
    );
  },
  getCondition: function () {
    return _.filter(this.refs, function (value, key) {
      return key.indexOf("condition_") === 0;
    }).map(function (item) {
      return item.getValue();
    });
  },
  doQuery: function () {
    console.log(this.getCondition());
  },
  doSave: function () {
    console.log(this.getCondition());
  },
  _addCondition: function (event) {
    this.state.condition[_.uniqueId("condition_")] = null;
    this.forceUpdate();
    event.preventDefault();
  },
  _removeCondition: function (key) {
    delete this.state.condition[key];
    this.forceUpdate();
  }
});

$(document).on("click", ".custom-search-panel", function (event) {
  event.stopPropagation();
});

module.exports = CustomSearch;
