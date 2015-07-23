import React from "react";
import _ from "underscore";

import Datetime from "rctui/datetime";

import "rctui/lang/zh-cn";

const OPERATES = {
  "text": [
    {
      name: "等于",
      value: "eq"
    }, {
      name: "不等于",
      value: "neq"
    }, {
      name: "包含",
      value: "le"
    }, {
      name: "不包含",
      value: "nle"
    }, {
      name: "起始于",
      value: "st"
    }
  ],
  "organization": [
    {
      name: "等于",
      value: "eq"
    }, {
      name: "不等于",
      value: "neq"
    }, {
      name: "包含于",
      value: "in"
    }, {
      name: "不包含于",
      value: "nin"
    }
  ],
  "datetime": [
    {
      name: "等于",
      value: "eq"
    }, {
      name: "不等于",
      value: "neq"
    }, {
      name: "大于",
      value: "gt"
    }, {
      name: "大于等于",
      value: "gte"
    }, {
      name: "小于",
      value: "lt"
    }, {
      name: "小于等于",
      value: "lte"
    }
  ]
};

const Condition = React.createClass({
  propTypes: {
    fields: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      dataKey: React.PropTypes.string,
      type: React.PropTypes.string
    })).isRequired,
    value: React.PropTypes.arrayOf(React.PropTypes.string),
    onRemove: React.PropTypes.func,
  },
  getInitialState() {
    let field = this.props.value ? _.findWhere(this.props.fields, {
      dataKey: this.props.value[0]
    }) : this.props.fields[0];
    let operates = this._getOperate(field.type);
    let operate = this.props.value ?  _.findWhere(operates, {
      value: this.props.value[1]
    }) : operates[0];

    return {
      field,
      operate,
      operates,
      value: this.props.value ? this.props.value[2] : ""
    };
  },
  render() {
    return (
      <div className="condition form-group">
        <div className="col-xs-3">
          <select ref="key" className="form-control" defaultValue={this.state.field.dataKey}
            onChange={this.changeDataType}>
            {
              this.props.fields.map((field, index) => {
                return <option key={index} value={field.dataKey}>{field.label}</option>;
              })
            }
          </select>
        </div>
        <div className="col-xs-3">
          <select ref="operate" className="form-control" defaultValue={this.props.value ? this.props.value[1] : null}
            onChange={this.changeOperate}>
            {
              this.state.operates.map((operate, index) => {
                return <option key={index} value={operate.value}>{operate.name}</option>;
              })
            }
          </select>
        </div>
        <div className="col-xs-5">
          {
            this.getInput(this.state.field.type)
          }
        </div>
        <div className="col-xs-1">
          <button className="close" type="button" onClick={this.props.onRemove}><i className="fa fa-trash-o"/></button>
        </div>
      </div>
    );
  },
  getValue() {
    let dataKey = this.refs.key.getDOMNode().value,
      operate = this.refs.operate.getDOMNode().value,
      valueItem = this.refs.value;
    return [dataKey, operate, _.isFunction(valueItem.getValue) ? valueItem.getValue() : valueItem.getDOMNode().value];
  },
  changeDataType() {
    let field = _.findWhere(this.props.fields, {
      dataKey: this.refs.key.getDOMNode().value
    });
    let operates = this._getOperate(field.type);
    this.setState({
      field: field,
      operate: operates[0],
      operates: operates,
      value: ""
    });
  },
  changeOperate() {
    this.setState({
      operate: _.findWhere(thi.state.operates, {
        value: this.refs.operate.getDOMNode().value
      }),
      value: ""
    });
  },
  _getOperate(type) {
    switch (type) {
    case "text":
      return OPERATES.text;
    case "department":
    case "person":
      return OPERATES.organization;
    case "date":
      return OPERATES.datetime;
    default:
    }
  },
  getInput(type) {
    switch(type){
      case "date":
        return <Datetime ref="value" placeholder="日期" dateOnly={true} defaultValue={this.state.value}/>;
      default:
        return <input ref="value" className="form-control" placeholder="数值" type="text" defaultValue={this.state.value}/>;
    }
  }
});

export default Condition;
