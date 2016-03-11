var React = require('react');
var PropTypes = React.PropTypes;
var Mock = require("mockjs");
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx");
   require("rctui/input");
   require("rctui/datetime");
   require("rctui/select");
var zfdata = ["利息","渠道费","评估费","返点","资料","律师费","银行手续费","注册相关","包装费","其它"];
var nulldata =[];
var bzdata =["RMB","USD"];
var zftypedata =["未支付","已支付"];
var zfxztypedata =["支付项目","成本调节项目"];
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
          <FormControl label="订单号行项目编号" name="item_id" type="text"  responsive={{xl: 12}}/>
          <FormControl label="支出行项目编号" name="p_item_id" type="text"  responsive={{xl: 12}}/>
          <FormControl label="支付供应商代码" name="vendor_id" type="select" data={nulldata}   responsive={{xl: 12}}/>
          <FormControl label="支付供应商名称" name="vendor" type="text" responsive={{xl: 12}}/>
          <FormControl label="支付行项目性质" name="vendor_id" type="select" data={zfxztypedata}   responsive={{xl: 12}}/>
          <FormControl label="支付项目类别" name="p_type" type="select" data={zfdata}  responsive={{xl: 12}}/>
          <FormControl label="实际采购业务期限" name="r_term" type="number"   responsive={{xl: 12}}/>
          <FormControl label="支付金额" name="p_amt" type="number"   responsive={{xl: 12}}/>
          <FormControl label="币种" name="currency" type="select" data={bzdata} responsive={{xl: 12}}/>
          <FormControl label="支付状态" name="p_st" type="select" data={zftypedata}   responsive={{xl: 12}}/>
          <FormControl label="备注" name="remarks" type="textarea" responsive={{xl: 24}}/>
        </div>
          {/*<div className="form-content" tab="企业信息">*/}

            {/*<FormControl label="公司营业执照" name="blicense" type="file"   responsive={{xl: 24}}/>*/}

        {/*}</div>*/}
      </FlowForm>

    );
  }

});

module.exports = qy;
