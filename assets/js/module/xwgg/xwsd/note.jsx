var React = require("react"),
  _ = require("underscore");

var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  Personnel = require("Component/form/Personnel.jsx"),
  Department = require("Component/form/Department.jsx");

var Input = require("rctui/input");
var Select = require("rctui/select");
var DateTime = require("rctui/datetime");

var SexData = ["男","女"];

var NoteForm = React.createClass({
  onCreate: function () {
    this.props.channel.update({
      AppPsnCn: this.props.session.get("name"),
      StDate: "2015-07-21",
      StLeader: ["5582272444ae2b5937e53911"]
    });
  },
  beforeSubmit: function () {

  },
  afterSubmit: function () {

  },
  render: function () {
    return (
      <FlowForm onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}>
        <Tabs>
          <div className="form-content" tab="基本信息">
            <Fieldset title="Form表单">
              <FormControl label="申请人" name="AppPsnCn" type="text" readOnly={true}/>
              <FormControl label="申请日期" name="StDate" type="date"/>
              <FormControl label="性别" name="StSex" type="select" data={SexData}/>
              <FormControl label="年龄" name="StAge" type="number"/>
              <FormControl label="部门领导" name="StLeader" type="personnel" />
              <FormControl label="所属部门" name="StDept" type="department"/>
              <FormControl label="备注" name="Notes" type="textarea" responsive={{xl: 16}}/>
            </Fieldset>
          </div>

          <div className="form-content" tab="基本信息"></div>

        </Tabs>
      </FlowForm>
    );
  }
});

module.exports = NoteForm;
