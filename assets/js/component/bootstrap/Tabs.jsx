import React, { PropTypes } from "react";
import _ from "underscore";
import $ from "jquery";
import classnames from "classnames";

import "bootstrap/js/transition";

export default class Tabs extends React.Component {
  static propTypes = {
    fade: PropTypes.bool,
    lazy: PropTypes.bool,
    triggerLink: PropTypes.bool,
    activated: PropTypes.number
  }
  static defaultProps = {
    fade: false,
    lazy: false,
    triggerLink: false,
    activated: 0
  }
  state = {
    activated: this.props.activated,
    in: true
  }
  _getActiveChild(targetIndex = this.state.activated) {
    let target = null;
    React.Children.forEach(this.props.children, (child, index) => {
      if(targetIndex === index){
        target = child;
        return true;
      }
    });
    return target;
  }
  componentWillMount() {
    let child = this._getActiveChild();
    child.props.onShow && child.props.onShow();
  }
  componentDidMount() {
    let child = this._getActiveChild();
    child.props.onShown && child.props.onShown();
  }
  toggleActive(clickIndex, event) {
    if (this.props.triggerLink && clickIndex === this.state.activated) {
      return;
    }
    let onShown, onHidden;
    let callback = function () {
      onShown && onShown();
      onHidden && onHidden();
    }
    // 检测并注册事件回调
    React.Children.forEach(this.props.children, (child, index) => {
      if(clickIndex === index){
        child.props.onShow && child.props.onShow();
        onShown = child.props.onShown;
      }
      if(this.state.activated === index){
        child.props.onHide && child.props.onHide();
        onHidden = child.props.onHidden;
      }
    });
    // 渐变处理需要使用bootstrap的渐变组件
    if (this.props.fade && $.support.transition) {
      $(this.getDOMNode()).find(".in").one("bsTransitionEnd", function() {
        this.setState({
          activated: clickIndex, in: true
        }, callback);
      }.bind(this)).emulateTransitionEnd(150);

      this.setState({
        in: false
      });
    } else {
      this.setState({
        activated: clickIndex
      }, callback);
    }

    event.preventDefault();
  }
  render() {
    return (
      <div className={this.props.className}>
        <ul className="nav nav-tabs">
          {React.Children.map(this.props.children, function (child, index) {
            var boundClick = this.toggleActive.bind(this, index); return (
              <li className={classnames({active: index === this.state.activated})} key={index}>
                <a href={child.props.link || "#"} onClick={boundClick}>
                  { child.props.ico ? (
                    <i className={classnames("ace-icon",child.props.ico)}/>
                  ): null }
                  {child.props.tab || "未命名"}
                </a>
              </li>
            );
          }, this)}
        </ul>
        <div className="tab-content">
          { this.props.lazy ? (
            <div className="tab-pane active">{this.props.children[this.state.activated]}</div>
          ) : ( React.Children.map(this.props.children, function (child, index) { return (
            <div className={
              classnames("tab-pane",{
                fade: this.props.fade,
                active:index === this.state.activated,
                in: this.props.fade && index === this.state.activated && this.state.in
              })
            }>{child}</div>
          ); }, this))}
        </div>
      </div>
    );
  }
};
