import React from 'react';
import _ from 'underscore';
import classnames from 'classnames';
import { Set } from 'immutable';

import Dropdown from '../../component/bootstrap/Dropdown.jsx';
import OrganizationTree from './OrganizationTree.jsx';

import FormControl from './FormControl.jsx';

import action from '../../action/personnel';

import Department from './Department.jsx';

export default class Personnel extends Department {
  queryOptions(input) {
    return action.query(input);
  }
  fetchList(objectIds){
    return action.fetch(objectIds);
  }
  handleTreeChange = (value) => {
    this.setState({
      data: value
    });
  }
  renderList() {
    let placeholder = this.state.data.length === 0 ? (this.state.msg || this.props.placeholder) : null;

    return (
      <div className="handle">
        { this.state.data.map((item, index) => { return (
          <span className="result" title={item.id} key={item.objectId}
            onClick={this.handleRemove.bind(this, index)}>
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
            <div className="organization-tree">
              <OrganizationTree selectAble={true} value={this.state.data} mult={this.props.mult}
                onChange={this.handleTreeChange}/>
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
              let dept = _.first(item.departments),
                selected = !!_.findWhere(this.state.data, {objectId: item.objectId});
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
