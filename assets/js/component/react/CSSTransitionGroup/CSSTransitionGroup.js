"use strict";

var React = require("react"),
    _ = require("underscore");

var ReactTransitionGroup = React.createFactory(
    require("react/lib/ReactTransitionGroup")
);

var CSSTransitionGroupChild = React.createFactory(
    require("./CSSTransitionGroupChild")
);

var CSSTransitionGroup = React.createClass({
    displayName: 'CSSTransitionGroup',

    propTypes: {
        transitionName: React.PropTypes.string.isRequired,
        transitionEnter: React.PropTypes.bool,
        transitionLeave: React.PropTypes.bool,
        overTime: React.PropTypes.number
    },

    getDefaultProps: function () {
        return {
            transitionEnter: true,
            transitionLeave: true,
            overTime: 500
        };
    },

    _wrapChild: function (child) {
        // We need to provide this childFactory so that
        // CSSTransitionGroupChild can receive updates to name, enter, and
        // leave while it is leaving.
        return CSSTransitionGroupChild(
            {
                name: this.props.transitionName,
                enter: this.props.transitionEnter,
                leave: this.props.transitionLeave,
                overTime: this.props.overTime
            },
            child
        );
    },

    render: function () {
        return (
            ReactTransitionGroup(
                _.extend({}, this.props, {childFactory: this._wrapChild})
            )
        );
    }
});

module.exports = CSSTransitionGroup;