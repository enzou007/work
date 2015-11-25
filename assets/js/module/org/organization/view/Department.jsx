var React = require("react");
var Mock = require("mockjs");

var DataForm = require("View/form/DataForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx");
require("Component/form/Radio.jsx");
require("Component/form/Checkbox.jsx");

require("rctui/input");
require("rctui/select");
require("rctui/datetime");


var DepartmentForm = React.createClass({

  render: function () {
    return (
      <DataForm title="部门信息">
        <div className="form-content" tab="基本信息">
          <Fieldset title="基本信息">
            <FormControl label="部门编号" name="@objectId" type="text"/>
            <FormControl label="部门名称" name="name" type="text"/>
            <FormControl label="简称" name="shortName" type="text"/>
          </Fieldset>
        </div>
      </DataForm>
    );
  }
});

module.exports = DepartmentForm;
