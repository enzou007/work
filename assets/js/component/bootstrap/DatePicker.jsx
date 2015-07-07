var React = require("react"),
    Dropdown = require("./Dropdown.jsx");


var DatePicker = React.createClass({
    
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
/*
    render: function () {
        return (        
            <Dropdown type="input" icon="fa fa-calendar" className="width-100">
                <div className="dropdown-menu width-100" key="date">
                    Date<br/><br/><br/><br/><br/><br/><br/><br/>
                </div>
            </Dropdown>
        );
    }
*/
   render: function () {
        return (        
            <div className="input-group">
                <input className="form-control date-picker" id="id-date-picker-1" data-date-format="dd-mm-yyyy" type="text"/>
                <span className="input-group-addon">
                    <i className="fa fa-calendar"></i>
                </span>
            </div>
        );
    } 
});

module.exports = DatePicker;
