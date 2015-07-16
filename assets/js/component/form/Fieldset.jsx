var React = require("react");

var Fieldset = React.createClass({
  propTypes: {
    className: React.PropTypes.any,
    title: React.PropTypes.string
  },
  render: function () {
    return (
      <fieldset className={this.props.className}>
        <legend>{this.props.title}</legend>
        { this.props.children }
      </fieldset>
    );
  }
});

module.exports = Fieldset;
