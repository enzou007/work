import React from 'react';
import _ from 'underscore';
import classnames from 'classnames';
import { List, Set } from 'immutable';


import Dropdown from '../../component/bootstrap/Dropdown.jsx';
import OrganizationTree from './OrganizationTree.jsx';
import DataTable from './DataTable.jsx';
import TableHeader from 'rctui/src/js/components/tableHeader.jsx';

import FormControl from './FormControl.jsx';

import Action from '../../action/personnel';

import Department from './Department.jsx';

export default class Personnel extends Department {
  static propTypes = {
    readOnly: React.PropTypes.bool,
    allowDepartment: React.PropTypes.bool,
    region: React.PropTypes.string
  }
  static defaultProps = {
    action: new Action()
  }
  state = {
    focus: false,
    active: false,
    options: [],
    personnels: List.of(),
    data: this.formateData(this.props.value),
    value: this.props.value
  }
  queryOptions(input) {
    return this.props.action.query(input);
  }
  fetchList(objectIds){
    return this.props.action.fetch(objectIds);
  }
  handleTreeChange = (value) => {
    this.setState({
      data: this.state.data.merge(value)
    });
  }
  handleTreeClick = (item) => {
    this.props.action.byDepartment(item.objectId).then(resp => {
      this.setState({
        personnels: List.of(...resp)
      });
    });
  }
  handlePersonnelCheck = (change) => {
    let data = this.state.data;
    if (this.props.mult) {
      data = data.merge(change.add).filter(function (item) {
        return _.indexOf(change.remove, item) === -1;
      });
    } else {
      data = Set.of(change);
    }
    this.setState({
      data
    });
  }
  renderList() {
    let placeholder = this.state.data.size === 0 ? (this.state.msg || this.props.placeholder) : null;

    return (
      <div className="handle">
        { this.state.data.map((item) => { return (
          <span className="result" title={item.id} key={item.objectId}
            onClick={this.handleRemove.bind(this, item)}>
            {item.name}
          </span>
        ); }) }
        { !this.props.readOnly ? (
          <span className="search-field">
            <input ref="input" onBlur={this.handleFocus.bind(this, false)} onChange={this.handleInput}
              onFocus={this.handleFocus.bind(this, true)} placeholder={placeholder}/>
          </span>
        ) : null}
        { !this.props.readOnly ? (
          <Dropdown tag="span" className="tree-handle" clickAndClose={false}>
            <a href="javascript:show-tree"><i className="fa fa-user"/></a>
            <div className="personnel-select">
              <div className="organization-tree">
                <OrganizationTree selectAble={this.props.allowDepartment} value={this.state.data} mult={this.props.mult}
                  onChange={this.props.allowDepartment ? this.handleTreeChange : null} onClick={this.handleTreeClick}/>
              </div>
              <div className="personnel-table">
                <DataTable bordered={true} checkAble={this.props.mult} height={250} value={this.state.personnels}
                  onCheck={this.handlePersonnelCheck} onRowClick={!this.props.mult ? this.handlePersonnelCheck : null}>
                  <TableHeader name="name">用户名</TableHeader>
                  <TableHeader name="id">用户ID</TableHeader>
                </DataTable>
              </div>
            </div>
          </Dropdown>
        ) : null}
      </div>
    );
  }
  renderOptions() {
    return (
      <div className="options-wrap">
        <hr/>
        <div className="options" ref="options">
          <ul>
            { this.state.options.map((item, index) => {
              let dept = _.first(item.departments);
              let selected = this.state.data.some(function (dataItem) {
                return dataItem.objectId === item.objectId
              });
              return (
                <li className={classnames({show: true, active: selected})} title={item.id} key={item.objectId}
                  onClick={this.handleChange.bind(this, index)} >
                  <span>{item.name}</span>
                  <span className="dept">{dept.name}</span>
                </li>
              );
            }) }
          </ul>
        </div>
      </div>
    );
  }
};

FormControl.register('personnel', function (props) {
  return <Personnel {...props}/>
}, Personnel, 'Set');
