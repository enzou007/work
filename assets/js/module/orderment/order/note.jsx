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
var qddata = ["转介绍","渠道"];
var nulldata =[];
var bzdata =["RMB","USD"];
var ddzt =["业务订单待审核","业务订单审核中","业务订单审核通过","业务订单审核不通过","业务分配待审核","业务分配审核中","业务分配审核完成","业务已完成"];

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
  getGridForm: function () {
    return (
      <div>
        <FormControl label="订单号" name="StSomenum1" type="text"/>
        <FormControl label="订单行项目编号" name="StSomenum2" type="text"/>
        <FormControl label="交易产品" name="StSomenum3" type="text"/>
        <FormControl label="终端产品" name="StSomenum4" type="text"/>
        <FormControl label="产品期限" name="StSomenum5" type="text"/>
        <FormControl label="交易金额" name="StSomenum6" type="text"/>
        <FormControl label="终端产品金额" name="StSomenum7" type="text"/>
      </div>
    );
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
          <FormControl label="订单号" name="order_id" type="text"  responsive={{xl: 12}}/>
          <FormControl label="订单日期" name="dc_date" type="date"  responsive={{xl: 12}}/>
          <FormControl label="订单生效日期" name="efct_date" type="date"  responsive={{xl: 12}}/>
          <formcontrol label="订单类型" name="order_type" type="select" data={nulldata} responsive={{xl: 12}}/>
          <FormControl label="交易客户名称" name="b_cust_name"  type="select" data={nulldata}  responsive={{xl: 12}}/>
          <FormControl label="交易客户编号" name="b_cust_id" type="text" responsive={{xl: 12}}/>
          <FormControl label="来源" name="chanell" type="select" data={qddata}   responsive={{xl: 12}}/>
          <FormControl label="公司名称" name="com_name"  type="select" data={nulldata}  responsive={{xl: 12}}/>
          <FormControl label="公司代码" name="com_id" type="text" responsive={{xl: 12}}/>
          <FormControl label="部门名称" name="dept_name"  type="select" data={nulldata}  responsive={{xl: 12}}/>
          <FormControl label="部门代码" name="dept_id" type="text" responsive={{xl: 12}}/>
          <FormControl label="订单中收总金额" name="ord_amt" type="number"   responsive={{xl: 12}}/>
          <FormControl label="订单未清欠款" name="q_amt" type="number"   responsive={{xl: 12}}/>
          <FormControl label="币种" name="currency" type="select" data={bzdata} responsive={{xl: 12}}/>
          <FormControl label="机会号" name="opp_id" type="select" data={nulldata} responsive={{xl: 12}}/>
          <FormControl label="业务关联订单号" name="br_ord_no" type="select" data={nulldata} responsive={{xl: 12}}/>
          <FormControl label="续作关联订单号" name="cr_ord_no" type="select" data={nulldata} responsive={{xl: 12}}/>
          <FormControl label="订单状态" name="ord_st" type="select" data={ddzt} responsive={{xl: 12}}/>
          <FormControl label="订单行项目" name="yqsy" type="grid" responsive={{xl: 24}}>
              <Grid height={500} form={this.getGridForm()}>
                <Column label="订单号" width={0.1} dataKey="StSomenum1"/>
                <Column label="订单行项目编号" width={0.2} dataKey="StSomenum2"/>
                <Column label="交易产品" width={0.2} dataKey="StSomenum3"/>
                <Column label="终端产品" width={0.1} dataKey="StSomenum4"/>
                <Column label="产品期限" width={0.1} dataKey="StSomenum5"/>
                <Column label="交易金额" width={0.1} dataKey="StSomenum6"/>
                <Column label="终端产品金额" width={0.2} dataKey="StSomenum7"/>

              </Grid>
            </FormControl>
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
            <FormControl label="附件"  name="ATTACH_P" type="file"   responsive={{xl: 24}}/>
          </div>
          {/*<div className="form-content" tab="企业信息">*/}

            {/*<FormControl label="公司营业执照" name="blicense" type="file"   responsive={{xl: 24}}/>*/}

        {/*}</div>*/}
      </FlowForm>

    );
  }

});

module.exports = qy;
