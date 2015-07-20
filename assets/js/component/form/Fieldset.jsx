var React = require("react");

var Fieldset = React.createClass({
  propTypes: {
    className: React.PropTypes.any,
    title: React.PropTypes.string
  },
  render: function () {
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

module.exports = Fieldset;
