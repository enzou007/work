var React = require("react"),
  _ = require("underscore");

var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  Dept = require("Component/form/Dept.jsx");

var Input = require("rctui/Input");
var Select = require("rctui/Select");
var DateTime = require("rctui/Datetime");

var NoteForm = React.createClass({
  onCreate: function (store) {
    this.props.channel.update({
      AppPsnCn: this.props.session.get("name"),
      StDate: "2015-07-21"
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
              <FormControl label="申请日期" name="StDate" type="date" readOnly={true}/>
              <FormControl data={["男","女"]} label="性别" mult={false} name="StSex" type="select"/>
              <FormControl label="年龄" name="StAge" type="number"/>
              <FormControl label="部门领导" filterAble={true} mult={true} name="StLeader" src="/1/system/user/search" type="select"/>
              <FormControl label="所属部门" data={["1","2","3","4"]} filterAble={true} mult={false} name="StDept" type="select"/>
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
