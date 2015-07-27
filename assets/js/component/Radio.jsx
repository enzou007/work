import React, { PropTypes } from 'react';
import _ from 'underscore';
import classnames from 'classnames';

const Radio = React.createClass({
  render () {
    return (
      <label className={this.props.className} onClick={this.props.onClick}>
        <input type="radio" className={classnames('ace')} {...(_.omit(this.props, 'children', 'className', 'onClick'))}/>
        <span className="lbl">{this.props.children}</span>
      </label>
    );
  }
})

export default Radio;
