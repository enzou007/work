var React = require('react'),
_ = require("underscore");;
var PropTypes = React.PropTypes;
var DataForm = require("View/form/DataForm.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  FormControl = require("Component/form/FormControl.jsx");
  require('Component/form/InputDate.jsx');
  require('Component/form/InputTwo.jsx');
  require("rctui/input");
  require("Component/form/Select.jsx");
  require("rctui/datetime");
  require('Component/form/Radio.jsx');
  var Tabs = require("Component/bootstrap/Tabs.jsx");
  var Mock = require("mockjs");
  var CURRENCY = [{id:"01",text:"人民币"},
{id:"12",text:"英镑"},
{id:"13",text:"港币"},
{id:"14",text:"美元"},
{id:"15",text:"瑞士法郎"},
{id:"18",text:"新加坡元"},
{id:"27",text:"日元"},
{id:"28",text:"加拿大元"},
{id:"29",text:"澳大利亚元"},
{id:"38",text:"欧元"},
{id:"34",text:"美元金"},
{id:"35",text:"本币金"}];
  var LOAN_TERM_DATA =["日","月","年"];
  var E_DATA = [];
  var DY_DATA = ["住宅","公寓","写字楼","底商","别墅","厂房","土地"];
  var ZY_DATA = ["动产","股权","债券","存单"];
  var TEPAY_DATA =["等额本金","等额本息","利随本清","按月付息,到期还本","按季付息,到期还本","先息后本"];
  var pdtypedata =["抵押贷款","质押贷款"];
  var broData = ["上班族","企业主","个体户","自由职业者"];
  var product = React.createClass({
  getInitialState: function() {
    return {
      readonly: false,
      mortgage:true,
      pledge:false
    };
  },
  onCreate: function () {
    this.props.action.setField({
      AgentPsn: this.props.session.get("name"),
      CreateDate: Mock.Random.now("yyyy-MM-dd")
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
  getreturn : function (e){
    this.props.action.setField({
    //  returncondition: floatprodatavalue[floatprodata.findIndex(x => x == e)]
    currency:e
    });
  },
  productType:function (value) {
    this.setState({
      mortgage:value==="抵押贷款",
      pledge:value==="质押贷款"
    })
  },
  render: function() {
    return (
      <DataForm title="贷款类产品"  onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
        <Tabs>
          <div className="form-content" tab="基本信息">
            <FormControl label="创建时间" name="CreateDate" type="text" readOnly={true} />
            <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true}/>
            <FormControl label="产品类别" name="class_id" onChange={this.productType} required={true} value ="抵押贷款" type="select" data={pdtypedata} />
            <FormControl label="币种" name="cur_name" type="select"  required={true}  data={CURRENCY} onChange={this.getreturn}/>
            <FormControl label="币种代码" name="currency" type="text"  readOnly={true}/>
          </div>
          <div className="form-content" tab="产品信息">
            <FormControl label="产品编号" name="prt_id" type="text"  readOnly={true}/>
            <FormControl label="产品名称" name="prt_name" required={true}  type="text" />
            <FormControl label="放款机构" name="lenders"  required={true} type="text" />
            <FormControl label="借款期限" name="loan_term"  required={true} type="inputdate"/>
            <FormControl label="指导利率" name="rate"  required={true} type="inputdate" />
            <FormControl label="借款人职业状况" name="bro_status" required={true}  type="select" data={broData}/>
            <FormControl label="借款人年龄限制" name="bro_age"  required={true} type="number"/>
            <FormControl label="借款额度起止（万）" name="bro_quota_b" type="inputtwo" />
            <FormControl label="抵押物类型" name="dy_type" required={this.state.mortgage} show={this.state.mortgage} type="select" data={DY_DATA}/>
            <FormControl label="质押物类型" name="zy_type"  required={this.state.pledge} show={this.state.pledge} type="select" data={ZY_DATA}/>
            <FormControl label="还款方式" name="tepay_type" required={true}  type="select" data={TEPAY_DATA}/>
            <FormControl label="服务费" name="service_f"  required={true} type="number"/>
            <FormControl label="备注" name="remarks" type="textarea"  responsive={{xl: 24}}/>
          </div>
        </Tabs>
      </DataForm>
    );
  }

});

module.exports = product;
