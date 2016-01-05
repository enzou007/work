var React = require("react"),
  _ = require("underscore");

var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  Personnel = require("Component/form/Personnel.jsx"),
  Department = require("Component/form/Department.jsx"),
  FileUp = require("Component/form/FileUp.jsx"),
  Ueditor = require("Component/form/Ueditor.jsx");

var Input = require("rctui/input");
var Select = require("rctui/select");
var DateTime = require("rctui/datetime");

var SexData = ["男","女"];
var LevelData = ["A","B","C","D","E","F"];
var EmployData = ["社会招聘","人才市场","互联网络","内部招聘","人才推荐","校园招聘","外编转正","离职再入职","其他"];
var MarriageData = ["未婚","已婚","离异"];

var AttOptions = {
  accept: [
    {
      title: 'Images',
      extensions: 'gif,jpg,jpeg,bmp',
      mimeTypes: 'image/*'
    }
  ]
}

var NoteForm = React.createClass({
  getInitialState: function() {
    return {
      readonly: false
    };
  },
  componentWillReceiveProps: function(newProps){
    if(newProps["form"].get("@curNodeId") && newProps["form"].get("@curNodeId") !== "Start"){
      this.setState({
        readonly: true
      })
    }
  },
  onCreate: function () {
    this.props.action.setField({
      AgentPsn: this.props.session.get("name"),
      CreateDate: "2015-07-21"
    });
  },
  onLoad: function(){

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
            <FormControl label="代办人" name="AgentPsn" type="text" readOnly={true}/>
            <FormControl label="申请日期" name="CreateDate" type="date" readOnly={true}/>
            <FormControl label="所属部门" name="AgentDept" type="text" readOnly={true}/>

            <FormControl label="姓名" name="AppPsnCn" type="text" required={false}/>
            <FormControl label="性别" name="Sex" type="select" data={SexData} required={false} tip="请选择性别"/>
            <FormControl label="年龄" name="Age" type="number" required={false}/>
            <FormControl label="出生日期" name="Birthday" type="date" required={false}/>
            <FormControl label="身份证号" name="CardNumber" type="text" required={false} tip="请填写姓名"/>
            <FormControl label="婚姻状况" name="Marriage" type="select" data={MarriageData}/>
            <FormControl label="学历" name="Degrees" type="text"/>
            <FormControl label="户籍" name="Hukou" type="text"/>
            <FormControl label="联系电话" name="Phone" type="text"/>
          </Fieldset>

          <Fieldset readOnly={this.state.readonly}>
            <FormControl label="员工工号" name="AppPsnNumber" type="text"/>
            <FormControl label="入职部门" name="EntryDept" type="department" required={false}/>
            <FormControl label="部门负责人" name="DeptLeader" type="personnel"/>
            <FormControl label="职位" name="Post" type="text"/>
            <FormControl label="级别" name="Level" type="select" data={LevelData}/>
            <FormControl label="聘用类型" name="EmployType" type="select" data={EmployData}/>
            <FormControl label="报到日期" name="ReportDate" type="date"/>
            <FormControl label="入职日期" name="EntryDate" type="date"/>
          </Fieldset>

          <Fieldset title="IT信息" readOnly={this.state.readonly}>
            <FormControl label="公司座机" name="ComTel" type="text" responsive={{xl: 12}}/>
            <FormControl label="公司邮箱" name="ComEmail" type="email" responsive={{xl: 12}}/>
              <FormControl label="部门负责人" name="DeptLeaderss" type="personnel" mult={true} responsive={{xl: 24}}/>  
          </Fieldset>

        </div>
        <div className="form-content" tab="附件">

          <FormControl label="附件" options={AttOptions} name="fileTest" type="file" readOnly={this.state.readonly} responsive={{xl: 24}}/>
        </div>
        <div className="form-content" tab="正文">
          <FormControl name="RichText_Test" type="ueditor" readOnly={this.state.readonly} responsive={{xl: 24}}/>
        </div>
      </FlowForm>
    );
  }
});

module.exports = NoteForm;
