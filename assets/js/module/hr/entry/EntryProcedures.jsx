var React = require("react"),
  _ = require("underscore");

var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  Personnel = require("Component/form/Personnel.jsx"),
  Department = require("Component/form/Department.jsx"),
  FileUp = require("Component/form/FileUp.jsx"),
  RichText = require("Component/form/RichText.jsx");

var Input = require("rctui/input");
var Select = require("rctui/select");
var DateTime = require("rctui/datetime");

var SexData = ["男","女"];
var LevelData = ["A","B","C","D","E","F"];
var EmployData = ["社会招聘","人才市场","互联网络","内部招聘","人才推荐","校园招聘","外编转正","离职再入职","其他"];
var MarriageData = ["未婚","已婚","离异"];

var NoteForm = React.createClass({
  getInitialState: function() {
    return {
      readonly: false
    };
  },
  onCreate: function () {
    this.props.action.setField({
      AgentPsn: this.props.session.get("name"),
      CreateDate: "2015-07-21"
    });
  },
  beforeSubmit: function () {
    if(this.props.action.getField("Birthday").value === ""){
      return false;
    }else{
      return true;
    }
  },
  afterSubmit: function () {

  },
  render: function () {
    return (
      <FlowForm onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit} readonly={this.state.readonly}>
        <div className="form-content" tab="基本信息">
          <Fieldset title="基本信息">
            <FormControl label="代办人" name="AgentPsn" type="text" readOnly={true}/>
            <FormControl label="申请日期" name="CreateDate" type="date" readOnly={true}/>
            <FormControl label="所属部门" name="AgentDept" type="text" readOnly={true}/>

            <FormControl label="姓名" name="AppPsnCn" type="text" required={true}/>
            <FormControl label="性别" name="Sex" type="select" data={SexData} required={true} tip="请选择性别"/>
            <FormControl label="年龄" name="Age" type="number" required={true}/>
            <FormControl label="出生日期" name="Birthday" type="date" required={true}/>
            <FormControl label="身份证号" name="CardNumber" type="text" required={true} tip="请填写姓名"/>
            <FormControl label="婚姻状况" name="Marriage" type="select" data={MarriageData}/>
            <FormControl label="学历" name="Degrees" type="text"/>
            <FormControl label="户籍" name="Hukou" type="text"/>
            <FormControl label="联系电话" name="Phone" type="text"/>
          </Fieldset>

          <Fieldset>
            <FormControl label="员工工号" name="AppPsnNumber" type="text"/>
            <FormControl label="入职部门" name="EntryDept" type="department" required={true}/>
            <FormControl label="部门负责人" name="DeptLeader" type="personnel"/>
            <FormControl label="职位" name="Post" type="text"/>
            <FormControl label="级别" name="Level" type="select" data={LevelData}/>
            <FormControl label="聘用类型" name="EmployType" type="select" data={EmployData}/>
            <FormControl label="报到日期" name="ReportDate" type="date"/>
            <FormControl label="入职日期" name="EntryDate" type="date"/>
          </Fieldset>

          <Fieldset title="IT信息">
            <FormControl label="公司座机" name="ComTel" type="text" responsive={{xl: 12}}/>
            <FormControl label="公司邮箱" name="ComEmail" type="email" responsive={{xl: 12}}/>
          </Fieldset>

          <Fieldset title="附件">
            <FormControl label="附件" name="fileTest" type="file" responsive={{xl: 24}}/>
          </Fieldset>

          <Fieldset title="文本编辑器">
            <FormControl name="RichText_Test" type="richtext" responsive={{xl: 24}}/>
          </Fieldset>
        </div>
      </FlowForm>
    );
  }
});

module.exports = NoteForm;
