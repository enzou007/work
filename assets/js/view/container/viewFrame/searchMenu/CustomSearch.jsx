"use strict";

var React = require("react"),
  _ = require("underscore"),
  $ = require("jquery");

var action = require("../../../../action/viewFrame");

var Condition = require("./Condition.jsx");

var CustomSearch = React.createClass({
  getInitialState: function () {
    var defaultItem = {};
    defaultItem[_.uniqueId("condition_")] = null;
    return {
      condition: this.props.item ? _.reduce(this.props.item.get("condition"), function (memo, item) {
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
            检索名称：<input ref="queryName" className="input-sm" defaultValue={"自定义检索"} type="text"/>
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
          <button className="btn btn-primary btn-sm" onClick={this.doSave}><i className="ace-icon fa fa-save"/>保存</button>
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
  doSave: function () {
    action.addCustomQuery([this._buildQueryItem().toJSON()]);
    // TODO 持久化
  },
  doQuery: function () {
    action.toggleSearchItem(this._buildQueryItem());
  },
  _buildQueryItem: function () {
    var QueryModel = this.props.items.model;
    return new QueryModel({
      name: this.refs.queryName.getDOMNode().value,
      condition: this.getCondition()
    });
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
