var React = require("react"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Dropdown = require("Component/bootstrap/Dropdown.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  Dept = require("Component/form/Dept.jsx");

var FlowForm = require("View/form/FlowForm.jsx");

var FormControl = require("Component/form/FormControl.jsx");
//var FormSubmit = require("rctui/FormSubmit");
var Input = require("rctui/Input");
var Select = require("rctui/Select");
var DateTime = require("rctui/Datetime");

var NoteForm = React.createClass({
  beforeSubmit: function () {
    console.log("beforeSubmit");
  },
  afterSubmit: function () {
    console.log("afterSubmit");
  },
  render: function () {
    return (
      <FlowForm onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}>
        <Tabs>
          <div className="form-content" tab="基本信息">
            <Fieldset title="Form表单">
              <FormControl className="col-sm-6" label="申 请 人" min={4} name="StPsn" type="text"/>
              <FormControl className="col-sm-6" label="申请日期" name="StDate" type="date"/>
              <FormControl className="col-sm-6" data={["男","女"]} label="性别" mult={false} name="StSex" type="select"/>
              <FormControl className="col-sm-6" label="年龄" name="StAge" type="number"/>
              <FormControl className="col-sm-12" filterAble={true} label="部门领导" mult={true} name="StLeader" src="/1/system/user/search" type="select"/>
              <FormControl className="col-sm-6" data={["1","2","3","4"]} filterAble={true} label="所属部门" mult={false} name="StDept" type="select"/>
            </Fieldset>
          </div>

          <div className="form-content" tab="基本信息"></div>

        </Tabs>
      </FlowForm>
    );
  }
});

module.exports = NoteForm;
