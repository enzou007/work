import React from "react";
import _ from "underscore";

import Dropdown from "../../../../component/bootstrap/Dropdown.jsx";

let Create = React.createClass({
  propTypes: {
    page: React.PropTypes.string.isRequired,
    path: React.PropTypes.string.isRequired,
    forms: React.PropTypes.array.isRequired
  },
  _href(page, form, path, flowId) {
    if(flowId){
      return `/${page}?form=${form}&path=${path}&flowId=${flowId}`;
    }else {
      return `/${page}?form=${form}&path=${path}`;
    }

  },
  render() {
    if (this.props.forms.length > 1) {
      return (
        <Dropdown className="btn-group">
          <button className="btn btn-link" title="新建">
            <i className="ace-icon fa fa-file-text-o"/>新建
          </button>
          <ul>
            { this.props.forms.map((form) => { return (
              <li>
                <a key={form.form} href={this._href(this.props.page, form.form, this.props.path, form.objectId)}
                  target="_blank" title={form.name}>
                  <i className="ace-icon fa fa-file-text-o"/>{form.name}
                </a>
              </li>
            ); }) }
          </ul>
        </Dropdown>
      );
    } else if(this.props.forms.length > 0){
      var form = this.props.forms[0];

      return (
        <div className="btn-group">
          <a className="btn btn-link" key={form.name} title={form.name}
            href={this._href(this.props.page, form.form, this.props.path, form.objectId)} target="_blank">
            <i className="ace-icon fa fa-file-text-o"/>新建
          </a>
        </div>
      );
    }
  }
});

export default Create;
