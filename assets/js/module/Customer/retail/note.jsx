var React = require('react');
var Mock = require("mockjs");
var PropTypes = React.PropTypes;
var DataForm = require("View/form/DataForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  Personnel = require("Component/form/Personnel.jsx");

var Tabs = require("Component/bootstrap/Tabs.jsx");
require("rctui/input");
require("rctui/datetime");
require('Component/form/Select.jsx');
require('Component/form/Radio.jsx');
require('Component/form/Checkbox.jsx');
var KHLYData = ["直营","渠道"];
var KHTypedata = ["潜客","有效潜客","成交客户"];
var KHLXData = ["生效","冻结"];
//var khtypedata =["潜客","有效潜客","成交客户"];
// var khstatedata =["生效","冻结"];
var HKData =["电话","网络","会议","社区活动","家庭拜访","公共场所拜访"];
var khages = ["网络","传单","电话"];
var GZData = ["国营","民营","外资","合资","政府机关"];
var sexdata = ["男","女"];
var agedata = ["20~30","30~40","40~50","50~60","60以上"];
var HYData = ["已婚","未婚","离异","丧偶"];
var CData = ["有","无"];
var nulldata=[];
var FXData =["激进","稳健","保守"];
var compData = ["股票","公募基金","私募基金","国债","房产","保险","黄金","银行理财","其他"];
var SRData =["000-10000","10000-30000","30000及以上"];
var NoteForm = React.createClass({
    getInitialState: function() {
      return {
        readonly: false,
        show : false
      };
    },
    onLoad: function(){
      //if(his.props.action.getField("KHNum").value !== ""){
      //  this.setState({
      //  showKH : true
      //  })
      //}
    },
    componentDidMount: function() {

    },
    componentWillReceiveProps: function(newProps){
      /*
      if(newProps["form"].get("@CurNodeId") && newProps["form"].get("@CurNodeId") !== "StartNode"){
        this.setState({
          readonly: true
        })
      }
      */
    },

    onCreate: function () {
      this.props.action.setField({
        AgentPsn: this.props.session.get("name"),
          CreateDate: Mock.Random.now("yyyy-MM-dd")
      });
    },
    beforeSubmit: function () {
      // this.props.action.setField({
      // //  LastDate: Mock.Random.now()
      // });
      // if(this.props.action.getField("Birthday").value === ""){
      //   return false;
      // }else{
      //   return true;
      // }
    },
    afterSubmit: function () {

    },
    compOnChange:function (data) {
      this.setState({show : data.indexOf("其他") >= 0})
    },
  render: function() {
    return (
        <DataForm title="个人客户" onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
        <Tabs>
            <div className="form-content" tab="Situation">
              <FormControl label="创建时间" name="CreateDate" type="text" readOnly={true}  />
              <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} />
              <FormControl label="业务员" name="salesmanId" type="personnel"  />
              <FormControl label="最后修改时间" name="lastModified" type="text" readOnly={true} />
              <FormControl label="获客方式" name="wayOff" type="select" data={HKData}   />
              <FormControl label="客户来源(S)" name="customerSource" type="select" data={KHLYData}   />
              <FormControl label="客户类型" name="customerType" type="select" data={KHTypedata} value="潜客"  />
              <FormControl label="客户状态" name="customerStatus" type="radio-group" data={KHLXData} value="生效"  />
          </div>

          <div className="form-content" tab="Personal">
            <Fieldset title="基本信息">
              <FormControl label="客户编号" name="customerId" type="text" />
              <FormControl label="客户名称" name="customerName" type="text" required={true} />
              <FormControl label="性别" name="gender" type="radio-group" required={true} data={sexdata}  />
              <FormControl label="年龄" name="age" type="select" data={agedata}  />
              <FormControl label="客户生日" name="birthday" type="date"  />
              <Fieldset title="联系方式">
                {//<Fieldset  style={{border: "1px solid #C5D0DC", marginBottom: "10px", paddingTop: "10px", paddingRight: "12px"}}>
              }
                <FormControl label="手机" name="mobile" type="number" required={true} />
                <FormControl label="微信号" name="wx" type="text"   />
                <FormControl label="QQ" name="qq" type="number"   />
                <FormControl label="固定电话号码" name="phone" type="text"   />
                <FormControl label="电子邮箱" name="email" type="email"   />
                <FormControl label="家庭地址" name="homeAddress" type="text"   />
              </Fieldset>

          </Fieldset>
          <Fieldset title="其他">
            <FormControl label="工作单位" name="workUnit" type="text"   />
            <FormControl label="从事行业" name="industry" type="select" data={nulldata}  />
            <FormControl label="职务" name="post" type="text"   />
            <FormControl label="单位性质" name="natureOfJob" type="select" data={GZData}   />
            <FormControl label="户口所在地" name="registeredResidence" type="text"  />
            <FormControl label="银行账户" name="bankAccount" type="number"   />
            <FormControl label="账户名称" name="titleOfAccount" type="text"   />
            <FormControl label="开户行" name="bankOfDeposit" type="text"   />
        </Fieldset>
        </div>
          <div className="form-content" tab="F3">
            <Fieldset title="F1">
              <FormControl label="婚姻状态" name="maritalStatus"  type="radio-group" data={HYData}  />
              <FormControl label="父母信息" name="ParentsInformation" type="text"   />
              <FormControl label="子女信息" name="childrenOfInformation"  type="radio-group" data={CData}  />

            </Fieldset>
            <Fieldset title="F2">
              <FormControl label="兴趣爱好" name="hobbiesAndInterests" type="text"   />
              <FormControl label="风险偏好" name="RiskAppetite"  type="radio-group" data={FXData}  />

            </Fieldset>
            <Fieldset title="F3">
              <FormControl label="资产规模" name="assetSize" type="text"   />
              <FormControl label="月收入水平" name="levelOfMonthlyIncome"  type="select" data={SRData}  />
              <FormControl label="资产构成" name="compositionOfAssets" type="checkbox-group" data={compData} onChange={this.compOnChange} responsive={{xl: 24}}/>
              <FormControl label="资产构成说明" name="assetsThat" type="textarea" show={this.state.show} responsive={{xl: 24}} />
            </Fieldset>
          </div>
        </Tabs>
      </DataForm>
    );
  }

});

module.exports = NoteForm;
