import React from "react";
import _ from "underscore";
import $ from "jquery";
import classnames from "classnames";

import Tabs from "../../../component/bootstrap/Tabs.jsx";
import Dropdown from "../../../component/bootstrap/Dropdown.jsx";
import CustomSearch from "./searchMenu/CustomSearch.jsx";
import Link from "../../../component/Link.jsx";

import ModuleCollection from "../../../store/module";

import action from "../../../action/viewFrame";

import "backbone-react-component";

const SearchMenu = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  triggerSearch(model) {
    action.toggleSearchItem(model);
    this.setState({
      currentIndex: null,
      editQueryItem: null
    });
  },
  itemBuilder(Tag, model) {
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
      <Tag className={classnames("item", model.get("active") ? "active" : null)} onClick={handle} key={model.cid}>
        <i className={classnames("ace-icon", model.get("ico"))}/>{children}
      </Tag>
    );
  },
  selectionBulider() {
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
                  <dt><i className={classnames("ace-icon", child.get("ico"))}/>{child.get("name")}</dt>
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
  },
  checkClose(event) {
    if($(event.target).hasClass("item")){
      return true;
    }
  },
  render() {
    // 输出预定义查询项
    var currentItem = action.getActivatedItem(),
      roots = this.getCollection().where({parent: null}),
      currentIndex = this.state.currentIndex || _.findIndex(roots, function (item) {
        return item.get("active");
      });
    return (
      <Dropdown className="btn-group" clickAndClose={false}>
        <button className="btn btn-link btn-search-menu-toggle">
          {currentItem.get("name")}
          <span className="ace-icon fa fa-angle-down icon-on-right"></span>
        </button>
        <div className="btn-search-menu" onClick={this.checkClose}>
          <Tabs activated={currentIndex < 0 ? roots.length : currentIndex} className="tabbable tabs-left">
            { this.selectionBulider() }
          </Tabs>
        </div>
      </Dropdown>
    );
  }
});

export default SearchMenu;
