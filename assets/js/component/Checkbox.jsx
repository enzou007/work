import React, { PropTypes } from 'react';
import _ from 'underscore';
import classnames from 'classnames';

const Checkbox = React.createClass({
  propTypes: {
    half: PropTypes.bool,
    checkboxClass: PropTypes.string
  },
  getDefaultProps: function() {
    return {
      half: false
    };
  },
  render: function() {
    return (
      <label className={this.props.className} onClick={this.props.onClick}>
        <input type='checkbox' className={classnames('ace', {
            'ace-checkbox-2': this.props.half
          }, this.props.checkboxClass)} {...(_.omit(this.props, 'children', 'className', 'onClick'))} />
        <span className='lbl'>{this.props.children}</span>
      </label>
    );
  }
});

export default Checkbox;
