"use strict";

import React from 'react'
import classnames from 'classnames'
import Strings from 'rctui/utils/strings'
import Objects from 'rctui/utils/objects'
import Validatable from 'rctui/mixins/validatable';

let controls = {};

const FormControl = React.createClass({
  displayName: 'FormControl',
  propTypes: {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    store: React.PropTypes.any,
    data: React.PropTypes.any,
    hintType: React.PropTypes.oneOf([
      'block', 'none', 'pop', 'inline'
    ]),
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    layout: React.PropTypes.oneOf([
      'aligned', 'stacked', 'inline'
    ]),
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    responsive: React.PropTypes.shape({
      sm: React.PropTypes.number,
      md: React.PropTypes.number,
      lg: React.PropTypes.number,
      xl: React.PropTypes.number
    }),
    type: React.PropTypes.string,
    value: React.PropTypes.any
  },
  mixins: [Validatable],
  getDefaultProps() {
    return {
      id: Strings.nextUid(),
      layout: 'inline',
      responsive: {
        lg: 12,
        xl: 8
      },
      type: 'text'
    }
  },
  getInitialState() {
    return {
      focused: false,
      hasError: false,
      hasValue: this.props.value,
      value: this.props.value,
      valueType: controls[this.props.type].valueType,
      data: this.props.data,
      hintText: ''
    }
  },
  componentWillMount: function () {
    this.setState({})
  },
  getReference() {
    return this.refs.control
  },
  handleChange(value) {
    this.validate(this.refs.control.getValue(null))
    if (!this.props.ignore && this.props.store) {
      this.props.store[this.props.name] = this.refs.control.getValue(null);
    }
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  },
  getValue(sep) {
    return this.refs.control.getValue(sep)
  },
  setValue(value) {
    if (this.refs.control.setValue) {
      this.refs.control.setValue(value)
    }
    this.validate(value)
  },
  handleFocus(focused) {
    this.setState({
      focused
    })
  },
  copyProps() {

    let props = Object.assign({}, this.props, {
      ref: "control",
      value: this.state.value,
      onChange: this.handleChange,
      onFocus: this.handleFocus.bind(this, true),
      onBlur: this.handleFocus.bind(this, false)
    });

    if (props.layout === 'inline') {
      props.placeholder = props.placeholder || props.label
    }

// It's important use state.data instead of props.data
// Otherwise control.data will be refresh after setState
    props.data = this.state.data;

    return props;
  },
  getChildren(children, component) {
    return React.Children.map(children, (child, i) => {
      let props = {
        key: child.key,
        ref: child.ref
      }
      if (child.type === component) {
        props.ref = 'control'
        return React.addons.cloneWithProps(child, props)
      } else if (child.props && typeof child.props.children === 'object') {
        props.children = this.getChildren(child.props.children, component)
        return React.addons.cloneWithProps(child, props)
      }

      return child
    })
  },
  getControl(props) {
    let control = controls[this.props.type]
    if (!control) {
      console.warn(`${this.props.type} was not registed.`)
      return null
    }

    let children = this.props.children
    if (children) {
      return this.getChildren(children, control.component)
    } else {
      props = Object.assign(this.copyProps(), props || {});
      // 不从FormControl继承responsive设置
      if (props) {
        delete props.responsive;
      }
      return control.render(props)
    }
  },
  renderInline(className) {
    return (
      <div className={className}>
        {this.getControl({ width: this.props.width ? 24 : undefined })} { this.state.errorText ?
        <span className="error">{this.state.errorText}</span>
        : ( this.state.hintText &&
        <span className="hint">{this.state.hintText}</span>
        ) }
      </div>
    )
  },
  renderStacked(className) {
    return (
      <div className={className}>
        <label className="label" htmlFor={this.props.id}>{this.props.label}:</label>
        <div className="pure-control-inner">
          {this.getControl()} { this.state.errorText ?
          <span className="error">{this.state.errorText}</span>
          : ( this.state.hintText &&
          <span className="hint">{this.state.hintText}</span>
          ) }
        </div>
      </div>
    )
  },
  render() {
// do not use Classable, cause width will set control width
// if want to set group's width, use className
    let hintType = this.props.hintType ? this.props.hintType : (this.props.layout === 'inline' ? 'pop' : 'block');

    let reps = [];
    Objects.forEach(this.props.responsive, function (width, type) {
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
}); // register component

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

module.exports = FormControl
