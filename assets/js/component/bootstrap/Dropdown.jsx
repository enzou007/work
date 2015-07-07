var React = require("react"),
    $ = require("jquery"),
    CSSTransitionGroup = require("../react/CSSTransitionGroup/CSSTransitionGroup.js");

var Dropdown = React.createClass({
    getInitialState: function () {
        return {
            show: false
        };
    },
    propTypes: {
        type: React.PropTypes.string,
        icon: React.PropTypes.string,
        children: React.PropTypes.node.isRequired
    },
    getDefaultProps: function () {
        return {
            type: "button",  //input OR button
            icon: "fa fa-circle"
        };
    },
    
    componentDidMount: function () {
        $(document).on("click.dropdown",function(){
            this.setState({
                show: false
            });  
        }.bind(this));
        $(document).on("click.dropdown", ".dropdown > .dropdown-menu", function(e) {
            e.stopPropagation();
        });
        $(document).on("click.dropdown", ".dropdown > i", function(e) {
            e.stopPropagation();
        });
    },
    toggleShow: function(e) {
        e.preventDefault();
        this.setState({
            show: !this.state.show
        });        
    },
    componentWillUnmount: function(){
        $(document).off("click.dropdown");
    },
    render: function () {
    
        return (
            <span className={"dropdown block input-icon input-icon-right" + (this.state.show ? " open" : "")}>
                <input className={this.props.className}  type="text"/>
                
                <i className={this.props.icon} onClick={this.toggleShow}></i>
                
                    {this.props.children}
            </span>
        );
    }
    
});

module.exports = Dropdown;
