var React = require("react");
var Mock = require("mockjs");

var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx");
require("Component/form/Radio.jsx");
require("Component/form/Checkbox.jsx");

require("rctui/input");
require("rctui/select");
require("rctui/datetime");

var LeaveType = ["事假","探亲假","病假","年假","其他"];

var NoteForm = React.createClass({

  getInitialState: function() {
    return {
      readonly: false
    };
  },
  onCreate: function () {
    // this.props.action.setField({
    //   AppPsnCn: this.props.session.get("name"),
    //   CreateDate: Mock.Random.now("yyyy-MM-dd")
    // });
  },
  componentWillReceiveProps: function(newProps){
    if(newProps["form"].get("@CurNodeId") && newProps["form"].get("@CurNodeId") !== "StartNode"){
      this.setState({
        readonly: true
      })
    }
  },
  beforeSubmit: function () {

  },
  afterSubmit: function () {

  },
  radioChange: function(arg1) {
      console.log("radioChange");
    console.log("---"+arg1);
  },
  checkboxChange: function(arg1) {
    console.log("checkboxChange");
    console.log("---"+arg1);
  },
  render: function () {
    return (
      <FlowForm onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}>
        <div className="form-content" tab="基本信息">
          <Fieldset title="基本信息" readOnly={this.state.readonly}>
            <FormControl label="申请人" name="AppPsnCn" type="radio-group" data={LeaveType} onChange={this.radioChange} value="病假"/>
            <FormControl label="申请人11" name="AppPsnEn" type="checkbox-group" onChange={this.checkboxChange} data={LeaveType} value="其他,病假"/>
            <FormControl label="学历" name="Degrees" type="text"/>
            <FormControl label="户籍" name="Hukou" type="text"/>

          </Fieldset>
        </div>
      </FlowForm>
    );
  }
});

module.exports = NoteForm;
