import React, { PropTypes } from 'react';
import _ from 'underscore';
import classnames from 'classnames';

import { nextUid, format, toArray } from 'rctui/src/js/utils/strings';
import Regs from 'rctui/src/js/utils/regs';
import { getLang } from 'rctui/src/js/lang';

import Action from '../../action/form';

let controls = {};

function getTip(key, value) {
  let text = getLang('validation.tips.' + key, null)
  if (text) {
    text = format(text, value)
  }
  return text
}

function getHint(hints, key, value) {
  let text = getLang('validation.hints.' + key, null)
  if (text) {
    hints.push(format(text, value))
  }
}

export default class FormControl extends React.Component {
  static displayName: 'FormControl'
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    channel: PropTypes.instanceOf(Action),
    data: PropTypes.any,
    hintType: PropTypes.oneOf([
      'block', 'none', 'pop', 'inline'
    ]),
    id: PropTypes.string,
    label: PropTypes.string,
    layout: PropTypes.oneOf([
      'aligned', 'stacked', 'inline'
    ]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    responsive: PropTypes.shape({
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
      xl: PropTypes.number
    }),
    type: PropTypes.string,
    value: PropTypes.any
  }
  static defaultProps = {
    id: nextUid(),
    layout: 'inline',
    responsive: {
      lg: 12,
      xl: 8
    },
    type: 'text'
  }
  state = {
    focused: false,
    hasError: false,
    hasValue: !!this.props.value,
    value: this.props.value,
    valueType: controls[this.props.type].valueType,
    data: this.props.data,
    hintText: ''
  }
  componentWillMount() {
    this.setHint(this.props);
    this.props.channel.registerControl(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setHint(nextProps);
    this.setState({
      hasValue: !!nextProps.value,
      value: nextProps.value,
      valueType: controls[nextProps.type].valueType,
      data: nextProps.data
    });
  }
  componentWillUnmount() {
    this.props.channel.unregisterControl(this);
  }
  setHint(props) {
    if (props.tip) {
      this.setState({ hintText: props.tip })
      return
    }

    let hints = []

    if (props.required) { getHint(hints, 'required') }
    getHint(hints, this.props.type)
    if (props.min) { getHint(hints, `min.${this.state.valueType}`, props.min) }
    if (props.max) { getHint(hints, `max.${this.state.valueType}`, props.max) }

    this.setState({ hintText: hints.join(', ') })
  }
  getReference() {
    return this.refs.control;
  }
  validate(value) {
    value = value || this.getValue(null);

    this.setState({ hasValue: !_.isEmpty(value) });

    let { required, min, max, readOnly, type } = this.props;

    if (readOnly) {
      return true;
    }

    // validate require
    if (required && (value === undefined || value === null || value.length === 0)) {
      this.validateFail('required', value);
      return false;
    }

    if (this.props.onValidate && !this.props.onValidate()) {
      this.validateFail('', value);
      return false;
    }

    if (value === undefined || value === null || value === '') {
      this.validatePass();
      return true;
    }

    // validate type
    let reg = Regs[type];
    if (reg && !reg.test(value)) {
      this.validateFail(type, value);
      return false;
    }

    let len = 0;
    let valueType = this.state.valueType;

    switch(valueType) {
      case 'array':
        len = toArray(value, this.props.sep).length;
      break
      case 'number':
        len = parseFloat(value);
      break
      default:
        len = value.length;
      break
    }

    if (max && len > max) {
      this.validateFail(`max.${valueType}`, max);
      return false;
    }

    if (min && len < min) {
      this.validateFail(`min.${valueType}`, min);
      return false;
    }

    this.validatePass();
    return true;
  }
  validatePass() {
    this.setState({ hasError: false, errorText: '' });
  }
  validateFail(type, value) {
    let text = getTip(type, value) || this.props.tip;
    this.setState({ hasError: true, errorText: text });
  }
  handleChange = (value) => {
    this.validate(this.refs.control.getValue(null));
    if (!this.props.ignore) {
      this.props.channel.setField(this.props.name, this.refs.control.getValue(null));
    }
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
  getValue(sep) {
    return this.refs.control.getValue(sep);
  }
  setValue(value) {
    if (this.refs.control.setValue) {
      this.refs.control.setValue(value);
    }
    this.validate(value);
  }
  handleFocus(focused) {
    this.setState({ focused });
  }
  copyProps() {

    let props = Object.assign({}, this.props, {
      ref: 'control',
      className: 'form-control',
      value: this.state.value
    });

    if (!this.props.readOnly) {
      props.onChange = this.handleChange,
      props.onFocus = this.handleFocus.bind(this, true),
      props.onBlur = this.handleFocus.bind(this, false)
    }

    if (props.layout === 'inline') {
      props.placeholder = props.placeholder || props.label
    }

// It's important use state.data instead of props.data
// Otherwise control.data will be refresh after setState
    props.data = this.state.data;

    return props;
  }
  getChildren(children, component) {
    return React.Children.map(children, (child, i) => {
      let props = {
        key: child.key,
        ref: child.ref
      }
      if (child.type === component) {
        props.ref = 'control';
        return React.addons.cloneWithProps(child, props);
      } else if (child.props && typeof child.props.children === 'object') {
        props.children = this.getChildren(child.props.children, component);
        return React.addons.cloneWithProps(child, props);
      }

      return child;
    });
  }
  getControl(props) {
    let control = controls[this.props.type];
    if (!control) {
      console.warn(`${this.props.type} was not registed.`);
      return null;
    }

    let children = this.props.children;
    if (children) {
      return this.getChildren(children, control.component);
    } else {
      props = Object.assign(this.copyProps(), props || {});
      // 不从FormControl继承responsive设置
      delete props.responsive;
      // ReactUI的默认组件不支持immutable.js，进行转换
      if(control.valueType === "array" && props.value && _.isFunction(props.value.toJS)){
        props.value = props.value.toJS();
      }

      return control.render(props);
    }
  }
  renderInline(className) {
    return (
      <div className={className}>
        {this.getControl({ width: this.props.width ? 24 : undefined })}
        {
          this.state.errorText ?
          <span className="error">{this.state.errorText}</span> :
          ( this.state.hintText && <span className="hint">{this.state.hintText}</span> )
        }
      </div>
    )
  }
  renderStacked(className) {
    return (
      <div className={className}>
        {this.props.label && <label className="label" htmlFor={this.props.id}>{this.props.label}:</label>}
        <div className="pure-control-inner">
          {this.getControl()}
          {
            this.state.errorText ?
            <span className="error">{this.state.errorText}</span> :
            ( this.state.hintText && <span className="hint">{this.state.hintText}</span> )
          }
        </div>
      </div>
    )
  }
  render() {
// do not use Classable, cause width will set control width
// if want to set group's width, use className
    let hintType = this.props.hintType ? this.props.hintType : (this.props.layout === 'inline' ? 'pop' : 'block');

    let reps = [];
    _.forEach(this.props.responsive, function (width, type) {
      reps.push(`pure-u-${type}-${width}-24`);
    });

    let className = classnames(this.props.className, 'pure-control-group', `hint-${hintType}`, 'pure-u-1', reps.join(" "), {
      'has-error': this.state.hasError,
      'focused': this.state.focused
    });

    if (this.props.layout === 'inline') {
      return this.renderInline(className)
    } else {
      return this.renderStacked(className)
    }
  }
};

// register component

FormControl.register = function (types, render, component, valueType = 'string') {
  if (typeof types === 'string') {
    types = [types]
  }
  types.forEach(type => {
    controls[type] = {
      render,
      component,
      valueType
    }
  })
};
