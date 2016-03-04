var React = require('react'),
_ = require("underscore");;
var PropTypes = React.PropTypes;
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  FileUp = require("Component/form/FileUp.jsx");

  require("rctui/input");
  require("Component/form/Select.jsx");
  require("rctui/datetime");
  var Mock = require("mockjs");
  var CURRENCY = [{id:"01",text:"RMB"},{id:"14",text:"美元"}];
  var REDEMPTION_DATA =["可赎回","不可赎回"];
  var ADAPTATION_DATA =["可续存","不可续存"];
  var BONUS_DATA =["现金","份额"];
  var STRUCTURE_DATA =["结构形式","非结构形式"];
  var floatprodata =["指数型","股票型","新股型","港股新股","对冲基金","混合型","定增型"];
  var floatprodatavalue =["0.85","0.8","0.9","0.9","0.95","0.9","0.85"];
  var INVESTMENT_D_DATA =["房产","政信","工商企业","其他"];
  var INVESTMENT_F_DATA =["并购","定向增发","阳光私募","其他"];
  var pdtypedata =[];
var product = React.createClass({
  getInitialState: function() {
    return {
      readonly: false
    };
  },
  onCreate: function () {
      this.props.action.setField({
        AgentPsn: this.props.session.get("name"),
        CreateDate: "2015-07-21",
      });
    },
  beforeSubmit: function () {
    //this.props.action.setField({
    //  pdnum: Mock.Random.now()
    //});
    // if(this.props.action.getField("Birthday").value === ""){
    //   return false;
    // }else{
    //   return true;
    // }
  },
  afterSubmit: function () {

  },
  getreturn : function (e,d){
    this.props.action.setField({
    //  returncondition: floatprodatavalue[floatprodata.findIndex(x => x == e)]
    CURRENCY:d.text
    });
  },
  render: function() {
    return (
      <FlowForm   onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
          <div className="form-content" tab="基本信息">
            <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
            <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="产品编号" name="PRT_ID" type="text"  responsive={{xl: 12}}/>
            <FormControl label="产品类别" name="CLASS_ID" type="select" data={pdtypedata}  responsive={{xl: 12}}/>
            <FormControl label="产品名称" name="PRT_NAME" type="text"  responsive={{xl: 12}}/>
            <FormControl label="产品简称" name="PRT_SNAME" type="text"  responsive={{xl: 12}}/>
            <FormControl label="币种" name="CUR_NAME" type="select" data={CURRENCY} onChange={this.getreturn} responsive={{xl: 12}}/>
            <FormControl label="币种代码" name="CURRENCY" type="text" responsive={{xl: 12}}/>
            <FormControl label="融资方" name="FINANCIERS" type="text" responsive={{xl: 12}}/>
            <FormControl label="管理人" name="M_COMPANY" type="text"  responsive={{xl: 12}}/>
            <FormControl label="托管人" name="CUSTODIAN" type="text"  responsive={{xl: 12}}/>
            <FormControl label="产品规模" name="PRODUCT_S" type="number"  responsive={{xl: 12}}/>
            <FormControl label="产品期限（月）" name="PRODUCT_M" type="number"  responsive={{xl: 12}}/>
            <FormControl label="赎回方式" name="REDEMPTION_W" type="select" data={REDEMPTION_DATA} responsive={{xl: 12}}/>
            <FormControl label="赎回日" name="REDEMPTION_D" type="text"  responsive={{xl: 12}}/>
            <FormControl label="续存方式" name="ADAPTATION_C" type="select" data={ADAPTATION_DATA} responsive={{xl: 12}}/>
            <FormControl label="付息方式" name="P_INTEREST" type="text"  responsive={{xl: 12}}/>
            <FormControl label="投资领域(固)" name="INVESTMENT_F" type="select" data={INVESTMENT_D_DATA} responsive={{xl: 12}}/>
            <FormControl label="预期收益率" name="IN_RATE" type="number"  responsive={{xl: 12}}/>
            <FormControl label="续存期（月）" name="ADAPTATION_M" type="number"  responsive={{xl: 12}}/>
            <FormControl label="续存规模（万）" name="ADAPTATION_S" type="number"  responsive={{xl: 12}}/>
            <FormControl label="封闭期（月）" name="CLOSED_M" type="number"  responsive={{xl: 12}}/>
            <FormControl label="预警线" name="LINE_OF" type="number"  responsive={{xl: 12}}/>
            <FormControl label="止损线" name="STOP_L" type="number"  responsive={{xl: 12}}/>
            <FormControl label="分红方式" name="BONUS_S" type="select" data={BONUS_DATA}  responsive={{xl: 12}}/>
            <FormControl label="结构形式" name="STRUCTURE_F" type="select" data={STRUCTURE_DATA}  responsive={{xl: 12}}/>
            <FormControl label="结构形式说明" name="STRUCTURE_I" type="text"  responsive={{xl: 12}}/>
            <FormControl label="投资领域(浮)" name="INVESTMENT_F" type="select" data={INVESTMENT_F_DATA} responsive={{xl: 12}}/>
            <FormControl label="人数限制" name="NUMBER_L" type="number"  responsive={{xl: 12}}/>
            <FormControl label="开放日" name="OPEN_DAY" type="date"  responsive={{xl: 12}}/>
            <FormControl label="周期开放日" name="OPEN_W" type="text"  responsive={{xl: 12}}/>
            <FormControl label="特定开放日" name="OPEN_S" type="date"  responsive={{xl: 12}}/>
            <FormControl label="开放日备注" name="OPEN_RM" type="text"  responsive={{xl: 24}}/>
            <FormControl label="认购起点" name="SUBSCRIBE_S" type="text"  responsive={{xl: 12}}/>
            <FormControl label="递增金额" name="ADD_VALUE" type="number"  responsive={{xl: 12}}/>
            <FormControl label="认购费率" name="SUBSCRIBE_R" type="number"  responsive={{xl: 12}}/>
            <FormControl label="托管费率" name="HOST_R" type="number"  responsive={{xl: 12}}/>
            <FormControl label="管理费率" name="MANAGE_R" type="number"  responsive={{xl: 12}}/>
            <FormControl label="赎回费率" name="REDEMPTION_R" type="number"  responsive={{xl: 12}}/>
            <FormControl label="超额报酬" name="EXCESS" type="number"  responsive={{xl: 12}}/>
            <FormControl label="超额报酬说明" name="EXCESS_RM" type="text"  responsive={{xl: 24}}/>
            <FormControl label="募集行" name="C_BANK" type="text" responsive={{xl: 12}}/>
            <FormControl label="募集账户名称" name="B_NAME" type="text"  responsive={{xl: 12}}/>
            <FormControl label="募集账户" name="B_NUMBER" type="text"  responsive={{xl: 12}}/>
            <FormControl label="打款备注" name="B_ REMARKS" type="text"  responsive={{xl: 24}}/>
            <FormControl label="浮动产品类型" name="F_TYPE" type="select" data={floatprodata}  responsive={{xl: 12}}/>
            <FormControl label="风控措施" name="RISK_WAY" type="text"  responsive={{xl: 12}}/>
            <FormControl label="前端咨询服务档位起点" name="L_VALUE" type="number"  responsive={{xl: 12}}/>
            <FormControl label="前端咨询服务费(年)%" name="SERVIE_FEE" type="number"  responsive={{xl: 12}}/>
            <FormControl label="后端超额收益档位起点" name="A_VALUE" type="number"  responsive={{xl: 12}}/>
            <FormControl label="后端超额收益费(年)%" name="SERVIE_A" type="number"  responsive={{xl: 12}}/>
            <FormControl label="备注" name="REMARKS" type="text"  responsive={{xl: 24}}/>
          </div>
          <div className="form-content" tab="附件">
            <FormControl label="附件" name="fileTest" type="file" readOnly={this.state.readonly} responsive={{xl: 24}}/>
          </div>
        </FlowForm>
    );
  }

});

module.exports = product;
