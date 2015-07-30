import React from 'react';
import classnames from 'classnames';
import Objects from 'rctui/src/js/utils/objects';
import FormControl from './FormControl.jsx';

import 'rctui/src/less/form.less';

export default class Form extends React.Component {
  static displayName = 'Form'
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    children: React.PropTypes.any,
    hintType: React.PropTypes.oneOf([
      'block', 'none', 'pop', 'inline'
    ]),
    layout: React.PropTypes.oneOf([
      'aligned', 'stacked', 'inline'
    ]),
    onSubmit: React.PropTypes.func
  }
  static defaultProps = {
    layout: 'inline'
  }
  state = {
    locked: false
  }
  equalValidate(targetRef, equalRef) {
    let self = this;
    return function () {
      let target = self.refs[targetRef]
      if (!target) {
        console.warn(`equal target '${targetRef}' not existed`)
        return false
      }
      let equal = self.refs[equalRef]
      return target.getValue() === equal.getValue()
    };
  }
  getChildren(children) {
    return React.Children.map(children || this.props.children, (child) => {
      let props = {
        hintType: child.props.hintType || this.props.hintType,
        readOnly: child.props.readOnly || this.state.locked,
        layout: this.props.layout
      };

      if (child.type === FormControl) {
        let childName = child.props.name;
        if (!childName) {
          console.warn('FormControl must have a name!');
          return null;
        }
        let value = this.props.store.get(childName);
        if(value && typeof value.toJS === 'function'){
          value = value.toJS();
        }

        props.value = value;
        if (child.props.equal) {
          props.onValidate = this.equalValidate(child.props.equal, childName);
        }

        return React.addons.cloneWithProps(child, props);
      } else if (child.props && typeof child.props.children === 'object') {
        props.children = this.getChildren(child.props.children);
        return React.addons.cloneWithProps(child, props);
      }

      return child;
    });
  }
  getReference(name) {
    return this.refs[name];
  }
  handleSubmit(event) {
    if (this.state.locked) {
      return;
    }

    event.preventDefault();
    this.setState({
      locked: true
    });

    let success = true;

    Objects.forEach(this.refs, function (child) {
      let suc = child.validate()
      success = success && suc
    });

    if (!success) {
      this.setState({
        locked: false
      });

      return;
    }

    let data = this.getValue();
  }
  render() {
    let className = classnames('pure-form', {
      'pure-form-aligned': this.props.layout === 'aligned',
      'pure-form-inline': this.props.layout === 'inline',
      'pure-form-stacked': this.props.layout === 'stacked'
    }, this.props.className);

    return (
      <form action={this.props.action} className={className} onSubmit={this.handleSubmit}>
        {this.getChildren()}
      </form>
    );
  }
};
