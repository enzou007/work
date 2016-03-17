var React = require('react');
import _ from 'underscore';
//require("Component/form/Select.jsx");
var FormControl = require("Component/form/FormControl.jsx");
var PropTypes = React.PropTypes;
var InputDate = React.createClass({
  onKeyDown: function(event) {
    var k = event.keyCode;
    //48-57是大键盘的数字键，96-105是小键盘的数字键，8是退格符←
    if ((k <= 57 && k >= 48) || (k <= 105 && k >= 96) || (k == 8) || (k == 190) || (k == 173)) {
      return true;
    } else {
      return false;
    }
  },
  render: function() {
    return (
        <div >
        <input style={{width:"70%",imeMode:"disabled" }} onKeyDown={this.onKeyDown} />
         <select style={{width:"30%",padding: "0 0"}}>
           <option value ="年">年</option>
           <option value ="月">月</option>
           <option value="日">日</option>
         </select>
      </div>);
  }
});
FormControl.register('inputdate', function(props) {
  return <InputDate {...props}/>
}, InputDate, 'string');

module.exports = InputDate;
