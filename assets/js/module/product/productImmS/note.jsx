var React = require('react'),
_ = require("underscore");;
var PropTypes = React.PropTypes;
var DataForm = require("View/form/DataForm.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  FormControl = require("Component/form/FormControl.jsx");
require("rctui/input");
require("Component/form/Select.jsx");
require("rctui/datetime");
var Mock = require("mockjs");
require('Component/form/Radio.jsx');
  //var pdtypedata =["投资","贷款","移民","注册","其他"]
var COUNTRY_DATA =[];
var pdtypedata =[];
var CURRENCY = [{id:"01",text:"RMB"},{id:"14",text:"美元"}];
var Tabs = require("Component/bootstrap/Tabs.jsx");
var product = React.createClass({
  getInitialState: function() {
    return {
      readonly: false
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
  render: function() {
    return (
      <DataForm title="移民服务类产品"  onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
        <Tabs>
          <div className="form-content" tab="基本信息">
            <FormControl label="创建时间" name="CreateDate" type="text" readOnly={true} />
            <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true}/>
            <FormControl label="产品类别" name="class_id"  required={true} type="select" data={pdtypedata} />
            <FormControl label="币种" name="cur_name" required={true}  type="radio-group" data={CURRENCY} onChange={this.getreturn}/>
            <FormControl label="币种代码" name="currency" type="text"  readOnly={true}/>
          </div>
          <div className="form-content" tab="产品信息">
            <FormControl label="产品编号" name="prt_id" type="text"  readOnly={true}/>
            <FormControl label="产品名称" name="prt_name"  required={true} type="text" />
            <FormControl label="服务机构" name="service_i" required={true}  type="text"/>
            <FormControl label="移民国家" name="im_country"  required={true} type="select" data ={COUNTRY_DATA}/>
            <FormControl label="移民项目" name="immigration_p" type="text"/>
            <FormControl label="移民条件" name="immigration_c" type="text"/>
            <FormControl label="服务费" name="service_f" type="text"/>
        </div>
      </Tabs>
      </DataForm>
    );
  }

});

module.exports = product;
