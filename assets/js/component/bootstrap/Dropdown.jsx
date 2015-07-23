import React from "react";
import classnames from "classnames";

import DOM from "rctui/src/js/utils/dom";
import ClickAwayable from "rctui/src/js/mixins/click-awayable";

const Dropdown = React.createClass({
  mixins: [ClickAwayable],
  propTypes: {
    tag: React.PropTypes.node,
    clickAndClose: React.PropTypes.bool,
    dropup: React.PropTypes.bool,
    children: React.PropTypes.node.isRequired
  },
  getDefaultProps() {
    return {
      tag: "div",
      clickAndClose: true
    };
  },
  getInitialState() {
    return {
      open: false,
      dropup: this.props.dropup || false,
      offset: 0
    };
  },
  componentWillUpdate: function (nextProps, nextState) {
    if (nextState.open) {
      this.bindClickAway();
    } else {
      this.unbindClickAway();
    }
  },
  componentClickAway() {
    this.toggleOpen(false)
  },
  toggleOpen(flag = !this.state.open) {
    let el = React.findDOMNode(this);

    this.setState({
      open: flag,
      dropup: this.props.dropup || (this.state.offset ? DOM.overView(el, this.state.offset) : this.state.dropup)
    }, () => {
      if (this.state.open && this.props.dropup == null && this.state.offset === 0) {
        let offset = el.children[1].offsetHeight;

        this.setState({
          offset,
          dropup: DOM.overView(el, offset)
        });
      }
    });
  },
  getToggle() {
    let toggle = this.props.children[0];

    return React.addons.cloneWithProps(toggle, {
      className: classnames("dropdown-toggle"),
      onClick: (event, ...param) => {
        this.toggleOpen();
        let prevent = false;
        if (toggle.props.onClick) {
          prevent = toggle.props.onClick(event, ...param) === true;
        }
        if (!prevent) {
          event.preventDefault();
        }
      },
      ref: toggle.props.ref,
      key: toggle.props.key
    });
  },
  getMenu() {
    let menu = this.props.children[1];
    if (menu) {
      return React.addons.cloneWithProps(menu, {
        className: classnames("dropdown-menu"),
        onClick: (...param) => {
          let skip = false;
          if (menu.props.onClick) {
            skip = menu.props.onClick(...param) === true;
          }

          if (this.props.clickAndClose || skip) {
            this.toggleOpen(false);
          }
        },
        ref: menu.props.ref,
        key: menu.props.key
      });
    }
    return menu;
  },
  render: function () {
    let Tag = this.props.tag;
    return (
      <Tag className={classnames(this.props.className, {dropup: this.state.dropup, open: this.state.open})}>
        {this.getToggle()}
        {this.getMenu()}
      </Tag>
    );
  }
});

export default Dropdown;
