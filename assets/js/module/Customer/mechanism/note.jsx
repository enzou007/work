var React = require('react');
var PropTypes = React.PropTypes;
var Mock = require("mockjs");
var DataForm = require("View/form/DataForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  FileUp = require("Component/form/FileUp.jsx"),
  Personnel = require("Component/form/Personnel.jsx");
   require("rctui/input");
   require("rctui/datetime");
   require("rctui/select");
   require('Component/form/Radio.jsx');
var Tabs = require("Component/bootstrap/Tabs.jsx");
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
var NoteForm = React.createClass({
  getInitialState: function() {
    return {
      readonly: false
    };
  },
  onCreate: function () {
    // this.props.action.setField({
    //   AgentPsn: this.props.session.get("name"),
    //     CreateDate: Mock.Random.now("yyyy-MM-dd")
    // });
  },
    beforeSubmit: function () {
      // this.props.action.setField({
      //   LastDate: Mock.Random.now()
      // });
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
    <DataForm title="企业客户"  onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>

      <Tabs>
        <div className="form-content" tab="基本信息">
          <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
          <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
          <FormControl label="业务员" name="rp_id" type="personnel"  responsive={{xl: 12}}/>
          <FormControl label="最后修改时间" name="up_date" type="text" readOnly={true} responsive={{xl: 12}}/>
          <FormControl label="客户编号" name="cust_id" type="text"  readOnly={true} responsive={{xl: 12}}/>
          <FormControl label="金融产品代理客户" name="isdl" type="radio-group" data={dldata} responsive={{xl: 12}}/>
          <FormControl label="客户类别" name="cust_type" type="radio-group" data={KHTypedata}  value="潜客" responsive={{xl: 12}}/>
          <FormControl label="公司/企业名称" name="cust_name" type="text" onClick={this.textclick}  responsive={{xl: 12}}/>
          <FormControl label="公司地址" name="s_adds" type="text"   responsive={{xl: 12}}/>
          <FormControl label="单位性质" name="ctype" type="select" data={GZData}   responsive={{xl: 12}}/>
          <FormControl label="从事行业" name="industry" type="text"   responsive={{xl: 12}}/>
          <FormControl label="主要负责人" name="c_person" type="text"   responsive={{xl: 12}}/>
          <FormControl label="联系人" name="c_contacts" type="text"   responsive={{xl: 12}}/>
          <FormControl label="手机" name="mobile" type="number"   responsive={{xl: 12}}/>
          <FormControl label="微信" name="wx" type="text"   responsive={{xl: 12}}/>
          <FormControl label="QQ" name="qq" type="number"   responsive={{xl: 12}}/>
          <FormControl label="电话号码" name="phone" type="text"   responsive={{xl: 12}}/>
          <FormControl label="电子邮箱" name="email" type="text"   responsive={{xl: 12}}/>
          <FormControl label="通讯地址" name="c_adds" type="text"   responsive={{xl: 12}}/>
          <FormControl label="邮编" name="zip" type="text"   responsive={{xl: 12}}/>
          <FormControl label="人数" name="s_number" type="number"   responsive={{xl: 12}}/>
          <FormControl label="所属行业" name="industry" type="text"   responsive={{xl: 12}}/>
          <FormControl label="经营范围" name="w_scope" type="text"   responsive={{xl: 12}}/>
          <FormControl label="经营年限" name="o_life" type="text"   responsive={{xl: 12}}/>
          <FormControl label="有无法院起诉" name="is_prosecution" type="radio-group" data={QSData}   responsive={{xl: 12}}/>
          <FormControl label="客户状态" name="cust_status" type="radio-group" data={KHLXData} value="生效"  responsive={{xl: 12}}/>
          <FormControl label="公司营业执证" name="work_id" type="text"   responsive={{xl: 24}}/>
          <FormControl label="公司营业执证附件"  name="work_id_p" type="file"   responsive={{xl: 24}}/>
          <FormControl label="税务登记号(国税)" name="tax1_id" type="text"   responsive={{xl: 24}}/>
          <FormControl label="税务登记号(国税)"  name="tax1_id_p" type="file"   responsive={{xl: 24}}/>
          <FormControl label="税务登记号(地税)" name="tax2_id" type="text"   responsive={{xl: 24}}/>
          <FormControl label="税务登记号(地税)"  name="tax2_id_p" type="file"   responsive={{xl: 24}}/>
          <FormControl label="组织机构代码" name="org_id" type="text"   responsive={{xl: 24}}/>
          <FormControl label="组织机构代码附件"  name="org_id_p" type="file"   responsive={{xl: 24}}/>
          <FormControl label="银行账户" name="bank_act" type="text"   responsive={{xl: 24}}/>
          <FormControl label="银行账户附件"  name="bank_act_p" type="file"   responsive={{xl: 24}}/>
          <FormControl label="财政登记证号" name="fin_id" type="text"   responsive={{xl: 24}}/>
          <FormControl label="财政登记证附件"  name="fin_id_p" type="file"   responsive={{xl: 24}}/>
          <FormControl label="法人名称" name="rep_name" type="text"   responsive={{xl: 12}}/>
          <FormControl label="法人身份证号" name="rep_id" type="text"   responsive={{xl: 24}}/>
          <FormControl label="法人身份证附件"  name="rep_id_p" type="file"   responsive={{xl: 24}}/>
          <FormControl label="银行流水"  name="bank_list_p" type="file"   responsive={{xl: 24}}/>
          <FormControl label="公司三年的财务报表"  name="f_report_p" type="file"   responsive={{xl: 24}}/>
        </div>
      </Tabs>
          {/*<div className="form-content" tab="企业信息">*/}

            {/*<FormControl label="公司营业执照" name="blicense" type="file"   responsive={{xl: 24}}/>*/}

        {/*}</div>*/}
    </DataForm>

    );
  }

});

module.exports = NoteForm;
