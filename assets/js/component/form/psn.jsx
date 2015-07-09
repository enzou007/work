"use strict";

var React = require("react"),
    Dropdown = require("../bootstrap/Dropdown.jsx");


var Psn = React.createClass({
    getInitialState: function () {
        return {
            show: false
        };
    },
    getDefaultProps: function () {

    },

    componentDidMount: function () {

    },
    toggleShow: function(e) {
        e.preventDefault();
        this.setState({
            show: !this.state.show
        });
    },
    render: function () {
        return (
            <Dropdown type="input" icon="fa fa-user bigger-130" className="width-100">
                <div className="dropdown-menu width-100" key="psn">
                    <div className="row">
                        <div className="col-xs-8" ref="PsnTree">

                        </div>
                        <div className="col-xs-4">

                        </div>
                    </div>
                </div>
            </Dropdown>
        );


    }

});

module.exports = Psn;
