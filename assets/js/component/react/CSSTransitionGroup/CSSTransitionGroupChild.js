/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * @providesModule ReactCSSTransitionGroupChild
 */

"use strict";

var React = require("react");

var $ = require("jquery");
require("bootstrap/js/transition");

// We don't remove the element from the DOM until we receive an animationend or
// transitionend event. If the user screws up and forgets to add an animation
// their node will be stuck in the DOM forever, so we detect if an animation
// does not start and if it doesn't, we just call the end listener immediately.
var TICK = 17;

var CSSTransitionGroupChild = React.createClass({
    displayName: 'CSSTransitionGroupChild',

    transition: function (animationType, finishCallback) {
        var $node = $(this.getDOMNode());
        var className = this.props.name + '-' + animationType;
        var activeClassName = className + '-active';

        var endListener = function (e) {
            if (e && e.target !== $node[0]) {
                return;
            }

            $node.removeClass(className);
            $node.removeClass(activeClassName);

            $node.off("bsTransitionEnd", endListener);

            // Usually this optional callback is used for informing an owner of
            // a leave animation and telling it to remove the child.
            // 这里有在回调结束前整个Component已经被替换的现象，导致componentDidLeave无法找到而报错
            // 目前通过强制捕捉输出处理
            try {
                finishCallback && finishCallback();
            } catch (e) {
                if (e.name !== "TypeError") {
                    console.log(e);
                }
            }
        };

        $node.on("bsTransitionEnd", endListener).emulateTransitionEnd(this.props.overTime);
        $node.addClass(className);

        // Need to do this to actually trigger a transition.
        this.queueClass(activeClassName);
    },

    queueClass: function (className) {
        this.classNameQueue.push(className);

        if (!this.timeout) {
            this.timeout = setTimeout(this.flushClassNameQueue, TICK);
        }
    },

    flushClassNameQueue: function () {
        if (this.isMounted()) {
            this.classNameQueue.forEach(function (className) {
                $(this).addClass(className);
            }.bind(this.getDOMNode()));
            //CSSCore.addClass.bind(CSSCore, this.getDOMNode())
        }
        this.classNameQueue.length = 0;
        this.timeout = null;
    },

    componentWillMount: function () {
        this.classNameQueue = [];
    },

    componentWillUnmount: function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    },

    componentWillEnter: function (done) {
        if (this.props.enter) {
            this.transition('enter', done);
        } else {
            done();
        }
    },

    componentWillLeave: function (done) {
        if (this.props.leave) {
            this.transition('leave', done);
        } else {
            done();
        }
    },

    render: function () {
        return React.Children.only(this.props.children);
    }
});

module.exports = CSSTransitionGroupChild;
