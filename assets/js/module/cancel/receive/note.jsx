var React = require('react');
var PropTypes = React.PropTypes;
var Mock = require("mockjs");
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx");
   require("rctui/input");
   require("rctui/datetime");
   require("rctui/select");
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
  onCreate: function () {
      //this.props.action.setField({
      //  AgentPsn: this.props.session.get("name"),
      //  CreateDate: "2015-07-21"
      //});
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
          <FormControl label="付款方名称" name="P_NAME" type="text" responsive={{xl: 12}}/>
          <FormControl label="付款方银行账户" name="P_BANK_ACT" type="text" responsive={{xl: 12}}/>
          <FormControl label="客户编号" name="CUST_ID" type="text" responsive={{xl: 12}}/>
          <FormControl label="我方收款银行账户" name="R_BANK_ACCT" type="text"  responsive={{xl: 12}}/>
          <FormControl label="到款日期" name="R_DATE" type="text"  responsive={{xl: 12}}/>
          <FormControl label="到款时间" name="R_TIME" type="date"  responsive={{xl: 12}}/>
          <FormControl label="币种" name="CURRENCY" type="select" data={bzdata} responsive={{xl: 12}}/>
          <FormControl label="到款金额" name="R_AMOUNT" type="number"  responsive={{xl: 12}}/>
          <FormControl label="可核销金额" name="A_AMOUNT" type="number"  responsive={{xl: 12}}/>
          <FormControl label="备注" name="REMARKS" type="textarea" responsive={{xl: 24}}/>
        </div>
          {/*<div className="form-content" tab="企业信息">*/}

            {/*<FormControl label="公司营业执照" name="blicense" type="file"   responsive={{xl: 24}}/>*/}

        {/*}</div>*/}
      </FlowForm>

    );
  }

});

module.exports = qy;
