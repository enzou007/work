import React, { PropTypes } from 'react';
import classnames from 'classnames';

import clickAway from 'rctui/src/js/higherorder/clickaway';

@clickAway
export default class Dropdown extends React.Component {
  static propTypes = {
    tag: PropTypes.node,
    clickAndClose: PropTypes.bool,
    dropup: PropTypes.bool,
    align: PropTypes.oneOf([
      'left', 'right'
    ]),
    children: PropTypes.node.isRequired
  }
  static defaultProps = {
    tag: 'div',
    clickAndClose: true
  }
  state = {
    open: false,
    align: this.props.align || 'left',
    dropup: this.props.dropup || false,
    offsetWidth: 0,
    offsetHeight: 0
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.open) {
      this.bindClickAway();
    } else {
      this.unbindClickAway();
    }
  }
  componentClickAway() {
    this.toggleOpen(false)
  }
  _overView(el, offsetWidth = this.state.offsetWidth, offsetHeight = this.state.offsetHeight) {
    let height = window.innerHeight || document.documentElement.clientHeight,
      width = window.innerWhdth || document.documentElement.clientWidth,
      rect = el.getBoundingClientRect();

    let bottom = rect.bottom + offsetHeight,
      right = rect.right + offsetWidth;

    return {
      overWidth: right > width,
      overHeight: bottom > height
    }
  }
  toggleOpen(flag = !this.state.open) {
    let el = React.findDOMNode(this),
      { overWidth, overHeight } = this._overView(el);

    this.setState({
      open: flag,
      align: this.props.align || (overWidth ? 'right' : 'left'),
      dropup: this.props.dropup || overHeight
    }, () => {
      if (this.state.open && this.state.offsetWidth === 0){
        let child = el.children[1],
          offsetWidth = child.offsetWidth,
          offsetHeight = child.offsetHeight,
          { overWidth, overHeight } = this._overView(el, offsetWidth, offsetHeight);

        this.setState({
          offsetWidth,
          offsetHeight,
          align: this.props.align || (overWidth ? 'right' : 'left'),
          dropup: this.props.dropup || overHeight
        });
      }
    });
  }
  getToggle() {
    let toggle = this.props.children[0];

    return React.cloneElement(toggle, {
      className: classnames('dropdown-toggle', toggle.props.className),
      onClick: (event, ...param) => {
        this.toggleOpen();
        let prevent = false;
        if (toggle.props.onClick) {
          prevent = toggle.props.onClick(event, ...param) === true;
        }
        if (!prevent) {
          event.preventDefault();
        }
      }
    });
  }
  getMenu() {
    let menu = this.props.children[1];
    if (menu) {
      return React.cloneElement(menu, {
        className: classnames('dropdown-menu', {
          'dropdown-menu-right': this.state.align === 'right'
        }, menu.props.className),
        onClick: (event, ...param) => {
          let skip = false;
          if (menu.props.onClick) {
            skip = menu.props.onClick(event, ...param) === true;
          }

          if (this.props.clickAndClose || skip) {
            this.toggleOpen(false);
          }
        }
      });
    }
    return menu;
  }
  render() {
    let Tag = this.props.tag;
    return (
      <Tag className={classnames(this.props.className, {dropup: this.state.dropup, open: this.state.open})}>
        {this.getToggle()}
        {this.getMenu()}
      </Tag>
    );
  }
};
