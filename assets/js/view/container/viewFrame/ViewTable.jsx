import React from 'react';
import _ from 'underscore';
import classNames from 'classnames';

import FixedDataTable from 'fixed-data-table';
import Checkbox from '../../../component/Checkbox.jsx';

import 'backbone-react-component';
import 'fixed-data-table/dist/fixed-data-table.css';

const Table = FixedDataTable.Table,
  Column = FixedDataTable.Column;

const SORT_ICONS = ['fa fa-sort', 'fa fa-sort-asc', 'fa fa-sort-desc'];

const ViewTable = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    page: React.PropTypes.string.isRequired,
    form: React.PropTypes.string.isRequired,
    headerHeight: React.PropTypes.number,
    rowHeight: React.PropTypes.number
  },
  getDefaultProps() {
    return {
      headerHeight: 36,
      rowHeight: 36
    };
  },
  getInitialState() {
    return {
      column : this._parseColumnProp(this.props),
      isColumnResizing: false
    };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      column: this._parseColumnProp(nextProps)
    });
  },
  render() {
    let firstColumn = this.props.column[0],
      dataCollection = this.getCollection(),
      sortHandle = this.toggleSort,
      page = this.props.page,
      form = this.props.form,
      path = _.result(dataCollection, 'url');

    return (
      <Table {..._.omit(this.props, 'column')} isColumnResizing={this.state.isColumnResizing}
        onColumnResizeEndCallback={this.props.onColumnResizeEndCallback || this._onColumnResize}
        rowsCount={dataCollection.getPerPage()}
        rowGetter={this.props.rowGetter || this._rowGetter}>
        <Column key='选择' dataKey='__index' fixed={true} width={35} align='center' headerRenderer={() => {
          return <Checkbox checked={dataCollection.selectedLength > 0} onChange={this.selectAll}
            half={dataCollection.getPerPage() > dataCollection.selectedLength}/>;
        }} cellRenderer={(cellData, cellDataKey, rowData, rowIndex, columnData, width) => {
          return <Checkbox checked={dataCollection.at(rowIndex) && dataCollection.at(rowIndex).selected} onChange={this.selectOne.bind(this, rowIndex)}/>;
        }}/>
        {
          _.map(this.state.column, (column, key) => {
            let isFirst = key === firstColumn.dataKey;
            let options = _.extend({
              headerRenderer: (label, dataKey) => {
                return (
                  <div className='sort' onClick={sortHandle.bind(this, dataKey)}>
                    {label}
                    <span className={classNames('sort-icon', {'sorting': column.sorting > 0})}>
                      <i className={SORT_ICONS[column.sorting]}/>
                    </span>
                  </div>
                );
              },
              cellRenderer: isFirst ? (function (cellData, cellDataKey, rowData) {
                return (
                  <a href={`${page}?form=${form}&path=${path}&objectId=${rowData['@objectId']}`} target='_blank'>{cellData}</a>
                );
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
  _parseColumnProp(props) {
    const widthReg = /^([\d.]+)%$/;
    let tableWidth = props.width;

    return _.reduce(props.column, function (memo, column) {
      let item = _.extend({}, column);
      if (widthReg.test(item.width)) {
        item.width = parseInt((tableWidth - 35) * (parseFloat(widthReg.exec(item.width)[1]) / 100));
      }
      memo[item.dataKey] = _.defaults(item, {
        sorting: 0,
        isResizable: true
      });
      return memo;
    }, {});
  },
  _onColumnResize(width, dataKey) {
    let columns = this.state.column;
    columns[dataKey].width = width;
    this.setState({
      isColumnResizing: false
    });
  },
  _rowGetter(index) {
    return this.state.collection[index];
  },
  selectAll(event) {
    if (this.getCollection().length > (this.getCollection().selectedLength || 0)) {
      this.getCollection().selectAll();
    } else {
      this.getCollection().deselectAll();
    }
    this.forceUpdate();
    event.stopPropagation();
  },
  selectOne(index, event) {
    let model = this.getCollection().at(index);
    if (event.target.checked) {
      model.select();
    } else {
      model.deselect();
    }
    this.forceUpdate();
    event.stopPropagation();
  },
  toggleSort(dataKey) {
    let current = _.find(this.state.column, function (item) {
        return item.sorting > 0;
      }),
      column = this.state.column[dataKey];
    if (current && current !== column) {
      current.sorting = 0;
    }
    column.sorting = (column.sorting + 1) % 3;

    this.getCollection().setSort(dataKey, column.sorting);
    this.forceUpdate();
  }
});

export default ViewTable;
