import React, { PropTypes } from 'react';
import _ from 'underscore';
import $ from 'jquery';
import classnames from 'classnames';
import { Table, Column } from 'fixed-data-table';
import { List } from 'immutable';
import { mixins } from 'iflux';

import Modal from '../bootstrap/Modal.jsx';
import Form from './Form.jsx';
import FormControl from './FormControl.jsx';
import Action from '../../action/form';

import '../../../less/component/grid.less';

const Grid = React.createClass({
  propTypes: {
    height: PropTypes.number.isRequired,
    headerHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    form: PropTypes.element,
    readOnly: PropTypes.bool,
    channel: PropTypes.instanceOf(Action),
    value: PropTypes.instanceOf(List)
  },
  getDefaultProps() {
    return {
      headerHeight: 36,
      rowHeight: 36,
      readOnly: false,
      action: new Action(),
      value: new List()
    };
  },
  getInitialState() {
    return {
      width: 1280,
      value: this.props.value
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
    let $node = $(React.findDOMNode(this)),
      width = $node.parent().width() - 12;
    this.setState({
      width,
      columnWidth: this.getColumWidth(width)
    });
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.value !== this.props.value){
      this.setState({
        value: nextProps.value
      });
    }
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
  showModal(store, callback) {
    this._modal = Modal.create((
      <GridForm channel={this.props.action} store={store} form={this.props.form} onSubmit={() => {
        this._modal.close();
        callback();
      }}/>
    ), {backdrop: true}, document.getElementById("form"));
  },
  addRow() {
    let store = this.props.action.getStore();
    store.reset();

    this.showModal(store, () => {
      let data = store.data(),
        list = this.state.value.push(data);
      this.setState({
        value: list
      });

      this.props.onChange(list);
    });
  },
  editRow(event, index, data) {
    let action = this.props.action;
    action.setField(data);

    this.showModal(action.getStore(), (store) => {
      let data = action.getStore().data(),
        list = this.state.value.set(index, data);
      this.setState({
        value: list
      });

      this.props.onChange(list);
    });
  },
  getValue() {
    return this.state.value;
  },
  render() {
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
          </div>
        )}
        <Table headerHeight={this.props.headerHeight} rowHeight={this.props.rowHeight}
          width={this.state.width} maxHeight={this.props.height}
          rowsCount={this.getRowLength()} rowGetter={this.getRowData}
          onColumnResizeEndCallback={this.setColumnWidth} onRowClick={this.editRow}>
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
          <h4 className="modal-title">新增数据</h4>
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
