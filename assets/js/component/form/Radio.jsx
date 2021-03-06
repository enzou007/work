import React from 'react';
import FormControl from './FormControl.jsx';
import RCTRadioGroup from 'rctui/radioGroup';
import classnames from 'classnames';
import _ from 'underscore';

class RadioGroup extends RCTRadioGroup{
  handleChange (event, value) {
    if (this.props.readOnly) {
      return
    }

    this.setState({ value: value })
    let change = this.props.onChange
    if (change) {
      setTimeout(function () {
        change(value)
      }, 0)
    }
  }
  render() {
    let list;
    if(this.props.readOnly){
      list = (<div>{this.state.value}</div>);
    }else{
      let props = {
        name: this.props.name
      }
      list = _.map(this.state.data, (item, i) => {
        props.checked = this.state.value === item.$value;
        props.text = item.$text;
        props.value = item.$value;
        return (
          <Radio className="pull-left" key={i} onClick={this.handleChange.bind(this)} {...props}>
            {item.$text}
          </Radio>
        )
      });
    }

    return (
      <div className="form-control radio-group">
        {list}
      </div>
    );
  }
}

class Radio extends React.Component{

  handleClick(event) {
    var radio = this.refs["ref_radio"].getDOMNode();

    if(this.props.onClick){
      this.props.onClick(event, radio.value, radio.text);
    }
  }
  handleChange(event) {
    var radio = this.refs["ref_radio"].getDOMNode();

    if(this.props.onChange){
      this.props.onChange(event, radio.value, radio.text);
    }
  }
  render () {
    return (
      <label className={this.props.className}>
        <input ref="ref_radio" type="radio" className={classnames('ace')}
          onChange={this.handleChange.bind(this)} onClick={this.handleClick.bind(this)}
           {...(_.omit(this.props, 'children', 'className', 'onClick', 'onChange'))}/>
        <span className="lbl">{this.props.children}</span>
      </label>
    );
  }
}

export {Radio , RadioGroup}

FormControl.register('radio', function (props) {
  return <Radio {...props}/>
}, Radio, 'string');

FormControl.register('radio-group', function (props) {
  return <RadioGroup {...props}/>
}, RadioGroup, 'string');
