var React = require("react"),
    Dropdown = require("../bootstrap/Dropdown.jsx");

var Dept = React.createClass({
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
            <Dropdown type="input" icon="fa fa-sitemap" className="width-100">
                <div className="dropdown-menu width-100" >
                    Dept<br/><br/><br/><br/><br/><br/><br/><br/>
                </div>
            </Dropdown>
        );


    }
    
});

module.exports = Dept;
