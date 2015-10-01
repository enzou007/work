var React = require("react");
var Mock = require("mockjs");

var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx");

require("rctui/input");
require("rctui/select");
require("rctui/datetime");
require("Component/form/Department.jsx");

var LeaveType = ["事假","探亲假","病假","年假","其他"];

var NoteForm = React.createClass({

  getInitialState: function() {
    return {
      readonly: false
    };
  },
  onCreate: function () {
    this.props.action.setField({
      AppPsnCn: this.props.session.get("name"),
      CreateDate: Mock.Random.now("yyyy-MM-dd"),
      AgentDept: ["N10010222103"]
    });
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
  render: function () {
    return (
      <FlowForm onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}>
        <div className="form-content" tab="基本信息">
          <Fieldset title="基本信息" readOnly={this.state.readonly}>
            <FormControl label="申请人" name="AppPsnCn" type="text" readOnly={true}/>
            <FormControl label="申请日期" name="CreateDate" type="text" readOnly={true}/>
            <FormControl label="所属部门" name="AgentDept" type="department" readOnly={true}/>

            <FormControl label="假别" name="LeaveType" type="select" data={LeaveType}  required={true}/>
            <FormControl label="开始时间" name="StartDate" type="datetime" required={true}/>
            <FormControl label="结束时间" name="EndDate" type="datetime" required={true}/>
            <FormControl label="时长" name="DateLength" type="number" required={true}/>
            <FormControl label="事由" name="Reason" type="textarea" required={true} responsive={{xl: 24}}/>
          </Fieldset>
        </div>
      </FlowForm>
    );
  }
});

module.exports = NoteForm;
