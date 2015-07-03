
"use strict";

var Backbone = require("backbone"),
  _ = require("underscore");

var Queries = require("./viewFrame/query");

var Module = Backbone.Model.extend({
  _open: null,
  _active: false,
  _loaded: false,
  _children: null,
  _parents: null,
  idAttribute: "objectId",
  defaults: {
    objectId: "",
    name: "",
    ico: "",
    sort: 10,
    path: null,
    href: null,
    target: null,
    parent: null,
    permission: null,
    queries: null,
    columns: null,
    roles: null
  },
  initialize: function() {
    this.once("sync", function() {
      this._loaded = true;
    });
  },
  parse: function(resp) {
    if (resp.queries) {
      resp.queries = new Queries(resp.queries, {
        moduleId: this.id
      });
    }
    return resp;
  },
  toJSON: function() {
    // queries和columns roles 另有接口负责持久化
    return _.omit(this.attributes, "queries", "columns", "roles");
  },
  getChildren: function() {
    var children = this._children;
    if (!children) {
      children = this.collection.where({
        parent: this.id
      });
      if (children.length > 0 || this.get("lazy") !== true) {
        this._children = children;
      }
    }
    return children.slice(0);
  },
  getParents: function() {
    var item = this,
      items = this._parents;
    if (!items) {
      items = [];
      while (item = this.collection.get(item.get("parent"))) {
        items.unshift(item);
      }
      this._parents = items;
    }
    return items.slice(0);
  },
  isActive: function() {
    return this._active;
  },
  setActive: function(flag) {
    var isChange = flag !== this._active;
    this._active = flag;
    if (isChange) {
      this.trigger("change", this).trigger("change:active", this);
    }
    if (this.getChildren().length === 0) {
      this.trigger("change", this).trigger("change:switch", this);
    }
    return this;
  },
  isOpen: function() {
    return !!this._open;
  },
  setOpen: function(flag) {
    var isChange = flag !== this._open;
    this._open = flag;
    if (isChange) {
      this.trigger("change", this).trigger("change:open", this);
    }
    return this;
  }
});

var Modules = Backbone.Collection.extend({
  model: Module,
  url: "1/system/module",
  _activeItems: [],
  _openItems: [],
  setOpenItem: function(id, flag) {
    var item = this.get(id),
      lastOpen = _.last(this._openItems),
      parent = _.last(item.getParents());
    // 若展开的菜单组并不在当前已展开的组下，则将所有非父组折叠
    if (parent !== lastOpen && flag) {
      while (lastOpen && item.getParents().indexOf(lastOpen) === -1) {
        lastOpen.setOpen(false);
        this._openItems.pop();
        lastOpen = _.last(this._openItems);
      }
    }
    if (item.getChildren().length > 0) {
      if (flag) {
        // 展开菜单组并记录
        if (!item.isOpen()) {
          item.setOpen(true);
          this._openItems.push(item);
        }
      } else {
        //折叠时，需要将其与子组一同折叠
        var index = this._openItems.indexOf(item);
        if (index !== -1) {
          this._openItems.splice(index).reverse().forEach(function(item) {
            item.setOpen(false);
          });
        }
      }
    }
  },
  setActiveItem: function(id) {
    var item = this.get(id),
      last = _.last(this._activeItems);
    if (item === last) {
      return;
    }

    var activated, activating;
    var activatingItems = item.getParents(),
      position = 0;
    // 比对需要高亮的组
    while (activating = activatingItems.shift()) {
      activated = this._activeItems[position];
      //如果与已高亮组不为同一个
      if (activated !== activating) {
        // 展开并高亮组节点
        this._activeItems[position] = activating;
        if (!activating.isOpen()) {
          this.setOpenItem(activating.id, true);
        }
        activating.setActive(true);
        // 取消原组的高亮
        if (activated) {
          activated.setActive(false);
        }
      }
      position++;
    }
    // 处理剩余项目
    this._activeItems.splice(position).forEach(function(item, index) {
      if (index === 0) {
        this.setOpenItem(item.id, false);
      }
      item.setActive(false);
    }.bind(this));
    // 最后处理激活项
    this._activeItems.push(item.setActive(true));
  }
});

module.exports = new Modules(require("../store/module/defaultItem.js"));
