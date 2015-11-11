import React from 'react';
import FormControl from './FormControl.jsx';
import RCTCheckboxGroup from 'rctui/checkboxGroup';
import classnames from 'classnames';
import _ from 'underscore';

class CheckboxGroup extends RCTCheckboxGroup{

  render() {
    let values = this.state.value

    let items = this.state.data.map((item, i) => {
      let value = this.props.sep ? item.$value.toString() : item.$value
      let checked = values.indexOf(value) >= 0
      return (
        <Checkbox className="pull-left" key={i}
          index={i}
          readOnly={this.props.readOnly}
          checked={checked}
          text={item.$text} value={item.$value}
          onChange={this.handleChange.bind(this)}>
          {item.$value}
        </Checkbox>
      )
    })

    return (
      <div style={this.props.style} className="form-control radio-group">{ items}</div>
    )
  }
};

class Checkbox extends React.Component{
  static defaultProps = {
    half: false
  }

  handleClick() {
    var checkbox = this.refs["ref_checkbox"].getDOMNode();

    if(this.props.onChange){
      this.props.onChange(checkbox.checked, checkbox.value, checkbox.text);
    }
  }
  render() {
    let props = _.omit(this.props, "onClick", "onChange", "className", "children");
    return (
      <label className={this.props.className}>
        <input ref="ref_checkbox" type='checkbox' onChange={this.handleClick.bind(this)} className={classnames('ace', {
            'ace-checkbox-2': this.props.half
          }, this.props.checkboxClass)} {...props} />
        <span className='lbl'>{this.props.children}</span>
      </label>
    );
  }
}

export {CheckboxGroup, Checkbox}

FormControl.register('checkbox', function (props) {
  return <Checkbox {...props}/>
}, Checkbox, 'string');

FormControl.register('checkbox-group', function (props) {
  return <CheckboxGroup {...props}/>
}, CheckboxGroup, 'array');
