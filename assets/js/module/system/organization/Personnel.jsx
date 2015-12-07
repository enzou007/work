var React = require("react");
var Mock = require("mockjs");
var util = require('../../../util/Strings');

var DataForm = require("View/form/DataForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx");
require("Component/form/Radio.jsx");
require("Component/form/Checkbox.jsx");
require("Component/form/Department.jsx");
require("rctui/input");
require("rctui/select");
require("rctui/datetime");


var PersonnelForm = React.createClass({
  onCreate (){
    let param = util.urlParamToObject(location.search.substring(1));
    if (param.parent){
      this.props.action.setField("departmentId", [param.parent])
    }
  },
  render (){
    return (
      <DataForm title="人员信息" onCreate={this.onCreate.bind(this)}>
        <div className="form-content" tab="基本信息">
          <Fieldset title="基本信息">
            <FormControl label="员工编号" name="id" type="text"/>
            <FormControl label="员工姓名" name="name" type="text"/>
            <FormControl label="所属部门" name="departmentId" type="department"/>
            <FormControl label="简称" name="shortName" type="text"/>
          </Fieldset>
        </div>
      </DataForm>
    );
  }
});

module.exports = PersonnelForm;
