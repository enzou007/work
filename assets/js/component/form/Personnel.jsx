import React from 'react';
import _ from 'underscore';
import classnames from 'classnames';
import { List, Set } from 'immutable';

import Dropdown from 'Component/bootstrap/Dropdown.jsx';
import OrganizationTree from './OrganizationTree.jsx';
import DataTable from './DataTable.jsx';
import TableHeader from 'rctui/src/js/components/tableHeader.jsx';

import FormControl from './FormControl.jsx';

import psnAction from 'Action/personnel';

import Department from './Department.jsx';

export default class Personnel extends Department {
  static propTypes = {
    readOnly: React.PropTypes.bool,
    region: React.PropTypes.string
  }
  static defaultProps = {
    action: psnAction
  }
  state = {
    //focus: false,
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
  handleTreeClick = (item) => {
    this.props.action.byDepartment(item["@objectId"]).then(resp => {
      this.setState({
        personnels: List.of(...resp)
      });
    });
  }
  handlePersonnelCheck = (change) => {
    let data = this.state.data;
    if (this.props.mult) {
      let objectIds = _.map(change.remove, item => {
        return item["@objectId"];
      })
      data = data.merge(change.add).filter(function (item) {
        return _.indexOf(objectIds, item["@objectId"]) === -1;
      });
    } else {
      data = Set.of(change);
    }
    this.setState({ data });
    if (this.props.onChange) {
      this.props.onChange();
    }
  }
  renderList() {
    let placeholder = this.state.data.size === 0 ? (this.state.msg || this.props.placeholder) : null;
    let personnelList = [];
    let checkedValue = [];
    this.state.data.map((item) => {
      checkedValue.push(item.id);
      personnelList.push(
        <div className="result" title={item.id} key={item["@objectId"]}
          onClick={this.handleRemove.bind(this, item)}>
          {item.name}
        </div>
      );
    });

    return (
      <div className="handle">
        { personnelList }

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
                <OrganizationTree value={this.state.data} onClick={this.handleTreeClick}/>
              </div>
              <div className="personnel-table">
                <DataTable bordered={true} checkAble={this.props.mult} height={250} value={this.state.personnels} checkedValue={[{key:"id",value:checkedValue.join(";")}]}
                  onCheck={this.handlePersonnelCheck} onRowClick={!this.props.mult ? this.handlePersonnelCheck : null}>
                  <TableHeader name="name">用户名</TableHeader>
                  <TableHeader name="id">用户ID</TableHeader>
                </DataTable>
              </div>
            </div>
          </Dropdown>
        ) : <span className="tree-handle"><a href="javascript:void(0)"><i className="fa fa-user"/></a></span>}
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
                return dataItem.objectId === item["@objectId"]
              });
              return (
                <li className={classnames({show: true, active: selected})} title={item.id} key={item["@objectId"]}
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
