var React = require("react"),
  _ = require("underscore");

var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  Personnel = require("Component/form/Personnel.jsx"),
  Department = require("Component/form/Department.jsx"),
  Grid = require("Component/form/Grid.jsx").Grid,
  Column = require("Component/form/Grid.jsx").Column;

var Input = require("rctui/input");
var Select = require("rctui/select");
var DateTime = require("rctui/datetime");

var SexData = ["男","女"];

var NoteForm = React.createClass({
  onCreate: function () {
    this.props.action.setField({
      AppPsnCn: this.props.session.get("name"),
      PubDate: "2015-07-21",
      StLeader: ["bneppmeerermeoerupenelne"]
    });
  },
  beforeSubmit: function () {
    return true;
  },
  afterSubmit: function () {

  },
  getGridForm: function () {
    return (
      <div>
        <FormControl label="名称" name="StSomeName" type="text"/>
        <FormControl label="类别" name="StSomeType" type="text"/>
      </div>
    );
  },
  render: function () {
    return (
      <FlowForm onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}>
        <div className="form-content" tab="基本信息">
          <Fieldset title="Form表单">
            <FormControl label="申请人" name="AppPsnCn" type="text" readOnly={true}/>
            <FormControl label="申请日期" name="PubDate" type="date"/>
            <FormControl label="性别" name="StSex" type="select" data={SexData}/>
            <FormControl label="年龄" name="StAge" type="number"/>
            <FormControl label="部门领导" name="StLeader" type="personnel" />
            <FormControl label="所属部门" name="StDept" type="department"/>
            <FormControl label="备注" name="Notes" type="textarea" responsive={{xl: 16}}/>
          </Fieldset>
          <Fieldset title="Form表格">
            <FormControl label="动态表格" name="StData" type="grid" responsive={{xl: 24}}>
              <Grid height={500} form={this.getGridForm()}>
                <Column label="名称" width={0.5} dataKey="StSomeName"/>
                <Column label="类别" width={0.5} dataKey="StSomeType"/>
              </Grid>
            </FormControl>
          </Fieldset>
        </div>
      </FlowForm>
    );
  }
});

module.exports = NoteForm;
