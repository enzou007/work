var React = require('react');
var Mock = require("mockjs");
var PropTypes = React.PropTypes;
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx");
   require("rctui/input");
   require("rctui/datetime");
   require("rctui/select");
   var timedata = ["年","半年","季度","月","周"];
   var NoteForm = React.createClass({
    getInitialState: function() {
      return {
        readonly: false,
        //showKH : false
      };
    },
    onLoad: function(){
      //if(his.props.action.getField("KHNum").value !== ""){
      //  this.setState({
      //    showKH : true
      //  })
      //}
    },
    componentDidMount: function() {

    },
    componentWillReceiveProps: function(newProps){

    },
    getDefaultProps: function() {

    },
    onCreate: function () {
      this.props.action.setField({
        AgentPsn: this.props.session.get("name"),
        CreateDate: "2015-12-24",
      });
    },
    beforeSubmit: function () {
      // if(this.props.action.getField("Birthday").value === ""){
      //   return false;
      // }else{
      //   return true;
      // }
    },
    afterSubmit: function () {
    },
  render: function() {
    return (
      <FlowForm  onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
        <div className="form-content" tab="基本信息">
          <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
          <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
          <FormControl label="版本号" name="V_NUMBER" type="text" responsive={{xl: 12}}/>
          <FormControl label="时间维度" name="Tdimension" type="select" data={timedata}  responsive={{xl: 12}}/>
          <FormControl label="公司整体" name="company" type="text" responsive={{xl: 12}}/>
          <FormControl label="分公司/总部" name="fcompany" type="text" responsive={{xl: 12}}/>
          <FormControl label="部门" name="dept" type="text" responsive={{xl: 12}}/>
          <FormControl label="团队" name="team" type="text" responsive={{xl: 12}}/>
          <FormControl label="业务员" name="Salesman" type="text"    responsive={{xl: 12}}/>
          <FormControl label="目标创利" name="Profit" type="number"   responsive={{xl: 12}}/>
          <FormControl label="考核创利" name="Assess" type="number"   responsive={{xl: 12}}/>
          <FormControl label="新增有效潜客" name="pcustomer" type="number"    responsive={{xl: 12}}/>
          <FormControl label="新增成交笔数" name="ccustomer" type="number"    responsive={{xl: 12}}/>
          <FormControl label="成交规模" name="deal" type="number"   responsive={{xl: 12}}/>
          <FormControl label="潜客转化比" name="cratio" type="number"   responsive={{xl: 12}}/>
        </div>
      </FlowForm>
    );
  }

});

module.exports = NoteForm;
