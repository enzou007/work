var React = require('react'),
_ = require("underscore");;
var PropTypes = React.PropTypes;
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx");

  require("rctui/input");
  require("Component/form/Select.jsx");
  require("rctui/datetime");
  var Mock = require("mockjs");
  var CURRENCY = [{id:"01",text:"RMB"},{id:"14",text:"美元"}];
  var LOAN_TERM_DATA =["日","月","年"];
  var E_DATA = [];
  var DY_DATA = ["住宅","公寓","写字楼","底商","别墅","厂房","土地"];
  var ZY_DATA = ["动产","股权","债券","存单"];
  var TEPAY_DATA =["等额本金","等额本息","利随本清","按月付息","到期还本","按季付息","到期还本","先息后本"];
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
  //  this.props.action.setField({
  //    LastDate: Mock.Random.now()
  //  });
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
            <FormControl label="币种" name="CUR_NAME" type="select" data={CURRENCY} onChange={this.getreturn} responsive={{xl: 12}}/>
            <FormControl label="币种代码" name="CURRENCY" type="text" responsive={{xl: 12}}/>
            <FormControl label="放款机构" name="LENDERS" type="text"  responsive={{xl: 12}}/>
            <FormControl label="借款期限" name="LOAN_TERM" type="number" responsive={{xl: 12}}/>
            <FormControl label="借款期限计量单位" name="LOAN_COMPANY" type="select" data={LOAN_TERM_DATA} responsive={{xl: 12}}/>
            <FormControl label="指导利率" name="RATE" type="text"  responsive={{xl: 12}}/>
            <FormControl label="指导利率单位" name="RATE_COMPANY" type="select" data={LOAN_TERM_DATA} responsive={{xl: 12}}/>
            <FormControl label="借款人职业状况" name="BRO_STATUS" type="text" responsive={{xl: 12}}/>
            <FormControl label="借款人年龄限制" name="BRO_AGE" type="number" responsive={{xl: 12}}/>
            <FormControl label="借款额度起（万）" name="BRO_QUOTA_B" type="select" data={E_DATA} responsive={{xl: 12}}/>
            <FormControl label="借款额度止（万）" name="BRO_QUOTA_E" type="select" data={E_DATA} responsive={{xl: 12}}/>
            <FormControl label="抵押物类型" name="DY_TYPE" type="select" data={DY_DATA} responsive={{xl: 12}}/>
            <FormControl label="质押物类型" name="ZY_TYPE" type="select" data={ZY_DATA} responsive={{xl: 12}}/>
            <FormControl label="还款方式" name="TEPAY_TYPE" type="select" data={TEPAY_DATA} responsive={{xl: 12}}/>
            <FormControl label="服务费" name="SERVICE_F" type="number" responsive={{xl: 12}}/>
            <FormControl label="备注" name="REMARKS" type="text"  responsive={{xl: 24}}/>
          </div>
      </FlowForm>
    );
  }

});

module.exports = product;
