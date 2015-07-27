import React from 'react';
import classnames from 'classnames';

import ClickAwayable from 'rctui/src/js/mixins/click-awayable';

const Dropdown = React.createClass({
  mixins: [ClickAwayable],
  propTypes: {
    tag: React.PropTypes.node,
    clickAndClose: React.PropTypes.bool,
    dropup: React.PropTypes.bool,
    align: React.PropTypes.oneOf([
      'left', 'right'
    ]),
    children: React.PropTypes.node.isRequired
  },
  getDefaultProps() {
    return {
      tag: 'div',
      clickAndClose: true
    };
  },
  getInitialState() {
    return {
      open: false,
      align: this.props.align || 'left',
      dropup: this.props.dropup || false,
      offsetWidth: 0,
      offsetHeight: 0
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
  _overView(el, offsetWidth = this.state.offsetWidth, offsetHeight = this.state.offsetHeight) {
    let height = window.innerHeight || document.documentElement.clientHeight,
      width = window.innerWhdth || document.documentElement.clientWidth,
      rect = el.getBoundingClientRect();

    let bottom = rect.bottom + offsetHeight,
      right = rect.right + offsetWidth;

    return {
      width: right > width,
      height: bottom > height
    }
  },
  toggleOpen(flag = !this.state.open) {
    let el = React.findDOMNode(this),
      { align, dropup } = this._overView(el);

    this.setState({
      open: flag,
      align: this.props.align || (align ? 'right' : 'left'),
      dropup: this.props.dropup || dropup
    }, () => {
      if (this.state.open && this.state.offsetWidth === 0){
        let child = el.children[1],
          offsetWidth = child.offsetWidth,
          offsetHeight = child.offsetHeight,
          { align, dropup } = this._overView(el, offsetWidth, offsetHeight);

        this.setState({
          offsetWidth,
          offsetHeight,
          align: this.props.align || (align ? 'right' : 'left'),
          dropup: this.props.dropup || dropup
        });
      }
    });
  },
  getToggle() {
    let toggle = this.props.children[0];

    return React.addons.cloneWithProps(toggle, {
      className: classnames('dropdown-toggle'),
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
        className: classnames('dropdown-menu', {
          'dropdown-menu-right': this.state.align === 'right'
        }),
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
