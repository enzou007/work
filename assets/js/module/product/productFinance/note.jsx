var React = require('react'),
_ = require("underscore");;
var PropTypes = React.PropTypes;
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Grid = require("Component/form/Grid.jsx").Grid,
  Column = require("Component/form/Grid.jsx").Column;

  require("rctui/input");
  require("rctui/select");
   require("rctui/datetime");
  var Mock = require("mockjs");
  var pdtypedata =["投资","贷款","移民","注册","其他"]
  var floatprodata =["指数型","股票型","新股型","港股新股","对冲基金","混合型","定增型"];
var floatprodatavalue =["0.85","0.8","0.9","0.9","0.95","0.9","0.85"];
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
  getGridForm: function () {
    return (
      <div>
        <FormControl label="时间" name="StSomeName" type="text"/>
        <FormControl label="类别" name="StSomeType" type="text"/>
        <FormControl label="百分比" name="StSomenum" type="text"/>
      </div>
    );
  },
  getreturn : function (e){
    this.props.action.setField({
      returncondition: floatprodatavalue[floatprodata.findIndex(x => x == e)]
    });
  },
  render: function() {
    return (
      <FlowForm   onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
          <div className="form-content" tab="基本信息">
            <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
            <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="产品编号" name="pdnum" type="text"  responsive={{xl: 12}}/>
            <FormControl label="产品类别" name="pdtype" type="select" data={pdtypedata}  responsive={{xl: 12}}/>
            <FormControl label="产品名称" name="pdname" type="text"  responsive={{xl: 12}}/>
            <FormControl label="管理人" name="adpsn" type="text"  responsive={{xl: 12}}/>
            <FormControl label="投资门槛" name="inthreshold" type="text" responsive={{xl: 12}}/>
            <FormControl label="募集银行" name="mbank" type="text" responsive={{xl: 12}}/>
            <FormControl label="前端咨询服务档位起点" name="startingpoint" type="number"  responsive={{xl: 12}}/>
            <FormControl label="前端咨询服务费(年)%" name="advisoryseryear" type="number"  responsive={{xl: 12}}/>
            <FormControl label="理财师提点位" name="financialplanner" type="number"  responsive={{xl: 12}}/>
            <FormControl label="递增金额" name="inamount" type="number" responsive={{xl: 12}}/>
            <FormControl label="浮动产品类型" name="floatingproduct" type="select" data={floatprodata}  onChange={this.getreturn} responsive={{xl: 12}}/>
            <FormControl label="回撤条件" name="returncondition" type="text" readOnly={true}  responsive={{xl: 12}}/>
            <FormControl label="预期收益率" name="yqsy" type="grid" responsive={{xl: 24}}>

              <Grid height={500} form={this.getGridForm()}>
                <Column label="时间" width={0.3} dataKey="StSomeName"/>
                <Column label="类别" width={0.4} dataKey="StSomeType"/>
                <Column label="百分比" width={0.3} dataKey="StSomenum"/>
              </Grid>
            </FormControl>
          </div>
          <div className="form-content" tab="产品信息">

            <FormControl label="发行规模" name="Issuesize" type="text"   responsive={{xl: 12}}/>
            <FormControl label="收益分配" name="indistribution" type="text"   responsive={{xl: 12}}/>
            <FormControl label="产品期限" name="term" type="text"   responsive={{xl: 12}}/>
            <FormControl label="认购费&服务费" name="servicecharge" type="number"   responsive={{xl: 12}}/>
            <FormControl label="开放日" name="openhouse" type="date"   responsive={{xl: 12}}/>
            <FormControl label="风控措施" name="windcontrol" type="text"   responsive={{xl: 12}}/>
          </div>


      </FlowForm>
    );
  }

});

module.exports = product;
