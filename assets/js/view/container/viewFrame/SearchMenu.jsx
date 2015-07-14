"use strict";

var React = require("react"),
  _ = require("underscore"),
  $ = require("jquery"),
  classNames = require("classnames");

var Tabs = require("../../../component/bootstrap/Tabs.jsx"),
  CustomSearch = require("./searchMenu/CustomSearch.jsx"),
  Link = require("../../../component/Link.jsx");

var ModuleCollection = require("../../../store/module");

var action = require("../../../action/viewFrame");

require("backbone-react-component");

var SearchMenu = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function() {
    // 输出预定义查询项
    var currentItem = action.getActivatedItem(),
      roots = this.getCollection().where({parent: null}),
      currentIndex = this.state.currentIndex || _.findIndex(roots, function (item) {
        return item.get("active");
      });
    return (
      <div className="btn-group">
        <button className="btn btn-link dropdown-toggle btn-search-menu-toggle" data-toggle="dropdown">
          {currentItem.get("name")}
          <span className="ace-icon fa fa-angle-down icon-on-right"></span>
        </button>
        <div className="dropdown-menu btn-search-menu">
          <Tabs activated={currentIndex < 0 ? roots.length : currentIndex} className="tabbable tabs-left">
            { this.selectionBulider() }
          </Tabs>
        </div>
      </div>
    );
  },
  triggerSearch: function (model) {
    action.toggleSearchItem(model);
    this.setState({
      currentIndex: null,
      editQueryItem: null
    });
  },
  itemBuilder: function (Tag, model) {
    var children, handle;
    if (model.has("condition")) {
      children = <span className="item">{model.get("name")}</span>;
      handle = this.triggerSearch.bind(null, model);
    } else if(model.has("href") || model.has("to")){
      children = <Link {...model.toJson()}>{model.get("name")}</Link>;
    } else{
      children = model.get("name");
    }

    return (
      <Tag className={classNames("item", model.get("active") ? "active" : null)} onClick={handle} key={model.cid}>
        <i className={classNames("ace-icon", model.get("ico"))}/>{children}
      </Tag>
    );
  },
  selectionBulider: function() {
    var elements = this.getCollection().where({
      parent: null
    }).map(function(item) {
      return (
        <ul ico={item.get("ico")} key={item.cid} tab={item.get("name")}>
          { item.collection.where({parent: item.get("queryId")}).map(function (child) {
            var nodes = child.collection.where({parent: child.get("queryId")});
            // 二级菜单
            if(nodes.length == 0){
              return this.itemBuilder("li", child) ;
            } else { return (
              //三级菜单
              <li key={child.cid}>
                <dl className="item">
                  <dt><i className={classNames("ace-icon", child.get("ico"))}/>{child.get("name")}</dt>
                  {nodes.map(function (node) {
                    return this.itemBuilder("dd",node);
                  }, this)}
                </dl>
              </li>
          ); }}, this) }
        </ul>
      );
    }, this);

    var editItem = this.state.editQueryItem,
      editColumn = editItem && editItem.has("column") ? editItem.get("column") : action.getDefaultItem().get("column");
    elements.push(<CustomSearch ico="fa fa-search" key="自定义检索" tab="自定义检索" fields={this.props.fields}
      item={editItem} column={editColumn} items={this.getCollection()}/>);

    return elements;
  }
});

//阻止列表事件向上传播，导致下拉列表关闭
$(document).on("click", ".btn-search-menu .nav-tabs > li", function(e) {
  e.stopPropagation();
});

module.exports = SearchMenu;
