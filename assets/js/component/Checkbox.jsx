import React from 'react';
import _ from 'underscore';
import classnames from 'classnames';

var Checkbox = React.createClass({
  propTypes: {
    half: React.PropTypes.bool,
    checkboxClass: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      half: false
    };
  },
  render: function() {
    return (
      <label className={classnames('position-relative', this.props.className)}>
        <input type='checkbox' className={classnames('ace', {
            'ace-checkbox-2': this.props.half
          }, this.props.checkboxClass)} {...(_.omit(this.props, 'children', 'className'))} />
        <span className='lbl'></span>
        {this.props.children}
      </label>
    );
  }
});

module.exports = Checkbox;
