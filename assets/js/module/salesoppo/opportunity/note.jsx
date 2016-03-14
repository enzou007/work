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
            <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
            <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="机会编号" name="opp_id" type="text"  responsive={{xl: 12}}/>
            <FormControl label="机会名称" name="opp_name" type="text" responsive={{xl: 12}}/>
            <FormControl label="客户编号" name="cust_id" type="text" responsive={{xl: 12}}/>
            <FormControl label="客户名称" name="cust_name" type="text"   responsive={{xl: 12}}/>
            <FormControl label="目标产品" name="prt_name" type="text"  responsive={{xl: 12}}/>
            <FormControl label="预计金额" name="opp_amt" type="number"   responsive={{xl: 12}}/>
            <FormControl label="估计签约年度" name="es_year" type="number"   responsive={{xl: 12}}/>
            <FormControl label="估计签约季度" name="es_quarter" type="select" data={cqdata} responsive={{xl: 12}}/>
            <FormControl label="估计签约月份" name="es_month" type="select" data ={cmdata} responsive={{xl: 12}}/>
            <FormControl label="客户资质" name="cust_qualify" type="text"  responsive={{xl: 12}}/>
            <FormControl label="合同日期" name="contract_date" type="date"   responsive={{xl: 12}}/>
            <FormControl label="状态" name="opp_st" type="select" data={jhtype}  responsive={{xl: 12}}/>
            <FormControl label="丢单/中止原因" name="l_reason" type="text"   responsive={{xl: 24}}/>
            <FormControl label="竞品信息" name="c_products" type="text"   responsive={{xl: 24}}/>
            <FormControl label="客户已提交的材料" name="material" type="text" responsive={{xl: 24}}/>
            <FormControl label="附件"  name="material_p" type="file"   responsive={{xl: 24}}/>

          </div>
      </FlowForm>
    );
  }

});

module.exports = NoteForm;
