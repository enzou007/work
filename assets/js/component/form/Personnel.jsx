import React from 'react';
import _ from 'underscore';
import classnames from 'classnames';
import { Set } from 'immutable';

import { getOuterHeight, overView } from 'rctui/src/js/utils/dom';
import { toArray } from 'rctui/src/js/utils/strings';
import clickAway from 'rctui/src/js/higherorder/clickaway';

import Dropdown from '../../component/bootstrap/Dropdown.jsx';

import FormControl from './FormControl.jsx';

import action from '../../action/personnel';

import 'rctui/src/less/form.less';

import '../../../less/component/organization.less';

@clickAway
export default class Personnel extends React.Component {
  static propTypes = {
    readOnly: React.PropTypes.bool
  }
  static defaultValue = {
    value: new Set()
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
    if(this.refs.input){
      React.findDOMNode(this.refs.input).focus();
    }
  }
  handleFocus(flag) {
    this.setState({
      focus: flag
    });
  }
  handleInput = _.debounce((event) => {
    let inputValue = React.findDOMNode(this.refs.input).value;
    if (inputValue.trim() !== '') {
      action.query(inputValue).then(resp => {
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
      data = [selected];
    if (this.props.mult) {
      data = this.state.data.slice(0);
      let exist = _.findIndex(data, item => {
        return item.objectId === selected.objectId;
      });

      if (exist !== -1) {
        data.splice(exist, 1);
      }
      data.push(selected);
    }

    this.setState({ data });
    this.close()
    if (this.props.onChange) {
      this.props.onChange();
    }
  }
  handleRemove(index) {
    if(this.props.readOnly){
      return;
    }

    this.state.data.splice(index, 1);
    if (this.props.onChange) {
      this.props.onChange();
    }
    this.forceUpdate();
  }
  formateData(value) {
    if(!value){
      return [];
    }

    let newList = value.map(function (objectId) {
      return {
        objectId: objectId,
        id: objectId,
        name: '加载中...'
      };
    }).toArray(), newIndex = {};

    _.forEach(newList, (data, index) => {
      if(!_.findWhere(this.state.data, {objectId: data.objectId})){
        newIndex[index] = data;
      }
    });

    if(!_.isEmpty(newIndex)){
      let objectIds = _.map(newIndex, function (item) {
        return item.objectId;
      });
      action.fetch(objectIds).then(data => {
        _.forEach(newIndex, function (val, index) {
          newList[index] = _.findWhere(data, {objectId: val.objectId});
        });

        this.setState({
          data: newList
        });
      });

      return newList;
    }

    return this.state.data;
  }
  getValue(data = this.state.data) {
    return new Set(data.map(function (item) {
      return item.objectId;
    }));
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
  render() {
    return (
      <div className={classnames('organization', 'personnel', 'form-control', {
          focus: this.state.focus,
          active: this.state.active,
          readonly: this.props.readOnly,
          dropup: this.state.dropup
        }, this.props.className)} onClick={this.triggerFocus}>
        {this.renderList()}
        {this.renderOptions()}
      </div>
    );
  }
};

FormControl.register('personnel', function (props) {
  return <Personnel {...props}/>
}, Personnel, 'Set');
