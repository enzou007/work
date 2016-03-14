var React = require('react');
var Mock = require("mockjs");
var PropTypes = React.PropTypes;
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  FileUp = require("Component/form/FileUp.jsx");
   require("rctui/input");
   require("rctui/datetime");
   require("rctui/select");
   var NoteForm = React.createClass({
    getInitialState: function() {
      return {
        readonly: false
      };
    },
    onLoad: function(){

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
        AgentPsn: this.props.session.get("name"),
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
            <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
            <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="机会编号" name="JHNum" type="text"  responsive={{xl: 12}}/>
            <FormControl label="机会名称" name="JHName" type="text"  responsive={{xl: 12}}/>
            <FormControl label="客户编号" name="KHNum" type="text" responsive={{xl: 12}}/>
            <FormControl label="客户名称" name="KHname" type="text"   responsive={{xl: 12}}/>
            <FormControl label="跟进人" name="propsn" type="text"    responsive={{xl: 12}}/>
            <FormControl label="跟进时间" name="protime" type="date"  responsive={{xl: 12}}/>
            <FormControl label="跟进活动记录" name="programlog" type="textarea"   responsive={{xl: 24}}/>
            <FormControl label="附件"  name="programlogfile" type="file"   responsive={{xl: 24}}/>
      </div>
      </FlowForm>
    );
  }

});

module.exports = NoteForm;
