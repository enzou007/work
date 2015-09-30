var React = require("react");
var Mock = require("mockjs");

var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx");

require("rctui/input");
require("rctui/radioGroup");
require("rctui/select");
require("rctui/datetime");
require("Component/form/Department.jsx");

var SingleSided = ["单面","双面"];
var Urgent = ["是","否"];

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
      AgentDept: ["N10010222103"],
      DeptName: ["N10010222103"]
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
            {/*<FormControl label="是否加急" name="Urgent" type="select" value="否" data={Urgent}/>
            <FormControl label="单双面" name="SingleSided" type="radio-group" data={SingleSided}/>*/}
            <FormControl label="数量(盒)" name="Number" type="number"/>
          </Fieldset>
          <Fieldset title="名片信息" readOnly={this.state.readonly}>
            <FormControl label="部门名称" name="DeptName" type="department" required={true}  responsive={{xl: 12}}/>
            <FormControl label="职务" name="Post" type="text" required={true}  responsive={{xl: 12}}/>
            <FormControl label="电话1" name="Tel1" type="text" required={true}  responsive={{xl: 12}}/>
            <FormControl label="电话2" name="Tel2" type="text" responsive={{xl: 12}}/>
            <FormControl label="传真1" name="Fax1" type="text" required={true}  responsive={{xl: 12}}/>
            <FormControl label="传真2" name="Fax2" type="text" responsive={{xl: 12}}/>
            <FormControl label="手机1" name="Phone1" type="text" required={true}  responsive={{xl: 12}}/>
            <FormControl label="手机2" name="Phone2" type="text" responsive={{xl: 12}}/>
            <FormControl label="Email1" name="Email1" type="text" required={true}  responsive={{xl: 12}}/>
            <FormControl label="Email2" name="Email2" type="text" responsive={{xl: 12}}/>
            <FormControl label="邮编" name="ZipCode" type="text" required={true}  responsive={{xl: 12}}/>
            <FormControl label="地址" name="Address" type="text" required={true}  responsive={{xl: 12}}/>
            <FormControl label="网址" name="Weburl" type="text" required={true}  responsive={{xl: 12}}/>
            <FormControl label="备注" name="Reason" type="textarea" responsive={{xl: 24}}/>
          </Fieldset>
        </div>
      </FlowForm>
    );
  }
});

module.exports = NoteForm;
