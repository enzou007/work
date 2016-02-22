var React = require('react');
var Mock = require("mockjs");
var PropTypes = React.PropTypes;
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  FileUp = require("Component/form/FileUp.jsx");
   require("rctui/input");
   require("rctui/datetime");
   require("rctui/select");
   require('Component/form/Radio.jsx');
   var cqdata = ["第一季度","第二季度","第三季度","第四季度"];
   var cmdata =["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
   var jhtype = ["跟进中","丢单","中止","已成交"];
   var NoteForm = React.createClass({
    getInitialState: function() {
      return {
        readonly: false,
      };
    },
    onLoad: function(){

    },
    componentDidMount: function() {

    },
    getDefaultProps: function() {
      return {

      };
    },
    onCreate: function () {
      this.props.action.setField({
        AgentPsn: this.props.session.get("name"),
        CreateDate: "2015-07-21"
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
            <FormControl label="机会编号" name="OPP_ID" type="text"  responsive={{xl: 12}}/>
            <FormControl label="机会名称" name="OPP_NAME" type="text" responsive={{xl: 12}}/>
            <FormControl label="客户编号" name="CUST_ID" type="text" responsive={{xl: 12}}/>
            <FormControl label="客户名称" name="CUST_NAME" type="text"   responsive={{xl: 12}}/>
            <FormControl label="目标产品" name="PRT_NAME" type="text"  responsive={{xl: 12}}/>
            <FormControl label="预计金额" name="OPP_AMT" type="number"   responsive={{xl: 12}}/>
            <FormControl label="估计签约年度" name="ES_YEAR" type="number"   responsive={{xl: 12}}/>
            <FormControl label="估计签约季度" name="ES_QUARTER" type="select" data={cqdata} responsive={{xl: 12}}/>
            <FormControl label="估计签约月份" name="ES_MONTH" type="select" data ={cmdata} responsive={{xl: 12}}/>
            <FormControl label="客户资质" name="CUST_QUALIFY" type="text"  responsive={{xl: 12}}/>
            <FormControl label="合同日期" name="CONTRACT_DATE" type="date"   responsive={{xl: 12}}/>
            <FormControl label="状态" name="OPP_ST" type="select" data={jhtype}  responsive={{xl: 12}}/>
            <FormControl label="丢单/中止原因" name="L_REASON" type="text"   responsive={{xl: 24}}/>
            <FormControl label="竞品信息" name="C_PRODUCTS" type="text"   responsive={{xl: 24}}/>
            <FormControl label="客户已提交的材料" name="MATERIAL" type="text" responsive={{xl: 24}}/>
            <FormControl label="附件"  name="MATERIAL_P" type="file"   responsive={{xl: 24}}/>

          </div>
      </FlowForm>
    );
  }

});

module.exports = NoteForm;
