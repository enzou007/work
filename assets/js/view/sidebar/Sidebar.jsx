"use strict";

var React = require("react"),
  classNames = require("classnames");

var Item = require("./Item.jsx");

var session = require("../../store/session"),
  moduleType = require("../../store/module");

require("backbone-react-component");
require("../../../less/app/sidebar.less");

var Sidebar = React.createClass({
  propTypes: {
    collection: React.PropTypes.oneOf([moduleType]).isRequired
  },
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function() {
    var isMin = session.get("mini-menu") === true;
    return {
      isMin: isMin
    };
  },
  toggleMini: function() {
    this.setState({
      isMin: !this.state.isMin
    }, function() {
      session.set("mini-menu", this.state.isMin);
    });
  },
  render: function() {

    var Items = this.getCollection() ? (this.getCollection().where({
      parent: null
    }).sort(item => item.get("sort")).map(function(model) {
      return <Item isMin={this.state.isMin} key={model.id} model={model}/>;
    }.bind(this))) : null;

    return (
      <div className={classNames("sidebar", "responsive", {"menu-min": this.state.isMin})} id="sidebar">
        <ul className="nav nav-list">
          {Items}
        </ul>
        <div className="sidebar-toggle sidebar-collapse" id="sidebar-collapse" onClick={this.toggleMini}>
          <i className={classNames("ace-icon", "fa", this.state.isMin?"fa-angle-double-right":"fa-angle-double-left")}/>
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
