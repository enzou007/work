import React from "react";
import _ from "underscore";
import classnames from "classnames";

import DOM from "rctui/src/js/utils/dom";
import Strings from "rctui/src/js/utils/strings";
import Classable from "rctui/src/js/mixins/classable";
import ReceiveValue from "rctui/src/js/mixins/receive-value";
import ClickAwayable from "rctui/src/js/mixins/click-awayable";

import FormControl from "./FormControl.jsx";

import action from "../../action/personnel";

import "rctui/src/less/form.less";
import "rctui/src/less/select.less";

import "../../../less/component/organization.less";

const Personnel = React.createClass({
  mixins: [Classable, ReceiveValue, ClickAwayable],
  propTypes: {
    readOnly: React.PropTypes.bool
  },
  getInitialState() {
    return {
      focus: false,
      active: false,
      options: [],
      data: []
    };
  },
  componentWillUpdate: function (nextProps, nextState) {
    if (nextState.active) {
      this.bindClickAway()
    } else {
      this.unbindClickAway()
    }
  },
  componentClickAway() {
    this.close()
  },
  open() {
    if (!this.state.active && !this.props.readOnly) {
      let options = React.findDOMNode(this.refs.options);
      options.style.display = "block";
      let offset = DOM.getOuterHeight(options) + 5;

      let el = React.findDOMNode(this);
      let dropup = DOM.overView(el, offset);

      this.setState({
        dropup,
        active: true
      });
    }
  },
  close() {
    this.setState({
      focus: false,
      active: false
    });
    this.refs.input.getDOMNode().value = "";
    // use setTimeout instead of transitionEnd
    setTimeout(() => {
      if (this.state.active === false) {
        React.findDOMNode(this.refs.options).style.display = 'none';
      };
    }, 500);
  },
  triggerFocus() {
    if(this.refs.input){
      this.refs.input.getDOMNode().focus();
    }
  },
  handleFocus(flag) {
    this.setState({
      focus: flag
    });
  },
  handleInput: _.debounce(function (event) {
    let inputValue = this.refs.input.getDOMNode().value;
    if (inputValue.trim() !== "") {
      action.query(inputValue).then(resp => {
        this.setState({
          options: resp
        });
      });
      this.open();
    }
  }, 300),
  handleChange(index) {
    if (this.props.readOnly) {
      return;
    }

    let selected = this.state.options[index],
      data = [selected];
    if (this.props.mult) {
      data = this.state.data.slice(0);
      let exist = _.findIndex(data, item => {
        return item.objectId === selected.objectId;
      });

      if (exist !== -1) {
        data.splice(exist, 1);
      }
      data.push(selected);
    }

    this.setState({ data });
    this.close()
    if (this.props.onChange) {
      let value = this.getValue()
      setTimeout(() => {
        this.props.onChange(value)
      }, 0)
    }
  },
  handleRemove(index) {
    if(this.props.readOnly){
      return;
    }

    this.state.data.splice(index, 1);
    if (this.props.onChange) {
      let value = this.getValue()
      setTimeout(() => {
        this.props.onChange(value)
      }, 0)
    }
    this.forceUpdate();
  },
  formatValue: function (value) {
    value = Strings.toArray(value, this.props.sep)
    if (this.state && this.state.data.length !== value.length) {
      action.fetch(value).then(data => {
        this.setState({
          data
        });
      });
      // 在action未返回值前，先初始化一个形式值
      this.setState(_.reduce(value, function (memo, objectId) {
        memo.push({
          objectId: objectId,
          id: objectId,
          name: "加载中..."
        });
        return memo;
      }, []));
    }
    return value
  },
  getValue: function (sep = this.props.sep, data = this.state.data) {
    let value = data.map(function (item) {
      return item.objectId;
    });

    if (sep) {
      value = value.join(sep)
    }

    return value
  },
  renderList() {
    let placeholder = this.state.value.length === 0 ? (this.state.msg || this.props.placeholder) : null;

    return (
      <div>
        { this.state.data.map((item, index) => { return (
          <span className="result" title={item.id} key={item.objectId}
            onClick={this.handleRemove.bind(this, index)}>
            {item.name}
          </span>
        ); }) }
        { !this.props.readOnly ? (
          <span className="search-field">
            <input ref="input" onBlur={this.handleFocus.bind(this, false)} onChange={this.handleInput}
              onFocus={this.handleFocus.bind(this, true)} placeholder={placeholder}/>
          </span>
        ) : null}
      </div>
    );
  },
  renderOptions() {
    return (
      <div className="options-wrap">
        <hr/>
        <div className="options" ref="options">
          <ul>
            { this.state.options.map((item, index) => {
              let dept = _.first(item.departments),
                selected = !!_.findWhere(this.state.data, {objectId: item.objectId});
              return (
                <li className={classnames({show: true, active: selected})} title={item.id} key={item.objectId}
                  onClick={this.handleChange.bind(this, index)} >
                  <span>{item.name}</span>
                  <span className="dept">{dept.name}</span>
                </li>
              );
            }) }
          </ul>
        </div>
      </div>
    );
  },
  render() {
    return (
      <div className={this.getClasses("organization", "personnel", "select", "form-control", {
          focus: this.state.focus,
          active: this.state.active,
          readonly: this.props.readOnly,
          dropup: this.state.dropup
        })} onClick={this.triggerFocus}>
        {this.renderList()}
        {this.renderOptions()}
      </div>
    );
  }
});

export default Personnel;

FormControl.register("personnel", function (props) {
  return <Personnel {...props}/>
}, Personnel, "array");
