var React = require('react');
var Mock = require("mockjs");
var PropTypes = React.PropTypes;
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx");
   require("rctui/input");
   require("rctui/datetime");
   require("rctui/select");
   require('Component/form/Radio.jsx');
   var sexdata = ["男","女"];
   var NoteForm = React.createClass({
    getInitialState: function() {
      return {
        readonly: false,
      };
    },
    onLoad: function(){
      //if(his.props.action.getField("khnum").value !== ""){
      //  this.setState({
      //    showKH : true
      //  })
      //}
    },
    componentDidMount: function() {

    },
    componentWillReceiveProps: function(newProps){
      if(newProps["form"].get("@CurNodeId") && newProps["form"].get("@CurNodeId") !== "StartNode"){
        this.setState({
          readonly: true
        })
      }
    },
    getDefaultProps: function() {
      return {

      };
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
            <FormControl label="客户编号" name="customernum" type="text" />
            <FormControl label="客户名称" name="customername" type="text" />
            <FormControl label="跟进人" name="followpsn" type="text"   />
            <FormControl label="跟进活动" name="fplan" type="text"/>
            <FormControl label="计划跟进时间" name="plantime" type="date"   />
            <FormControl label="实际跟进时间" name="actualtime" type="date"   />
            <FormControl label="外出申请审批状态" name="appstatus" type="text"   />
            <FormControl label="活动记录" name="planlog" type="textarea"  responsive={{xl: 24}}/>
          </div>
      </FlowForm>
    );
  }

});

module.exports = NoteForm;
