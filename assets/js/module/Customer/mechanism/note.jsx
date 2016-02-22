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
var KHTypedata =["潜客","有效潜客","成交客户"];
var KHLXData =["生效","冻结"];
var QSData =["有","无"];
var GZData = ["国营","民营","外资","合资","政府机关"];
var KHFLdata=["个人客户","企业客户"];
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
    textclick:function(e){
      //alert(this.props.action.getField("qyname").value);
      //this.props.action.setField({
      //  qyname: Mock.Random.now()
      //});
      //this.props.action.setField(qyname:"999999");
    },
  render: function() {
    return (
      <FlowForm   onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
        <div className="form-content" tab="基本信息">
          <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
          <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
          <FormControl label="业务员" name="RP_ID" type="text"  responsive={{xl: 12}}/>
          <FormControl label="最后修改时间" name="UP_DATE" type="date" readOnly={true} responsive={{xl: 12}}/>
          <FormControl label="客户编号" name="CUST_ID" type="text" responsive={{xl: 12}}/>
          <FormControl label="金融产品代理客户" name="isdl" type="select" data={dldata} responsive={{xl: 12}}/>
          <FormControl label="客户类别" name="KHType" type="select" data={KHTypedata}   responsive={{xl: 12}}/>
          <FormControl label="客户分类" name="KHType" type="select" data={KHFLdata}   responsive={{xl: 12}}/>
          <FormControl label="公司/企业名称" name="CUST_NAME" type="text" onClick={this.textclick}  responsive={{xl: 12}}/>
          <FormControl label="公司地址" name="S_ADDS" type="text"   responsive={{xl: 12}}/>
          <FormControl label="单位性质" name="CTYPE" type="select" data={GZData}   responsive={{xl: 12}}/>
          <FormControl label="从事行业" name="INDUSTRY" type="text"   responsive={{xl: 12}}/>
          <FormControl label="主要负责人" name="C_PERSON" type="text"   responsive={{xl: 12}}/>
          <FormControl label="联系人" name="C_CONTACTS" type="text"   responsive={{xl: 12}}/>
          <FormControl label="手机" name="MOBILE" type="number"   responsive={{xl: 12}}/>
          <FormControl label="微信" name="WX" type="text"   responsive={{xl: 12}}/>
          <FormControl label="QQ" name="QQ" type="number"   responsive={{xl: 12}}/>
          <FormControl label="电话号码" name="PHONE" type="text"   responsive={{xl: 12}}/>
          <FormControl label="电子邮箱" name="EMAIL" type="text"   responsive={{xl: 12}}/>
          <FormControl label="通讯地址" name="C_ADDS" type="text"   responsive={{xl: 12}}/>
          <FormControl label="邮编" name="ZIP" type="text"   responsive={{xl: 12}}/>
          <FormControl label="人数" name="S_NUMBER" type="number"   responsive={{xl: 12}}/>
          <FormControl label="所属行业" name="Industry" type="text"   responsive={{xl: 12}}/>
          <FormControl label="经营范围" name="W_SCOPE" type="text"   responsive={{xl: 12}}/>
          <FormControl label="经营年限" name="O_LIFE" type="text"   responsive={{xl: 12}}/>
          <FormControl label="有无法院起诉" name="IS_PROSECUTION" type="select" data={QSData}   responsive={{xl: 12}}/>
          <FormControl label="客户状态" name="CUST_STATUS" type="select" data={KHLXData}   responsive={{xl: 12}}/>
          <FormControl label="公司营业执照" name="WORK_ID" type="text"   responsive={{xl: 24}}/>
          <FormControl label="公司营业执照附件"  name="WORK_ID_P" type="file"   responsive={{xl: 24}}/>
          <FormControl label="税务登记号(国税)" name="TAX1_ID" type="text"   responsive={{xl: 24}}/>
          <FormControl label="税务登记号(国税)"  name="TAX1_ID_P" type="file"   responsive={{xl: 24}}/>
          <FormControl label="税务登记号(地税)" name="TAX2_ID" type="text"   responsive={{xl: 24}}/>
          <FormControl label="税务登记号(地税)"  name="TAX2_ID_P" type="file"   responsive={{xl: 24}}/>
          <FormControl label="组织机构代码" name="ORG_ID" type="text"   responsive={{xl: 24}}/>
          <FormControl label="组织机构代码附件"  name="ORG_ID_P" type="file"   responsive={{xl: 24}}/>
          <FormControl label="银行账户" name="BANK_ACT" type="text"   responsive={{xl: 24}}/>
          <FormControl label="银行账户附件"  name="BANK_ACT_P" type="file"   responsive={{xl: 24}}/>
          <FormControl label="财政登记证号" name="FIN_ID" type="text"   responsive={{xl: 24}}/>
          <FormControl label="财政登记证附件"  naf vvmYX me="FIN_ID_P" type="file"   responsive={{xl: 24}}/>
          <FormControl label="法人名称" name="REP_NAME" type="text"   responsive={{xl: 12}}/>
          <FormControl label="法人身份证号" name="REP_ID" type="text"   responsive={{xl: 24}}/>
          <FormControl label="法人身份证附件"  name="REP_ID_P" type="file"   responsive={{xl: 24}}/>
          <FormControl label="银行流水"  name="BANK_LIST_P" type="file"   responsive={{xl: 24}}/>
          <FormControl label="公司三年的财务报表"  name="F_REPORT_P" type="file"   responsive={{xl: 24}}/>
        </div>
          {/*<div className="form-content" tab="企业信息">*/}

            {/*<FormControl label="公司营业执照" name="blicense" type="file"   responsive={{xl: 24}}/>*/}

        {/*}</div>*/}
      </FlowForm>

    );
  }

});

module.exports = qy;
