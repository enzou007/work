import React, { PropTypes } from 'react';
import _ from 'underscore';
import $ from 'jquery';
import classnames from 'classnames';
import { Table, Column } from 'fixed-data-table';

import Modal from '../bootstrap/Modal.jsx';
import FormControl from './FormControl.jsx';

import '../../../less/component/grid.less';

const Grid = React.createClass({
  propTypes: {
    height: PropTypes.number.isRequired,
    headerHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    value: PropTypes.array
  },
  getDefaultProps() {
    return {
      headerHeight: 36,
      rowHeight: 36,
      value: []
    };
  },
  getInitialState() {
    return {
      width: 1280
    };
  },
  componentWillMount() {
    this.setState({
      columnWidth: this.getColumWidth()
    });
  },
  componentDidMount() {
    let $node = $(React.findDOMNode(this)),
      width = $node.parent().width() - 12;
    this.setState({
      width,
      columnWidth: this.getColumWidth(width)
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
    return this.props.value.length;
  },
  getRowData(index) {
    return this.props.value[index];
  },
  setColumnWidth(width, dataKey) {
    this.state.columnWidth[dataKey] = width;
    this.forceUpdate();
  },
  render() {
    return (
      <div className={classnames('grid', this.props.className)}>
        <Toolbar/>
          <Table headerHeight={this.props.headerHeight} rowHeight={this.props.rowHeight}
            width={this.state.width} maxHeight={this.props.height}
            rowsCount={this.getRowLength()} rowGetter={this.getRowData}
            onColumnResizeEndCallback={this.setColumnWidth}>
            {React.Children.map(this.props.children, (child, index) => {
              return React.cloneElement(child, {
                width: this.state.columnWidth[child.props.dataKey]
              });
            })}
          </Table>
      </div>
    );
  }
});

const Toolbar = React.createClass({
  showModal(event) {
    Modal.create(
      <div>213123</div>
    );
  },
  render() {
    return (
      <div className="grid-toolbar btn-group">
        <button className="btn btn-white btn-inverse btn-bold" type="button" onClick={this.showModal}>
          <i className="ace-icon fa fa-file-o"/>
          新增
        </button>
      </div>
    );
  }
});

export { Grid, Column };

FormControl.register('grid', function (props) {
  return <Grid {...props}/>
}, Grid, 'array');
