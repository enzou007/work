import React from 'react';
import _ from 'underscore';
import classnames from 'classnames';
import { Set } from 'immutable';

import { getOuterHeight, overView } from 'rctui/src/js/utils/dom';
import clickAway from 'rctui/src/js/higherorder/clickaway';

import Dropdown from '../../component/bootstrap/Dropdown.jsx';
import OrganizationTree from './OrganizationTree.jsx';

import FormControl from './FormControl.jsx';

import Action from '../../action/department';

import 'rctui/src/less/form.less';

import '../../../less/component/organization.less';

@clickAway
export default class Department extends React.Component {
  static propTypes = {
    readOnly: React.PropTypes.bool,
    region: React.PropTypes.string
  }
  static defaultProps = {
    action: new Action()
  }
  state = {
    focus: false,
    active: false,
    options: [],
    data: this.formateData(this.props.value),
    value: this.props.value
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        data: this.formateData(nextProps.value),
        value: nextProps.value
      });
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.active) {
      this.bindClickAway()
    } else {
      this.unbindClickAway()
    }
  }
  componentClickAway() {
    this.close()
  }
  open() {
    if (!this.state.active && !this.props.readOnly) {
      let options = React.findDOMNode(this.refs.options);
      options.style.display = 'block';
      let offset = getOuterHeight(options) + 5;

      let el = React.findDOMNode(this);
      let dropup = overView(el, offset);

      this.setState({
        dropup,
        active: true
      });
    }
  }
  close() {
    this.setState({
      focus: false,
      active: false
    });
    React.findDOMNode(this.refs.input).value = '';
    // use setTimeout instead of transitionEnd
    setTimeout(() => {
      if (this.state.active === false) {
        React.findDOMNode(this.refs.options).style.display = 'none';
      };
    }, 500);
  }
  triggerFocus = () => {
    if(!this.props.readOnly){
      React.findDOMNode(this.refs.input).focus();      
    }
  }
  handleFocus(flag) {
    this.setState({
      focus: flag
    });
  }
  queryOptions(input) {
    return this.props.action.query(input, this.props.region);
  }
  handleInput = _.debounce((event) => {
    let inputValue = React.findDOMNode(this.refs.input).value;
    if (inputValue.trim() !== '') {
      this.queryOptions(inputValue).then(resp => {
        this.setState({
          options: resp
        });
      });
      this.open();
    }
  }, 300)
  handleChange(index) {
    if (this.props.readOnly) {
      return;
    }

    let selected = this.state.options[index],
      data = Set.of(selected);
    if (this.props.mult) {
      data = this.state.data.merge(data);
    }

    this.setState({ data });
    this.close()
    if (this.props.onChange) {
      this.props.onChange();
    }
  }
  handleRemove(item) {
    if(this.props.readOnly){
      return;
    }
    this.setState({
      data: this.state.data.delete(item)
    })
    if (this.props.onChange) {
      this.props.onChange();
    }
  }
  handleTreeChange = (value) => {
    this.setState({
      data: Set.of(...value)
    });
    if (this.props.onChange) {
      this.props.onChange();
    }
  }
  fetchList(objectIds){
    return this.props.action.fetch(objectIds);
  }
  formateData(value) {
    if(!value){
      return Set.of();
    }

    let currentData = this.state.data.reduce(function (memo, item) {
      memo[item.objectId] = item;
      return memo;
    }, {});

    let fetchItems = {};
    let newList = value.map(function (objectId) {
      if(currentData[objectId]){
        return currentData[objectId];
      }

      fetchItems[objectId] = true;
      return {
        objectId: objectId,
        id: objectId,
        name: '加载中...'
      };
    });

    if(!_.isEmpty(fetchItems)){
      this.fetchList(_.keys(fetchItems)).then(data => {
        this.setState({
          data: newList.map(function (item) {
            if(fetchItems[item.objectId]){
              return _.findWhere(data, {objectId: item.objectId});
            }
            return item;
          })
        });
      });
    }

    return newList;
  }
  getValue() {
    return Set.of(...this.state.data.map(function (item) {
      return item.objectId;
    }));
  }
  renderList() {
    let placeholder = this.state.value == null ? (this.state.msg || this.props.placeholder) : null;

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
            <a href="javascript:show-tree"><i className="fa fa-sitemap"/></a>
            <div className="organization-tree">
              <OrganizationTree selectAble={true} value={this.state.data} mult={this.props.mult}
                region={this.props.region} onChange={this.handleTreeChange}/>
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
              let selected = this.state.data.some(function (dataItem) {
                return dataItem.objectId === item.objectId
              });
              return (
                <li className={classnames({show: true, active: selected})} key={item.objectId}
                  onClick={this.handleChange.bind(this, index)} >
                  <span>{item.name}</span>
                </li>
              );
            }) }
          </ul>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className={classnames("organization", "department", "form-control", {
          focus: this.state.focus,
          active: this.state.active,
          readonly: this.props.readOnly,
          mult: this.props.mult,
          single: !this.props.mult
        }, this.props.className)} onClick={this.triggerFocus}>
        {this.renderList()}
        {this.renderOptions()}
      </div>
    );
  }
};

FormControl.register('department', function (props) {
  return <Department {...props}/>
}, Department, 'Set');
