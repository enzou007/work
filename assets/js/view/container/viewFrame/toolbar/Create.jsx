"use strict";

var React = require("react"),
  _ = require("underscore");

var Create = React.createClass({
  propTypes: {
    page: React.PropTypes.string.isRequired,
    form: React.PropTypes.object.isRequired
  },
  render: function () {
    var keys = _.keys(this.props.form);

    var Button;

    if (keys.length > 1) {
      Button = [
        <button className="btn btn-link dropdown-toggle" data-toggle="dropdown" title="新建">
          <i className="ace-icon fa fa-file-text-o"/>新建
        </button>,
        <ul className="dropdown-menu dropdown-default">
          {
            _.map(this.props.form, function (formName, form) {
              return (
                <li>
                  <a title={formName} href={"/" + this.props.page + "?form=" + form} target="_blank">
                    <i className="ace-icon fa fa-file-text-o"/>{formName}
                  </a>
                </li>
              );
            }, this)
          }
        </ul>
      ];
    } else {
      var form = keys[0],
        formName = this.props.form[form];
      Button = (
        <a className="btn btn-link" title={formName} href={"/" + this.props.page + "?form=" + form} target="_blank">
          <i className="ace-icon fa fa-file-text-o"/>新建
        </a>
      );
    }

    return (
      <div className="btn-group">
        {Button}
      </div>
    );
  }
});

module.exports = Create;