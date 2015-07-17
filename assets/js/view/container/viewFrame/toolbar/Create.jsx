import React from "react"
import _ from "underscore"

let Create = React.createClass({
  propTypes: {
    page: React.PropTypes.string.isRequired,
    forms: React.PropTypes.array.isRequired
  },
  render() {
    let Group = [];

    if (this.props.forms.length > 1) {
      Group.push(
        <button className="btn btn-link dropdown-toggle" data-toggle="dropdown" title="新建">
          <i className="ace-icon fa fa-file-text-o"/>新建
        </button>,
        <ul className="dropdown-menu dropdown-default">
          {
            this.props.forms.map(function (form) {
              return (
                <li>
                  <a href={`/${this.props.page}?form=${form.form}&flowId=${form.objectId}`} target="_blank"
                    title={form.name}>
                    <i className="ace-icon fa fa-file-text-o"/>{form.name}
                  </a>
                </li>
              );
            }, this)
          }
        </ul>
      );
    } else if(this.props.forms.length > 0){
      var form = this.props.forms[0];
      Group.push(
        <a className="btn btn-link" title={form.name}
          href={`/${this.props.page}?form=${form.form}&flowId=${form.objectId}`} target="_blank">
          <i className="ace-icon fa fa-file-text-o"/>新建
        </a>
      );
    }

    return (
      <div className="btn-group">
        {Group}
      </div>
    );
  }
});

export default Create;
