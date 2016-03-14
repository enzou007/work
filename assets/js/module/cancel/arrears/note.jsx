var React = require('react');
var PropTypes = React.PropTypes;
var Mock = require("mockjs");
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  FileUp = require("Component/form/FileUp.jsx");
   require("rctui/input");
   require("rctui/datetime");
   require("rctui/select");
var dldata = ["是","否"];
var qddata = ["网上","线下"];
var nulldata =[];
var ddzt =["待审核","审核中","审核通过","审核不同过","已完成"];
var KHLXData =["生效","冻结"];
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
  onCreate: function () {
    this.props.action.setField({
      CreateDate: Mock.Random.now("yyyy-MM-dd")
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
    textclick:function(y){
      alert(y.label)
    },
  render: function() {
    return (
      <FlowForm   onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
        <div className="form-content" tab="基本信息">
          <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
          <FormControl label="客户名称" name="cust_name" type="text" responsive={{xl: 12}}/>
          <FormControl label="客户编号" name="cust_id" type="text" responsive={{xl: 12}}/>
          <FormControl label="订单号" name="order_id" type="text"  responsive={{xl: 12}}/>
          <FormControl label="订单日期" name="efct_date" type="date"  responsive={{xl: 12}}/>
          <FormControl label="产品名称" name="trade_name" type="text" responsive={{xl: 12}}/>
          <FormControl label="产品金额" name="ord_amt" type="number"  responsive={{xl: 12}}/>
          <FormControl label="订单金额" name="trade_amt" type="number"  responsive={{xl: 12}}/>
          <FormControl label="欠款金额" name="q_amt" type="number"  responsive={{xl: 12}}/>
          </div>
          {/*<div className="form-content" tab="企业信息">*/}

            {/*<FormControl label="公司营业执照" name="blicense" type="file"   responsive={{xl: 24}}/>*/}

        {/*}</div>*/}
      </FlowForm>

    );
  }

});

module.exports = qy;
