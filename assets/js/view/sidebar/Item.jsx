"use strict";

var React = require("react"),
  classNames = require("classnames"),
  CSSTransitionGroup = require("../../component/react/CSSTransitionGroup/CSSTransitionGroup");

var Link = require("../../component/Link.jsx");

var modelType = require("../../store/module").model;

require("backbone-react-component");

var Item = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  propTypes: {
    isMin: React.PropTypes.bool,
    model: React.PropTypes.instanceOf(modelType)
  },
  handleClick: function(event) {
    var model = this.getModel();
    if (model.getChildren().length > 0) {
      model.collection.setOpenItem(model.id, !model.isOpen());
      event.preventDefault();
    }
    event.stopPropagation();
  },
  handleMiniTouch: function(event) {
    if (this.props.isMin && !this.getModel().has("parent")) {
      event.preventDefault();
      event.stopPropagation();
    }
  },
  render: function() {
    var model = this.getModel(),
      childrenData = model.getChildren();

    var Children = null;
    if (model.isOpen() || (this.props.isMin && !model.has("parent"))) {
      var Items = childrenData.map(function(model) {
        return <Item isMin={this.props.isMin} key={model.id} model={model}/>;
      }.bind(this));

      Children = (
        <ul className="submenu">
          {Items}
        </ul>
      );
    }

    var classes = classNames({
      hsub: childrenData.length > 0,
      open: model.isOpen(),
      active: model.isActive()
    });

    return (
      <li aria-haspopup={this.props.isMin && childrenData.length > 0} className={classes} onClick={this.handleClick}>
        <Link href={model.get("href")} target={model.get("target")} title={model.get("name")} to={model.get("path")}>
          <i aria-haspopup={this.props.isMin && !model.has("parent")}
            className={classNames("menu-icon", model.get("ico"))} onTouchEnd={this.handleMiniTouch}/>
          <span className="menu-text"> {model.get("name")}</span>
          {childrenData.length > 0 ? <b className="arrow fa fa-angle-down"/> : null}
        </Link>
        <b className="arrow"/>
        <CSSTransitionGroup transitionName="transition">
          {Children}
        </CSSTransitionGroup>
      </li>
    );
  }
});

module.exports = Item;
