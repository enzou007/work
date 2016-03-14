var React = require('react'),
_ = require("underscore");;
var PropTypes = React.PropTypes;
var DataForm = require("View/form/DataForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Personnel = require("Component/form/Personnel.jsx"),
  FileUp = require("Component/form/FileUp.jsx");

  require("rctui/input");
  require("Component/form/Select.jsx");
  require("rctui/datetime");
  require('Component/form/Radio.jsx');
  var Tabs = require("Component/bootstrap/Tabs.jsx");
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
      CreateDate: Mock.Random.now("yyyy-MM-dd")
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
  getreturn : function (e){
    this.props.action.setField({
    //  returncondition: floatprodatavalue[floatprodata.findIndex(x => x == e)]
    currency:e
    });
  },
  render: function() {
    return (
      <DataForm title="金融产品"  onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
        <Tabs>
          <div className="form-content" tab="基本信息">
            <FormControl label="创建时间" name="CreateDate" type="text" readOnly={true}  responsive={{xl: 12}}/>
            <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="产品编号" name="prt_id" type="text" readOnly={true}   responsive={{xl: 12}}/>
            <FormControl label="产品类别" name="class_id" type="select" data={pdtypedata}  responsive={{xl: 12}}/>
            <FormControl label="产品名称" name="prt_name" type="text"  responsive={{xl: 12}}/>
            <FormControl label="产品简称" name="prt_sname" type="text"  responsive={{xl: 12}}/>
            <FormControl label="币种" name="cur_name" type="radio-group" data={CURRENCY} onChange={this.getreturn}  responsive={{xl: 12}}/>
            <FormControl label="币种代码" name="currency" type="text" readOnly={true}  responsive={{xl: 12}}/>
            <FormControl label="融资方" name="financiers" type="text" responsive={{xl: 12}}/>
            <FormControl label="管理人" name="m_company" type="personnel"  responsive={{xl: 12}}/>
            <FormControl label="托管人" name="custodian" type="personnel"  responsive={{xl: 12}}/>
            <FormControl label="产品规模" name="product_s" type="number"  responsive={{xl: 12}}/>
            <FormControl label="产品期限（月）" name="product_m" type="number"  responsive={{xl: 12}}/>
            <FormControl label="赎回方式" name="redemption_w" type="radio-group" data={REDEMPTION_DATA} responsive={{xl: 12}}/>
            <FormControl label="赎回日" name="redemption_d" type="text"  responsive={{xl: 12}}/>
            <FormControl label="续存方式" name="adaptation_c" type="radio-group" data={ADAPTATION_DATA} responsive={{xl: 12}}/>
            <FormControl label="付息方式" name="p_interest" type="text"  responsive={{xl: 12}}/>
            <FormControl label="投资领域(固)" name="investment_f" type="select" data={INVESTMENT_D_DATA} responsive={{xl: 12}}/>
            <FormControl label="预期收益率" name="in_rate" type="number"  responsive={{xl: 12}}/>
            <FormControl label="续存期（月）" name="adaptation_m" type="number"  responsive={{xl: 12}}/>
            <FormControl label="续存规模（万）" name="adaptation_s" type="number"  responsive={{xl: 12}}/>
            <FormControl label="封闭期（月）" name="closed_m" type="number"  responsive={{xl: 12}}/>
            <FormControl label="预警线" name="line_of" type="number"  responsive={{xl: 12}}/>
            <FormControl label="止损线" name="stop_l" type="number"  responsive={{xl: 12}}/>
            <FormControl label="分红方式" name="bonus_s" type="radio-group" data={BONUS_DATA}  responsive={{xl: 12}}/>
            <FormControl label="结构形式" name="structure_f" type="radio-group" data={STRUCTURE_DATA}  responsive={{xl: 12}}/>
            <FormControl label="结构形式说明" name="structure_i" type="text"  responsive={{xl: 12}}/>
            <FormControl label="投资领域(浮)" name="investment_f" type="select" data={INVESTMENT_F_DATA} responsive={{xl: 12}}/>
            <FormControl label="人数限制" name="number_l" type="number"  responsive={{xl: 12}}/>
            <FormControl label="开放日" name="open_day" type="date"  responsive={{xl: 12}}/>
            <FormControl label="周期开放日" name="open_w" type="text"  responsive={{xl: 12}}/>
            <FormControl label="特定开放日" name="open_s" type="date"  responsive={{xl: 12}}/>
            <FormControl label="开放日备注" name="open_rm" type="text"  responsive={{xl: 24}}/>
            <FormControl label="认购起点" name="subscribe_s" type="text"  responsive={{xl: 12}}/>
            <FormControl label="递增金额" name="add_value" type="number"  responsive={{xl: 12}}/>
            <FormControl label="认购费率" name="subscribe_r" type="number"  responsive={{xl: 12}}/>
            <FormControl label="托管费率" name="host_r" type="number"  responsive={{xl: 12}}/>
            <FormControl label="管理费率" name="manage_r" type="number"  responsive={{xl: 12}}/>
            <FormControl label="赎回费率" name="redemption_r" type="number"  responsive={{xl: 12}}/>
            <FormControl label="超额报酬" name="excess" type="number"  responsive={{xl: 12}}/>
            <FormControl label="超额报酬说明" name="excess_rm" type="text"  responsive={{xl: 24}}/>
            <FormControl label="募集行" name="c_bank" type="text" responsive={{xl: 12}}/>
            <FormControl label="募集账户名称" name="b_name" type="text"  responsive={{xl: 12}}/>
            <FormControl label="募集账户" name="b_number" type="text"  responsive={{xl: 12}}/>
            <FormControl label="打款备注" name="b_remarks" type="text"  responsive={{xl: 24}}/>
            <FormControl label="浮动产品类型" name="f_type" type="select" data={floatprodata}  responsive={{xl: 12}}/>
            <FormControl label="风控措施" name="risk_way" type="text"  responsive={{xl: 12}}/>
            <FormControl label="前端咨询服务档位起点" name="l_value" type="number"  responsive={{xl: 12}}/>
            <FormControl label="前端咨询服务费(年)%" name="servie_fee" type="number"  responsive={{xl: 12}}/>
            <FormControl label="后端超额收益档位起点" name="a_value" type="number"  responsive={{xl: 12}}/>
            <FormControl label="后端超额收益费(年)%" name="servie_a" type="number"  responsive={{xl: 12}}/>
            <FormControl label="备注" name="REMARKS" type="textarea"  responsive={{xl: 24}}/>
          </div>
          <div className="form-content" tab="附件">
            <FormControl label="附件" name="fileTest" type="file" readOnly={this.state.readonly} responsive={{xl: 24}}/>
          </div>
        </Tabs>
        </DataForm>
    );
  }

});

module.exports = product;
