var React = require('react');
import _ from 'underscore';
var FormControl = require("Component/form/FormControl.jsx");
var PropTypes = React.PropTypes;
var  InputTwo = React.createClass({
  onKeyDown: function(event) {
    var k = event.keyCode;
    //48-57是大键盘的数字键，96-105是小键盘的数字键，8是退格符←
    if ((k <= 57 && k >= 48) || (k <= 105 && k >= 96) || (k == 8) || (k == 190)) {
      return true;
    } else {
      return false;
    }
  },
  render: function() {
    return (
      <div>
        <input style={{width:"45%",imeMode:"disabled" }} onKeyDown={this.onKeyDown} />至<input style={{width:"45%",imeMode:"disabled" }} onKeyDown={this.onKeyDown} />
      </div>
    );
  }

});
FormControl.register('inputtwo', function (props) {
  return <InputTwo {...props}/>
}, InputTwo, 'string');
module.exports = InputTwo;
