"use strict";

var React = require("react"),
  _ = require("underscore"),
  classNames = require("classnames");

var FixedDataTable = require("fixed-data-table"),
  Table = FixedDataTable.Table,
  Column = FixedDataTable.Column,
  Checkbox = require("../../../component/Checkbox.jsx");

require("backbone-react-component");
require("fixed-data-table/dist/fixed-data-table.css");

var ViewTable = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    rowsCount: React.PropTypes.number.isRequired,
    headerHeight: React.PropTypes.number,
    rowHeight: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      headerHeight: 36,
      rowHeight: 36
    };
  },
  getInitialState: function() {
    return {
      column : this._parseColumnProp(this.props),
      isColumnResizing: false
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      column: this._parseColumnProp(nextProps)
    });
  },
  render: function() {
    var firstColumn = this.props.column[0],
      dataCollection = this.getCollection();
    return (
      <Table {..._.omit(this.props, "column")} isColumnResizing={this.state.isColumnResizing}
        onColumnResizeEndCallback={this.props.onColumnResizeEndCallback || this._onColumnResize}
        rowGetter={this.props.rowGetter || this._rowGetter}>
        <Column key="选择" dataKey="__index" fixed={true} width={35} align="center" headerRenderer={function () {
          return <Checkbox className="select" checkboxClass={dataCollection.length !== dataCollection.selectedLength ? "ace-checkbox-2" : ""}
            checked={dataCollection.selectedLength > 0} onChange={this.selectAll}/>;
        }.bind(this)} cellRenderer={function (cellData, cellDataKey, rowData, rowIndex, columnData, width) {
          return <Checkbox className="select" checked={dataCollection.at(rowIndex).selected} onChange={this.selectOne.bind(this, rowIndex)}/>;
        }.bind(this)}/>
        {
          _.map(this.state.column, function (column, key) {
            var isFirst = key === firstColumn.dataKey;
            var options = _.extend({
              cellRenderer: isFirst ? (function (val) {
                return <a href="#">{val}</a>;
              }) : null,
              fixed: isFirst
            }, column);
            return (
              <Column key={column.label} {...options}/>
            );
          })
        }
      </Table>
    );
  },
  _parseColumnProp: function (props) {
    var tableWidth = props.width,
      widthReg = /^([\d.]+)%$/;

    return _.reduce(props.column, function(memo, column) {
      var item = _.extend({}, column);
      if (widthReg.test(item.width)) {
        item.width = parseInt((tableWidth - 35) * (parseFloat(widthReg.exec(item.width)[1]) / 100));
      }
      memo[item.dataKey] = _.defaults(item, {
        isResizable: true
      });
      return memo;
    }, {});
  },
  _onColumnResize: function (width, dataKey) {
    var columns = this.state.column;
    columns[dataKey].width = width;
    this.setState({
      isColumnResizing: false
    });
  },
  _rowGetter: function (index) {
    return this.state.collection[index];
  },
  selectAll: function (event) {
    if (this.getCollection().length > (this.getCollection().selectedLength || 0)) {
      this.getCollection().selectAll();
    } else {
      this.getCollection().deselectAll();
    }
    this.forceUpdate();
    event.stopPropagation();
  },
  selectOne : function( index, event) {
    var model = this.getCollection().at(index);
    if (event.target.checked) {
      model.select();
    } else {
      model.deselect();
    }
    this.forceUpdate();
    event.stopPropagation();
  }
});

module.exports = ViewTable;
