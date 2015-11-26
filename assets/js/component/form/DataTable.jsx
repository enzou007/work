import React, { PropTypes } from 'react';
import _ from 'underscore';
import classnames from 'classnames';
import { List } from 'immutable';

import Table from 'rctui/table';

export default class DataTable extends Table {
  static propTypes = {
    bordered: PropTypes.bool,
    checkAble: PropTypes.bool,
    children: PropTypes.array,
    className: PropTypes.string,
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    onSort: PropTypes.func,
    onCheck: PropTypes.func,
    onRowClick: PropTypes.func,
    pagination: PropTypes.object,
    striped: PropTypes.bool,
    style: PropTypes.object,
    value: PropTypes.instanceOf(List),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }
  state = {
    index: this.props.pagination ? this.props.pagination.props.index : 1,
    headers: [],
    sort: {},
    checked: {}
  }
  componentWillMount () {
    this.setHeaderProps(this.props.children)
  }
  onCheck (i, e) {
    let flag = typeof e === 'boolean' ? e : e.target.checked,
        checked = this.state.checked,
        index = this.state.index,
        size = this.props.pagination ? this.props.pagination.props.size : this.props.value.size,
        start = 0,
        end = 0,
        record = { add:{}, remove:{} };
    if (i === 'all') {
      start = (index - 1) * size;
      end = index * size;
    } else {
      start = (index - 1) * size + i;
      end = start + 1;
    }
    for (; start < end; start++) {
      if (flag) {
        checked[start] = true;
        record.add[start] = true;
      } else {
        delete checked[start];
        record.remove[start] = true;
      }
    }
    this.setState({checked});
    record.add = _.map(record.add, (val, index) => {
      return this.props.value.get(index);
    });
    record.remove = _.map(record.remove, (val, index) => {
      return this.props.value.get(index);
    });
    this.props.onCheck && this.props.onCheck(record);
  }
  getChecked (name) {
    return _.map(this.state.checked, (flag, index) => {
      let item = this.props.value.get(index);
      return name ? (_.isFunction(item.get) ? item.get(name) : item[name]) : item;
    });
  }
  renderBody () {
    let checkAble = this.props.checkAble;
    let checkedValue = this.props.checkedValue;
    let trs = this.props.value.map((d, i) => {
      let tds = [], checked = this.state.checked[i];
      if (checkAble) {
        if(checkedValue){
          checked = true;
          for(var j = 0; j < checkedValue.length; j++) {
            if(checkedValue[j].value === ""){
              checked = false;
              break;
            }
            if(checkedValue[j].value.indexOf(d[checkedValue[j].key]) === -1){
              checked = false;
              break;
            }            
          }
        }
        tds.push(
          <td style={{width: 13}} key="checkbox">
            <input checked={checked} onChange={this.onCheck.bind(this, i)} type="checkbox" />
          </td>
        );
      }
      this.state.headers.map((h, j) => {
        if (h.props.hidden) {
          return;
        }
        let content = h.props.content,
            tdStyle = h.props.tdStyle || {};
        if (typeof content === 'string') {
          content = substitute(content, d);
        } else if (typeof content === 'function') {
          content = content(d);
        } else {
          content = d[h.props.name];
        }
        if (h.props.width) {
          tdStyle.width = h.props.width;
        }
        tds.push(<td style={tdStyle} key={j}>{content}</td>);
      })
      return <tr key={i} onClick={this.props.onRowClick ? this.props.onRowClick.bind(this, d, i) : null}>{tds}</tr>;
    })

    return <tbody>{trs}</tbody>;
  }
}
