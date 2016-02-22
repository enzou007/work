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
var KHTypedata =["潜客","交易客户"];
var KHLXData =["生效","冻结"];
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
  render: function() {
    return (
      <FlowForm   onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
        <div className="form-content" tab="基本信息">
          <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
          <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="负责人" name="FZPsn" type="text"  responsive={{xl: 12}}/>
            <FormControl label="最后修改时间" name="LastDate" type="date" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="客户编号" name="KHNum" type="text" responsive={{xl: 12}}/>
            <FormControl label="金融产品代理客户" name="isdl" type="select" data={dldata} responsive={{xl: 12}}/>
            <FormControl label="客户类型" name="KHType" type="select" data={KHTypedata}   responsive={{xl: 12}}/>
            <FormControl label="公司/企业名称" name="qyname" type="text"   responsive={{xl: 12}}/>
            <FormControl label="公司地址" name="qyadds" type="text"   responsive={{xl: 12}}/>
            <FormControl label="人数" name="peoplenum" type="number"   responsive={{xl: 12}}/>
            <FormControl label="所属行业" name="Industry" type="text"   responsive={{xl: 12}}/>
            <FormControl label="经营范围" name="sbusiness" type="text"   responsive={{xl: 12}}/>
            <FormControl label="客户状态" name="KHLX" type="select" data={KHLXData}   responsive={{xl: 12}}/>
            <FormControl label="公司营业执照" name="clicensetxt" type="text"   responsive={{xl: 24}}/>
            <FormControl label="公司营业执照附件"  name="clicense" type="file"   responsive={{xl: 24}}/>
            <FormControl label="税务登记号(国税)" name="statetaxtxt" type="text"   responsive={{xl: 24}}/>
            <FormControl label="税务登记号(国税)"  name="statetax" type="file"   responsive={{xl: 24}}/>
            <FormControl label="税务登记号(地税)" name="landtaxtxt" type="text"   responsive={{xl: 24}}/>
            <FormControl label="税务登记号(地税)"  name="landtax" type="file"   responsive={{xl: 24}}/>
            <FormControl label="组织机构代码" name="Organizationcodetxt" type="text"   responsive={{xl: 24}}/>
            <FormControl label="组织机构代码附件"  name="Organizationcode" type="file"   responsive={{xl: 24}}/>
            <FormControl label="银行账户" name="bankaccounttxt" type="text"   responsive={{xl: 24}}/>
            <FormControl label="银行账户附件"  name="bankaccount" type="file"   responsive={{xl: 24}}/>
            <FormControl label="财政登记证号" name="frcnumbertxt" type="text"   responsive={{xl: 24}}/>
            <FormControl label="财政登记证附件"  naf vvmYX me="frcnumber" type="file"   responsive={{xl: 24}}/>
            <FormControl label="法人身份证号" name="licnumbertxt" type="text"   responsive={{xl: 24}}/>
            <FormControl label="法人身份证附件"  name="licnumber" type="file"   responsive={{xl: 24}}/>
            <FormControl label="银行流水"  name="bankrunning" type="file"   responsive={{xl: 24}}/>
            <FormControl label="公司三年的财务报表"  name="tyfstatements" type="file"   responsive={{xl: 24}}/>
          </div>
          {/*<div className="form-content" tab="企业信息">*/}

            {/*<FormControl label="公司营业执照" name="blicense" type="file"   responsive={{xl: 24}}/>*/}

        {/*}</div>*/}
      </FlowForm>

    );
  }

});

module.exports = qy;
