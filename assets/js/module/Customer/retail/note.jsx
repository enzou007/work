var React = require('react');
var Mock = require("mockjs");
var PropTypes = React.PropTypes;
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx");
   require("rctui/input");
   require("rctui/datetime");
   require("rctui/select");
   require('Component/form/Radio.jsx');
   var KHLYData = ["网络","传单","电话"];
   var KHTypedata = ["潜客","有效潜客","成交客户"];
   var KHLXData = ["生效","冻结"];
   //var khtypedata =["潜客","有效潜客","成交客户"];
  // var khstatedata =["生效","冻结"];
   var HKData =["电话","网络","会议","社区活动","家庭拜访","公共场所拜访"];
   var khages = ["网络","传单","电话"];
   var GZData = ["国营","民营","外资","合资","政府机关"];
   var sexdata = ["男","女"];
   var HYData = ["已婚","未婚","离异","丧偶"];
   var CData = ["有","无"];
   var FXData =["激进","稳健","保守"];
   var SRData =["000-10000","10000-30000","30000及以上"];
   var NoteForm = React.createClass({
    getInitialState: function() {
      return {
        readonly: false,
        showKH : false
      };
    },
    onLoad: function(){
      if(his.props.action.getField("KHNum").value !== ""){
        this.setState({
          showKH : true
        })
      }
    },
    componentDidMount: function() {

    },
    componentWillReceiveProps: function(newProps){
      if(newProps["form"].get("@CurNodeId") && newProps["form"].get("@CurNodeId") !== "StartNode"){
        this.setState({
          readonly: true
        })
      }
    },
    getDefaultProps: function() {
      return {

      };
    },
    onCreate: function () {
      this.props.action.setField({
        AgentPsn: this.props.session.get("name"),
        CreateDate: "2015-07-21"
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
      <FlowForm  onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
          <div className="form-content" tab="基本信息">
            <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
            <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="业务员" name="RP_ID" type="text"  responsive={{xl: 12}}/>
            <FormControl label="最后修改时间" name="UP_DATE" type="date" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="客户编号" name="CUST_ID" type="text" responsive={{xl: 12}}/>
            <FormControl label="获客方式" name="GET_TYPE" type="select" data={HKData}   responsive={{xl: 12}}/>
            <FormControl label="客户来源" name="KH_SOURCE" type="select" data={KHLYData}   responsive={{xl: 12}}/>
            <FormControl label="客户类别" name="CUST_TYPE" type="select" data={KHTypedata}   responsive={{xl: 12}}/>
            <FormControl label="客户状态" name="CUST_STATUS" type="select" data={KHLXData}   responsive={{xl: 12}}/>
        </div>
        <div className="form-content" tab="客户信息" show={this.state.showKH}>
          <FormControl label="客户名称" name="CUST_NAME" type="text"  responsive={{xl: 12}}/>
          <FormControl label="年龄" name="AGE" type="number"  responsive={{xl: 12}}/>
          <FormControl label="性别" name="GENDER" type="radio-group" data={sexdata}  responsive={{xl: 12}}/>
          <FormControl label="户口所在地" name="ADDFM" type="text"  responsive={{xl: 12}}/>
          <FormControl label="客户生日" name="BIRTHDAY" type="date"  responsive={{xl: 12}}/>
          <FormControl label="手机" name="MOBILE" type="number"   responsive={{xl: 12}}/>
          <FormControl label="微信号" name="WX" type="text"   responsive={{xl: 12}}/>
          <FormControl label="QQ" name="QQ" type="number"   responsive={{xl: 12}}/>
          <FormControl label="固定电话号码" name="PHONE" type="text"   responsive={{xl: 12}}/>
          <FormControl label="电子邮箱" name="EMAIL" type="email"   responsive={{xl: 12}}/>
          <FormControl label="家庭地址" name="H_ADDRESS" type="text"   responsive={{xl: 12}}/>
          <FormControl label="工作单位" name="COMPANY" type="text"   responsive={{xl: 12}}/>
          <FormControl label="工作性质" name="CTYPE" type="select" data={GZData}   responsive={{xl: 12}}/>
          <FormControl label="从事行业" name="INDUSTRY" type="text"   responsive={{xl: 12}}/>
          <FormControl label="职务" name="TITLE" type="text"   responsive={{xl: 12}}/>
        </div>

        <div className="form-content" tab="客户标准">
          <FormControl label="婚姻状态" name="MARITAL"  type="select" data={HYData}  responsive={{xl: 12}}/>
          <FormControl label="父母信息" name="P_INFO" type="text"   responsive={{xl: 12}}/>
          <FormControl label="子女信息" name="D_INFO"  type="select" data={CData}  responsive={{xl: 12}}/>
          <FormControl label="兴趣爱好" name="INTEREST" type="text"   responsive={{xl: 12}}/>
          <FormControl label="风险偏好" name="RISK"  type="select" data={FXData}  responsive={{xl: 12}}/>
          <FormControl label="资产规模" name="S_ASSET" type="text"   responsive={{xl: 12}}/>
          <FormControl label="月收入水平" name="INCOME"  type="select" data={SRData}  responsive={{xl: 12}}/>
          <FormControl label="资产构成1" name="C_ASSET1" type="text"   responsive={{xl: 12}}/>
          <FormControl label="资产构成2" name="C_ASSET2" type="text"   responsive={{xl: 12}}/>
          <FormControl label="资产构成3" name="C_ASSET3" type="text"   responsive={{xl: 12}}/>
        </div>
      </FlowForm>
    );
  }

});

module.exports = NoteForm;
