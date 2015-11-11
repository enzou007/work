import React from 'react';
import FormControl from './FormControl.jsx';
import RCTRadioGroup from 'rctui/radioGroup';
import classnames from 'classnames';
import _ from 'underscore';

class RadioGroup extends RCTRadioGroup{
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
            {item.$value}
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
  handleClick(){
    if(this.props.onClick){
      let radio = this.refs["ref_radio"].getDOMNode();
      this.props.onClick(radio.value, radio.text);
    }
  }
  render () {
    return (
      <label className={this.props.className}>
        <input ref="ref_radio" type="radio" className={classnames('ace')}
           onClick={this.handleClick.bind(this)}
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
