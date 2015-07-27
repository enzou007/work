import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import classnames from 'classnames';

import Checkbox from '../Checkbox.jsx';
import Radio from '../Radio.jsx';

import Strings from 'rctui/src/js/utils/strings';
import Classable from 'rctui/src/js/mixins/classable';

import action from '../../action/department';

import '../../../less/component/organization-tree.less';

const ROOT_CODE = '__root__';

const OrganizationTree = React.createClass({
  propTypes: {
    selectAble: React.PropTypes.bool,
    mult: React.PropTypes.bool,
    greedy: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    value: React.PropTypes.array
  },
  mixins: [ Classable ],
  getDefaultProps() {
    return {
      sep: ',',
      selectAble: false,
      mult: false
    };
  },
  getInitialState() {
    return {
      cache: {
        [ROOT_CODE]: []
      },
      data: []
    };
  },
  componentWillMount() {
    action.children('@root').then(resp => {
      this.state.cache[ROOT_CODE] = resp;
      this.forceUpdate();
    });
  },
  toggleAll(open) {
    _.forEach(this.refs, function (ref) {
      ref.toggleAll(open);
    });
  },
  getValue() {
    let list = [];

    _.forEach(this.refs, (ref) => {
      ref.getChecked(list, this.props.greedy);
    });

    return list;
  },
  handleChange(data) {
    if (this.props.onChange) {
      if (this.props.mult) {
        this.props.onChange(this.getValue());
      } else {
        this.props.onChange([data]);
      }
    }
  },
  onClick(item) {
    if (this.props.onClick) {
      this.props.onClick(item);
    }
  },
  checkChildren(event) {
    let handle = $(event.target).closest('.tree-folder-header');
    if (handle.size() === 1 && handle.data('id')) {
      let id = handle.data('id');
      if (!this.state.cache[id]) {
        action.children(id).then(resp => {
          this.state.cache[id] = resp;
          this.forceUpdate();
        });
      }
    }
  },
  render() {
    let { selectAble, name } = this.props;
    let Items = this.state.cache[ROOT_CODE].map((item, i) => {
      return (
        <Item selectAble={selectAble} data={item} key={item.objectId}
          onClick={this.onClick} onStatusChange={this.handleChange}
          ref={i} store={this.state.cache} value={this.props.value}/>
      );
    });

    let className = this.getClasses('tree', {
      'tree-selectable': !this.props.readOnly
    });

    return (
      <ul className={className} onClick={this.checkChildren}>{Items}</ul>
    );
  }
});

export default OrganizationTree;


let Item = React.createClass({
  propTypes: {
    selectAble: React.PropTypes.bool,
    store: React.PropTypes.object,
    data: React.PropTypes.object,
    onClick: React.PropTypes.func,
    onStatusChange: React.PropTypes.func,
    open: React.PropTypes.bool,
    value: React.PropTypes.any
  },
  getInitialState() {
    return {
      open: this.props.open,
      status: this.checkStatus(this.props.value)
    }
  },
  componentWillReceiveProps(nextProps) {
    let curStatus = this.state.status,
      nextStatus = this.checkStatus(nextProps.value);
    if(curStatus != nextStatus){
      this.setState({
        status: nextStatus
      });
    }
  },
  checkStatus(value) {
    return _.findWhere(value, {
      objectId: this.props.data.objectId
    }) ? 2 : 0;
  },
  toggle(event) {
    this.setState({
      open: !this.state.open
    });
    event.preventDefault();
  },
  toggleAll(open) {
    this.setState({ open });
    _.forEach(this.refs, function (ref) {
      ref.toggleAll(open);
    })
  },
  check() {
    if (this.props.readOnly) {
      return;
    }
    let status = this.state.status;
    status = status < 2 ? 2 : 0;
    this.setStatus(status);
    // setTimeout wait state changed
    setTimeout(() => {
      this.props.onStatusChange(this.props.data);
    }, 0);
  },
  setStatus(status) {
    this.setState({ status });
    if(this.props.mult){
      _.forEach(this.refs, function (ref) {
        ref.setStatus(status);
      });
    }
  },
  getStatus() {
    return this.state.status;
  },
  onClick(data) {
    if (this.props.onClick) {
      this.props.onClick(data);
    }
  },
  // 通过事件向上传播，检查所有子级是否已被选中
  updateStatus(data) {
    if(this.props.mult){
      let status;
      _.some(this.refs, function (ref) {
        let s = ref.getStatus();
        if (!status) {
          status = s
          if (status === 1) {
            return true;
          }
        } else if (s === 1 || s !== status) {
          status = 1;
          return true;
        }
      });
      this.setState({ status });
      this.props.onStatusChange(data);
    }
  },
  getChecked(list, greedy) {
    if (this.state.status >= (greedy ? 1 : 2)) {
      list.push(this.props.data);
    }

    _.forEach(this.refs, function (ref) {
      ref.getChecked(list, greedy);
    });
  },
  render() {
    let children,
    SelectHandle = "";

    let { name, data, selectAble, readOnly, open, value } = this.props;

    if(selectAble){
      SelectHandle = this.props.mult ? (
        <Checkbox className="select-handle" checked={this.state.status > 0} half={this.state.status < 2}
         onChange={this.check} onClick={function (event) {
           event.stopPropagation();
         }}/>
      ) : (
        <Radio className="select-handle" checked={this.state.status > 0} onChange={this.check} onClick={function (event) {
          event.stopPropagation();
        }}/>
      );
    }

    if (data.size > 0) {
      let childrenData = this.props.store[this.props.data.objectId] || [],
        Items = childrenData.map((item, i) => {
          return (
            <Item selectAble={selectAble} data={item} key={item.objectId}
              onClick={this.onClick} onStatusChange={this.updateStatus} store={this.props.store}
              open={open} readOnly={readOnly} ref={i} value={value}/>
          )
        });

      return (
        <li className="tree-folder">
          <div className="tree-folder-header" data-id={this.props.data.objectId}>
            <i className={classnames('ace-icon', 'fa', this.state.open ? 'fa-folder-open' : 'fa-folder', 'fa-fw')}
              onClick={this.toggle}/>
            {SelectHandle}
            <span onClick={this.toggle}>{data.name}</span>
          </div>
          <ul className={classnames('tree-folder-content', {
              open: this.state.open
            })}>{Items}</ul>
          </li>
      );
    } else {
      return (
        <li className="tree-item">
          <i className="tree-item-icon fa fa-file-o fa-fw"/>
          {SelectHandle}
          <span className="tree-item-name">{data.name}</span>
        </li>
      );
    }
  }
});
