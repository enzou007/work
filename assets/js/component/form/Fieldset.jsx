import React, { PropTypes } from 'react';

export default class Fieldset extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    readOnly: PropTypes.bool
  }
  render() {
    return (
      <fieldset className={this.props.className}>
        {this.props.title ? (
          <legend>{this.props.title}</legend>
        ) : null }
        {React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, {
            readOnly: child.props.readOnly || this.props.readOnly || undefined
          });
        })}
      </fieldset>
    );
  }
};
