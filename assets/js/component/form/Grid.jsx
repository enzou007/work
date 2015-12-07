import React, { PropTypes } from 'react';
import _ from 'underscore';
import $ from 'jquery';
import classnames from 'classnames';
import { Table, Column } from 'fixed-data-table';

import { List } from 'immutable';
import { mixins } from 'iflux';
import Modal from '../bootstrap/Modal.jsx';
import { Checkbox } from './Checkbox.jsx';
import Form from './Form.jsx';
import FormControl from './FormControl.jsx';
import Action from 'Action/form';

import 'Less/component/grid.less';

const Grid = React.createClass({
  propTypes: {
    height: PropTypes.number.isRequired,
    headerHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    form: PropTypes.element,
    readOnly: PropTypes.bool,
    selectAble: PropTypes.bool,
    channel: PropTypes.instanceOf(Action),
    value: PropTypes.instanceOf(List)
  },
  getDefaultProps() {
    return {
      headerHeight: 36,
      rowHeight: 36,
      readOnly: false,
      selectAble: true,
      action: new Action(),
      value: new List(),
      show: true
    };
  },
  getInitialState() {
    return {
      width: 600,
      selected: {},
      value: this.props.value || new List(),
      show: this.props.show
    };
  },
  componentWillMount() {
    this.setState({
      columnWidth: this.getColumWidth()
    });
    this.props.action.on("close", () => {
      this._modal.close();
    })
  },
  componentDidMount() {
    this.tableResize();
  },
  componentWillReceiveProps: function(nextProps) {
    let state = {show: nextProps.show};
    if(nextProps.value !== this.props.value){
      state.value = nextProps.value;
    }
    this.setState(state, this.tableResize);
  },
  tableResize(){
    let $node = $(React.findDOMNode(this)),
    // 减去边距
      width = this.props.width || ($node.parent().width() - 12);
    this.setState({
      width,
      // 减去选择项
      columnWidth: this.getColumWidth(width - (this.props.selectAble ? 35 : 0))
    });
  },
  getColumWidth(total = this.state.width) {
    return _.reduce(this.props.children, function (memo, child) {
      if (child.props) {
        let width = child.props.width;
        if (width < 1) {
          width = parseInt(total * width);
        }
        memo[child.props.dataKey] = width;
      }
      return memo;
    }, {});
  },
  getRowLength() {
    return this.state.value.size;
  },
  getRowData(index) {
    return this.state.value.get(index);
  },
  setColumnWidth(width, dataKey) {
    this.state.columnWidth[dataKey] = width;
    this.forceUpdate();
  },
  showModal(title, store, callback) {
    this._modal = Modal.create((
      <GridForm title={title} channel={this.props.action} store={store} form={this.props.form} onSubmit={() => {
        this._modal.close();
        callback();
      }}/>
    ), {backdrop: true}, document.getElementById("form"));
  },
  addRow() {
    let store = this.props.action.getStore();
    store.reset();
    this.showModal('新增数据', store, () => {
      let data = store.data();
      if(this.isUnique(data)){
        if(this.props.beferAddRow){
          if(this.props.beferAddRow(data, this.state.value) === false){
            return false;
          }
        }
        let list = this.state.value.push(data);
        this.setState({
          value: list
        });

        this.props.onChange(list, data);
      }
    });
  },
  isUnique(data){
    if(this.props.uniqueKey){
      let index = this.state.value.findIndex((item, index)=>{
        for(var i = 0; i < this.props.uniqueKey.length; i++){
          if(item.get(this.props.uniqueKey[i]) !== data.get(this.props.uniqueKey[i])){
            return false;
          }
        }
        return true;
      });
      return index === -1;
    }
    return true;
  },
  editRow(event, index, data) {
    // 忽略选择框
    if($(event.target).parent().hasClass("row-select")){
      return;
    }
    if(this.props.beferEditRow){
      if(this.props.beferEditRow(data, this.state.value) === false){
        return false;
      }
    }
    let rowDataStore = this.props.action.getStore();
    rowDataStore.reset();
    rowDataStore.cursor().merge(data)

    this.showModal('修改数据', rowDataStore, (store) => {
      let data = rowDataStore.data();
      if(this.isUnique(data)){
        let list = this.state.value.set(index, data);
        this.setState({
          value: list
        });
        this.props.onChange(list, data);
      }
    });
  },
  removeRow() {
    let list;
    if(this.props.beferRemoveRow){
      list = this.state.value.filterNot((item, index) => {
        if(this.props.beferRemoveRow(item, this.state.value) === false){
          return null;
        }
        return this.state.selected[index];
      });
    }else{
      list = this.state.value.filterNot((item, index) => {
        return this.state.selected[index];
      });
    }

    this.setState({
      value: list,
      selected: {}
    });
    this.props.onChange(list);
  },
  getValue() {
    return this.state.value;
  },
  selectAll() {
    let selected = this.state.selected,
      len = this.getRowLength();
    if(_.isEmpty(selected) || _.size(selected) < len){
      for(let i = 0; i < len; i++){
        selected[i] = true;
      }
    } else {
      selected = {};
    }
    this.setState({ selected });
  },
  selectOne(index, event){
    let selected = this.state.selected;
    if(selected[index]){
      delete selected[index];
    } else {
      selected[index] = true;
    }
    this.setState({ selected });
  },
  getSelected() {
    return this.state.value.filter((item, index) => {
      return this.state.selected[index];
    });
  },
  render() {
    if(this.state.show){
      let checked = !_.isEmpty(this.state.selected);
      return (
        <div className={classnames('grid', {
            readonly: this.props.readOnly
          }, this.props.className)}>
          { !this.props.readOnly && (
            <div className="grid-toolbar btn-group">
              <button className="btn btn-white btn-inverse btn-bold" type="button" onClick={this.addRow}>
                <i className="ace-icon fa fa-file-o"/>
                新增
              </button>
              {
                checked && (
                  <button className="btn btn-white btn-warning btn-bold" type="button" onClick={this.removeRow}>
                    <i className="ace-icon fa fa-trash-o"/>
                    删除
                  </button>
                )
              }
            </div>
          )}
          <Table headerHeight={this.props.headerHeight} rowHeight={this.props.rowHeight}
            width={this.state.width} maxHeight={this.props.height}
            rowsCount={this.getRowLength()} rowGetter={this.getRowData}
            onColumnResizeEndCallback={this.setColumnWidth} onRowClick={this.editRow}>
            <Column className="row-select" dataKey="__index" fixed={true} width={35} align='center' headerRenderer={() => {
              return <Checkbox className="row-select" checked={checked} onChange={this.selectAll}
                half={_.size(this.state.selected) < this.getRowLength()}/>;
            }} cellRenderer={(cellData, cellDataKey, rowData, rowIndex, columnData, width) => {
              return <Checkbox className="row-select" checked={this.state.selected[rowIndex]} onChange={this.selectOne.bind(this, rowIndex)}/>;
            }}/>
            {React.Children.map(this.props.children, (child, index) => {
              return React.cloneElement(child, {
                width: this.state.columnWidth[child.props.dataKey],
                cellDataGetter: function (cellDataKey, rowData) {
                  return rowData.get(cellDataKey);
                }
              });
            })}
          </Table>
        </div>
      );
    }else{
      return null;
    }
  }
});

export { Grid, Column };

const GridForm = React.createClass({
  componentDidMount: function() {
    this.props.store.onStoreChange((nextState, path) => {
      if (this.isMounted()) {
        this.replaceState(nextState);
      }
    });
  },
  closeModal() {
    this.props.channel.emit('close');
  },
  render: function () {
    return (
      <Form layout="aligned" channel={this.props.channel} store={this.props.store.data()} responsive={{xl:20}} onSubmit={this.props.onSubmit}>
        <div className="modal-header">
          <button type="button" className="close" onClick={this.closeModal}>
            <span aria-hidden="true">×</span>
          </button>
          <h4 className="modal-title">{this.props.title}</h4>
        </div>
        <div className="modal-body">
          {this.props.form}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default btn-sm" onClick={this.closeModal}>取消</button>
          <button type="submit" className="btn btn-primary btn-sm">确定</button>
        </div>
      </Form>
    );
  }
});

FormControl.register('grid', function (props) {
  return <Grid {...props}/>
}, Grid, 'List');
