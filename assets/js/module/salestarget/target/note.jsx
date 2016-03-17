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
        AppPsnCn: this.props.session.get("name"),
        CreateDate: Mock.Random.now("yyyy-MM-dd")
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
          <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true} />
          <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true}/>
          <FormControl label="版本号" name="v_number" type="text"/>
          <FormControl label="时间维度" name="tdimension" type="select" data={timedata} />
          <FormControl label="公司整体" name="company" type="text"/>
          <FormControl label="分公司/总部" name="fcompany" type="text"/>
          <FormControl label="部门" name="dept" type="text"/>
          <FormControl label="团队" name="team" type="text"/>
          <FormControl label="业务员" name="salesman" type="text"   />
          <FormControl label="目标创利" name="profit" type="number"  />
          <FormControl label="考核创利" name="assess" type="number"  />
          <FormControl label="新增有效潜客" name="pcustomer" type="number"   />
          <FormControl label="新增成交笔数" name="ccustomer" type="number"   />
          <FormControl label="成交规模" name="deal" type="number"  />
          <FormControl label="潜客转化比" name="cratio" type="number"  />
        </div>
      </FlowForm>
    );
  }

});

module.exports = NoteForm;
