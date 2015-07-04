var React = require("react");

var identiconCanvas = require("element-icon-identicon/lib/identicon-canvas");

var Avatar = React.createClass({
  getDefaultProps: function() {
    return {
      size: 30,
      className: "",
      detail: true
    };
  },
  propsType: {
    userId: React.PropTypes.string,
    img: React.PropTypes.string,
    size: React.PropTypes.nubmer,
    className: React.PropTypes.string,
    detail: React.PropTypes.bool
  },
  render: function() {
    return (this.props.img ? (
      <img className={this.props.className} src={this.props.img}/>
    ) : (
      <canvas className={this.props.className} ref="canvas"/>
    ));
  },
  componentDidMount: function() {
    if (!this.props.img) {
      var code = identiconCanvas.fixCode(this.props.userId);
      identiconCanvas.render(this.refs.canvas.getDOMNode(), code, this.props.size);
    }
  }
});

module.exports = Avatar;
