import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import classnames from 'classnames';
import { Set } from 'immutable';

import { Checkbox } from './Checkbox.jsx';
import { Radio } from './Radio.jsx';

import Strings from 'rctui/src/js/utils/strings';

import deptAction from 'Action/department';

import 'Less/component/organization-tree.less';

export default class OrganizationTree extends React.Component {
  static propTypes = {
    selectAble: React.PropTypes.bool,
    mult: React.PropTypes.bool,
    greedy: React.PropTypes.bool,
    region: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onDoubleClick: React.PropTypes.func,
    onRightClick: React.PropTypes.func,
    value: React.PropTypes.instanceOf(Set)
  }
  static defaultProps = {
    selectAble: false,
    mult: false,
    region: null
  }
  state = {
    roots: null,
    store: {},
    value: this.props.value,
    checked: this.getChecked()
  }
  componentWillMount() {
    if(this.props.region){
      this.regionTree();
    }else if(this.props.filter){
      this.filterTree();
    } else {
      this.initTree();
    }
    if(this.props.onDoubleClick){
      $(document).on("dblclick.orgTree", ".tree .tree-item", event => {
        this.extendClick("onDoubleClick", event);
      })
      $(document).on("dblclick.orgTree", ".tree .tree-folder-header", event => {
        this.extendClick("onDoubleClick", event);
      })
    }

    if(this.props.onRightClick){
      $(document).on("contextmenu.orgTree", ".tree-item", event => {
        this.extendClick("onRightClick", event);
      })
      $(document).on("contextmenu.orgTree", ".tree-folder-header", event => {
        this.extendClick("onRightClick", event);
      })
    }
  }
  regionTree() {
    deptAction.fetch(this.props.region).then(item => {
      this.setState({roots: [item]});
    });
    this._loadChildren(this.props.region);
  }
  filterTree(filter) {
    deptAction.query(filter || this.props.filter, "", 50).then(item => {
      this.setState({roots: item});
    });
  }
  initTree() {
    deptAction.byParent(null).then(roots => {
      this.setState({ roots });
      if(roots.length === 1){
        this._loadChildren(roots[0]["@objectId"]);
      }
    });
  }
  extendClick(eventName, event){
    event.preventDefault();
    this.props[eventName](event, $(event.target).attr("data-id"), $(event.target).text());
  }
  componentWillUnmount() {
    if(this.props.onDoubleClick){
      $(document).off("dblclick.orgTree");
    }

    if(this.props.onRightClick){
      $(document).off("contextmenu.orgTree");
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
      checked: this.getChecked({}, nextProps.value)
    });

    if(this.props.filter !== nextProps.filter){
      if(nextProps.filter){
        this.filterTree(nextProps.filter);
      }else{
        this.initTree();
      }
    }
  }
  _loadChildren(parent) {
    deptAction.byParent(parent).then(resp => {
      let store = this.state.store;
      store[parent] = resp;
      this.setState({ store });
    });
  }
  _checkParent(checked, parentId) {
    if(parentId === null){
      return;
    }

    checked[parentId] = 1;
    if(this.state.store[parentId]){
      let parent;
      _.some(this.state.store, (resp) => {
        parent = _.findWhere(resp, {
          "@objectId": parentId
        });
        if (parent) {
          return true;
        }
      });

      if(parent && parent.parent){
        this._checkParent(checked, parent.parent);
      }
    }

    return checked;
  }
  getChecked(checked = {}, value = this.props.value) {
    value.forEach((item) => {
      checked[item["@objectId"]] = 2;

      if(this.props.mult){
        if (!checked[item.parent]) {
          this._checkParent(checked, item.parent);
        }

        if (this.state.store[item["@objectId"]]) {
          this.getChecked(checked, this.state.store[item["@objectId"]]);
        }
      }
    });

    return checked;
  }
  toggleAll(open) {
    _.forEach(this.refs, function (ref) {
      ref.toggleAll(open);
    });
  }
  getValue() {
    let list = [];

    _.forEach(this.refs, (ref) => {
      ref.getChecked(list, this.props.greedy);
    });

    return list;
  }
  handleChange = (item) => {
    if(!this.props.mult){
      this.setState({
        value: [item],
        checked: {
          [item["@objectId"]]: 2
        }
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(this.getValue());
        }
      });
    } else if (this.props.onChange) {
      this.props.onChange(this.getValue());
    }
  }
  onClick = (item) => {
    if (this.props.onClick) {
      this.props.onClick(item);
    }
  }
  checkChildren = (event) => {
    let handle = $(event.target).closest('.tree-folder-header');
    if (handle.size() === 1 && handle.data('id')) {
      let id = handle.data('id');
      if (!this.state.store[id]) {
        deptAction.byParent(id).then(resp => {
          this.state.store[id] = resp;

          if(this.props.mult && this.state.checked[id] === 2){
            _.forEach(resp, (item) => {
              this.state.checked[item["@objectId"]] = 2;
            });
          }

          this.forceUpdate();
        });
      }
    }
  }
  render() {
    let { selectAble, name } = this.props;
    let roots = this.state.roots || [];
    let Items = roots.map((item, i) => {
      return (
        <Item selectAble={selectAble} mult={this.props.mult} data={item} key={item["@objectId"]}
          onClick={this.props.onClick ? this.onClick : null} onStatusChange={this.handleChange}
          ref={i} store={this.state.store} checked={this.state.checked} open={roots.length === 1}/>
      );
    });

    let className = classnames('tree', {
      'tree-selectable': !this.props.readOnly
    }, this.props.className);

    return (
      <ul className={className} onClick={this.checkChildren}>{Items}</ul>
    );
  }
};

class Item extends React.Component {
  static propTypes = {
    selectAble: React.PropTypes.bool,
    mult: React.PropTypes.bool,
    store: React.PropTypes.object,
    data: React.PropTypes.object,
    onClick: React.PropTypes.func,
    onStatusChange: React.PropTypes.func,
    open: React.PropTypes.bool,
    checked: React.PropTypes.object
  }
  state = {
    open: this.props.open,
    status: this.checkStatus()
  }
  componentWillReceiveProps(nextProps) {
    let status = this.checkStatus(nextProps.checked);
    if (this.getStatus() !== status) {
      this.setState({ status });
    }
  }
  checkStatus(checked = this.props.checked) {
    return checked[this.props.data["@objectId"]] || 0;
  }
  toggle = (event) => {
    this.setState({
      open: !this.state.open
    });
    event.preventDefault();
  }
  toggleAll(open) {
    this.setState({ open });
    _.forEach(this.refs, function (ref) {
      ref.toggleAll(open);
    });
  }
  check = () => {
    if (this.props.readOnly) {
      return;
    }
    let status = this.state.status;
    status = status < 2 ? 2 : 0;
    this.setStatus(status);

    _.defer(() => {
      this.props.onStatusChange(this.props.data);
    });
  }
  setStatus(status) {
    if (this.props.mult && status !== 1) {
      _.forEach(this.refs, function (ref) {
        ref.setStatus(status);
      });
    }

    if (status) {
      this.props.checked[this.props.data["@objectId"]] = status;
    } else {
      delete this.props.checked[this.props.data["@objectId"]]
    }

    this.setState({ status });
  }
  getStatus() {
    return this.state.status;
  }
  onClick = (data) => {
    if(this.props.onClick){
      // 排除冒泡事件
      data = data.hasOwnProperty('_dispatchListeners') ? this.props.data : data
      this.props.onClick(data);
    }
  }
  // 通过事件向上传播，检查所有子级是否已被选中
  updateStatus = (data) => {
    if (this.props.mult) {
      let status = null;
      _.some(this.refs, (ref) => {
        let s = ref.getStatus();
        if (status === null) {
          status = s;
          if (status === 1) {
            return true;
          }
        } else if (s === 1 || s !== status) {
          status = 1;
          return true;
        }
      });

      this.setStatus(status);
    }

    this.props.onStatusChange(data);
  }
  getChecked(list, greedy) {
    if (this.getStatus() >= (greedy ? 1 : 2)) {
      list.push(this.props.data);
    }

    if(true && this.props.data.size > 0 && this.getStatus() !== 2){
      _.forEach(this.refs, function (ref) {
        ref.getChecked(list, greedy);
      });
    }
  }
  render() {
    let children,
    SelectHandle = '';

    let { name, data, selectAble, readOnly, open, checked } = this.props;

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
      let childrenData = this.props.store[this.props.data["@objectId"]] || [],
        Items = childrenData.map((item, i) => {
          return (
            <Item selectAble={selectAble} data={item} key={item["@objectId"]} mult={this.props.mult}
              onClick={this.props.onClick} onStatusChange={this.updateStatus} store={this.props.store}
              readOnly={readOnly} ref={i} checked={checked}/>
          )
        });

      return (
        <li className="tree-folder">
          <div className="tree-folder-header" data-id={this.props.data["@objectId"]}>
            <i className={classnames('ace-icon', 'fa', this.state.open ? 'fa-folder-open' : 'fa-folder', 'fa-fw')}
              onClick={this.toggle}/>
            {SelectHandle}
            <span className="tree-item-name" onClick={this.props.onClick ? this.onClick : this.toggle} data-id={this.props.data["@objectId"]}>{data.name}</span>
          </div>
          <ul className={classnames('tree-folder-content', {
              open: this.state.open
            })}>{Items}</ul>
          </li>
      );
    } else {
      return (
        <li className="tree-item" onClick={this.onClick} data-id={this.props.data["@objectId"]}>
          <i className="tree-item-icon fa fa-file-o fa-fw"/>
          {SelectHandle}
          <span className="tree-item-name" data-id={this.props.data["@objectId"]}>{data.name}</span>
        </li>
      );
    }
  }
};
