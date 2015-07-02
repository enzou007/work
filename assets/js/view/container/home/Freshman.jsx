"use strict";

var React = require("react");

var Freshman = React.createClass({
    render: function () {
        return (
            <div className="widget-box freshman-box">
                <h2><a href="#">新人风采</a></h2>
                <div>
                    <div>
                        <h4>张萌</h4>

                        <p className="info">财务中心<br/>质检专员</p>

                        <p>个人感言：<br/>大家好，我叫张萌， 在财务中心担任质检专员......</p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Freshman;