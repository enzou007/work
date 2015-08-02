import React from 'react';

const Fieldset = React.createClass({
  propTypes: {
    className: React.PropTypes.any,
    title: React.PropTypes.string
  },
  render() {
    return (
      <fieldset className={this.props.className}>
        { this.props.title ? (
        <legend>{this.props.title}</legend>
        ): null }
        { this.props.children }
      </fieldset>
    );
  }
});

export default Fieldset;
