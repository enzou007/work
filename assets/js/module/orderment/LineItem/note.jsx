var React = require('react');
var PropTypes = React.PropTypes;
var Mock = require("mockjs");
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  FileUp = require("Component/form/FileUp.jsx"),
  Grid = require("Component/form/Grid.jsx").Grid,
  Column = require("Component/form/Grid.jsx").Column;
   require("rctui/input");
   require("rctui/datetime");
   require("rctui/select");
var dcdata = ["是","否"];
var bhdata = ["是","否"];
var nulldata =[];
var bzdata =["RMB","USD"];

//var AttOptions = {
//  accept: [
//    {
//      title: 'Images',
//      extensions: 'gif,jpg,jpeg,bmp',
//      mimeTypes: 'image/*'
//    }
//  ]
//}
var qy = React.createClass({
  getInitialState: function() {
    return {
      readonly: false
    };
  },
  getZCGridForm: function () {
    return (
      <div>
        <FormControl label="订单号" name="StSomenum1" type="text"/>
        <FormControl label="订单行项目编号" name="StSomenum2" type="text"/>
        <FormControl label="支出行项目编号" name="StSomenum3" type="text"/>
        <FormControl label="支付供应商" name="StSomenum4" type="text"/>
        <FormControl label="支付金额" name="StSomenum5" type="text"/>
        <FormControl label="支付状态代码" name="StSomenum6" type="text"/>
        <FormControl label="支付状态" name="StSomenum7" type="text"/>
      </div>
    );
  },
  onCreate: function () {
      this.props.action.setField({
      //  AgentPsn: this.props.session.get("name"),
        CreateDate: Mock.Random.now()
      });
    },
    beforeSubmit: function () {
      this.props.action.setField({
        LastDate: Mock.Random.now()
      });
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
      <FlowForm   onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
        <div className="form-content" tab="基本信息">
          <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
          <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
          <FormControl label="订单号" name="ORDER_NO" type="text"  responsive={{xl: 12}}/>
          <FormControl label="订单号行项目编号" name="ITEM_NO" type="text"  responsive={{xl: 12}}/>
          <FormControl label="第一负责人编号" name="RP1_ID" type="text" responsive={{xl: 12}}/>
          <FormControl label="第一负责人名称" name="RP1_NAME" type="text" responsive={{xl: 12}}/>
          <FormControl label="第二负责人编号" name="RP2_ID" type="text" responsive={{xl: 12}}/>
          <FormControl label="第二负责人名称" name="RP2_NAME" type="text" responsive={{xl: 12}}/>
          <FormControl label="第一负责人比例" name="RP1_RATE" type="number"   responsive={{xl: 12}}/>
          <FormControl label="第二负责人比例" name="RP2_RATE" type="number"   responsive={{xl: 12}}/>
          <FormControl label="销售助理名称" name="AT_NAME" type="text" responsive={{xl: 12}}/>
          <FormControl label="销售助理编号" name="AT_ID" type="text" responsive={{xl: 12}}/>
          <FormControl label="销售助理计提" name="AT_RATE" type="number"   responsive={{xl: 12}}/>
          <FormControl label="交易产品代码" name="PRT_TRADE_ID" type="select" data={nulldata} responsive={{xl: 12}}/>
          <FormControl label="交易产品名称" name="PRT_TRADE_NAME" type="text" responsive={{xl: 12}}/>
          <FormControl label="终端客户编号" name="T_CUST_ID" type="select" data={nulldata}  responsive={{xl: 12}}/>
          <FormControl label="终端客户名称" name="T_CUST_NAME" type="text" responsive={{xl: 12}}/>
          <FormControl label="终端产品代码" name="PRT_TERMINAL_ID" type="select" data={nulldata}  responsive={{xl: 12}}/>
          <FormControl label="终端产品名称" name="PRT_TERMINAL_NAME" type="text" responsive={{xl: 12}}/>
          <FormControl label="产品类别" name="KH_SOURCE1" type="select" data={nulldata}   responsive={{xl: 12}}/>
          <FormControl label="放款机构" name="L_institution" type="text" responsive={{xl: 12}}/>
          <FormControl label="产品业务期限（借款期限/封闭期）" name="C_TERM" type="number"   responsive={{xl: 12}}/>
          <FormControl label="期限单位" name="TERM_C" type="text" responsive={{xl: 12}}/>
          <FormControl label="是否需要保函" name="B_FLAG" type="select" data={bhdata}   responsive={{xl: 12}}/>
          <FormControl label="是否代持" name="H_FLAG" type="select" data={dcdata}   responsive={{xl: 12}}/>
          <FormControl label="实际借款利率" name="A_RATE" type="number"   responsive={{xl: 12}}/>
          <FormControl label="实际业务期限（天）" name="PRT_TERM" type="number"   responsive={{xl: 12}}/>
          <FormControl label="每月还款金额" name="R_AMOUNT" type="number"   responsive={{xl: 12}}/>
          <FormControl label="返点/利息比例（中收）" name="R_PRO" type="number"   responsive={{xl: 12}}/>
          <FormControl label="返点/利息金额（中收）" name="TRADE_AMT" type="number"   responsive={{xl: 12}}/>
          <FormControl label="币种" name="CURRENCY" type="select" data={bzdata} responsive={{xl: 12}}/>
          <FormControl label="交易规模金额" name="T_SIZE" type="number"   responsive={{xl: 12}}/>
          <FormControl label="终端产品金额" name="TERMINAL_AMT" type="number"   responsive={{xl: 12}}/>
          <FormControl label="未清欠款金额" name="Q_AMOUNT" type="number"   responsive={{xl: 12}}/>
          <FormControl label="未清欠款还款时间（月）" name="Q_AMOON" type="number"   responsive={{xl: 12}}/>

          <FormControl label="支出行项目" name="zcyqsy" type="grid" responsive={{xl: 24}}>
            <Grid height={500} form={this.getZCGridForm()}>
              <Column label="订单号" width={0.1} dataKey="StSomenum1"/>
              <Column label="订单行项目编号" width={0.2} dataKey="StSomenum2"/>
              <Column label="支出行项目编号" width={0.2} dataKey="StSomenum3"/>
              <Column label="支付供应商" width={0.15} dataKey="StSomenum4"/>
              <Column label="支付金额" width={0.1} dataKey="StSomenum5"/>
              <Column label="支付状态代码" width={0.15} dataKey="StSomenum6"/>
              <Column label="支付状态" width={0.1} dataKey="StSomenum7"/>
            </Grid>
          </FormControl>
        </div>
          {/*<div className="form-content" tab="企业信息">*/}

            {/*<FormControl label="公司营业执照" name="blicense" type="file"   responsive={{xl: 24}}/>*/}

        {/*}</div>*/}
      </FlowForm>

    );
  }

});

module.exports = qy;
