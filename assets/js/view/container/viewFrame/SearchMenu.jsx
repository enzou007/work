"use strict";

var React = require("react"),
  _ = require("underscore"),
  $ = require("jquery"),
  classNames = require("classnames");

var Tabs = require("../../../component/bootstrap/Tabs.jsx"),
  CustomSearch = require("./CustomSearch.jsx");

  var ModuleCollection = require("../../../store/module");

require("backbone-react-component");

function findDefaultItem(items, floor) {
  var result = {};
  for (var i = 0, item; item = items[i++];) {
    if (_.isArray(item.children)) {
      result = findDefaultItem(item.children, floor + 1);
    } else if (item.isDefault) {
      result.item = item;
    }
    if (result.item) {
      break;
    }
  }
  if (floor == 0) {
    result.index = i - 1;
  }
  return result;
}

var SearchMenu = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  propTypes: {
    menu: React.PropTypes.array.isRequired,
    model: React.PropTypes.instanceOf(ModuleCollection.model).isRequired
  },
  componentWillMount: function() {
    var info = findDefaultItem(this.props.menu, 0);
    if (!info.item) {
      console.warn("Can not find default item in module " + this.props.model.get("path"));
      return;
    }
    this.setState({
      currentItem: info.item,
      currentIndex: info.index
    });
  },
  render: function() {
    return (
      <div className="btn-group">
        <button className="btn btn-link dropdown-toggle btn-search-menu-toggle" data-toggle="dropdown">
          {this.state.currentItem.name}
          <span className="ace-icon fa fa-angle-down icon-on-right"></span>
        </button>
        <div className="dropdown-menu btn-search-menu">
          <Tabs activated={this.state.currentIndex} className="tabbable tabs-left">
            { this.selectionBulider() }
          </Tabs>
        </div>
      </div>
    );
  },
  selectionBulider: function() {
    // 输出预定义查询项
    var currentItem = this.state.currentItem;
    var elements = this.props.menu.map(function(item) {
      if (_.isObject(item)) {
        // 仅有二级节点，作为二级菜单
        if (_.isArray(item.children) && !item.children.some(function(child) {
          return child.children;
        })) {
          return (
            <ul ico={item.ico} key={item.name} tab={item.name}>
              { item.children.map(function (child) { return (
              <li className={child == currentItem ? "active" : null} key={child.name}>{child.name}</li>
              ); }) }
            </ul>
          );
        } else {
          // 三级菜单
          return (
            <dl ico={item.ico} key={item.name} tab={item.name}>
              {item.children.map(function (child) { return [
                  <dt key={child.name}><i className={classNames("ace-icon", child.ico)}/>{child.name}</dt>,
                  (child.children.map(function (node) {
                    return (
                      <dd key={node.name} className={node == currentItem ? "active" : null}>{node.name}</dd>
                    );
                  }))
              ];})}
            </dl>
          );
        }
      }
    });

    elements.push(<CustomSearch ico="fa fa-search" key="自定义检索" tab="自定义检索"/>);

    return elements;
  }
});

//阻止列表事件向上传播，导致下拉列表关闭
$(document).on("click", ".btn-search-menu .nav-tabs > li", function(e) {
  e.stopPropagation();
});

module.exports = SearchMenu;
