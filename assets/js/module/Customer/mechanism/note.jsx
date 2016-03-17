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
var zjtype = ["社会信用代码","营业执照"];
var QSData =["有","无"];
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
    this.props.action.setField({
      AgentPsn: this.props.session.get("name"),
        CreateDate: Mock.Random.now("yyyy-MM-dd")
    });
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
    <DataForm title="机构客户"  onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>

      <Tabs>
        <div className="form-content" tab="基本信息">
          <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true} />
          <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true}/>
          <FormControl label="业务员" name="salesman" type="personnel"  required={true} />
          <FormControl label="最后修改时间" name="lastModified" type="text" readOnly={true}/>
          <FormControl label="客户状态" name="customerStatus" type="radio-group" data={KHLXData} value="生效" />
        </div>
        <div className="form-content" tab="客户信息">
            <FormControl label="客户编号" name="CustomerId" type="text"  readOnly={true}/>
            <FormControl label="公司/企业名称" name="nameOfFirm" type="text" required={true}  onClick={this.textclick} />
            <FormControl label="客户类型" name="CustomerType" type="select" data={KHTypedata}  value="潜客"/>
            <FormControl label="金融产品代理客户" name="isFinancialProducts" type="radio-group"  required={true} data={dldata} value="否"/>
            <FormControl label="证件类型" name="documentType" type="select" required={true} data={zjtype} />
            <FormControl label="证件号码" name="identificationNumber" required={true} type="text"  />
            <FormControl label="公司地址" name="companyAddress" type="text" required={true}  responsive={{xl: 24}}  />
            <FormControl label="主要负责人" name="principal" type="text"  required={true}  />
            <FormControl label="法人名称" name="nameOfJudicialPerson" type="text"  />
            <FormControl label="法人身份证号" name="idNumber" type="text" />
            <FormControl label="银行账户" name="bankAccount" type="number"  />
        </div>
        <div className="form-content" tab="联系方式">
          <FormControl label="联系人" name="contacts" type="text"  required={true}  />
          <FormControl label="手机" name="mobile" type="number"  required={true}  />
          <FormControl label="微信" name="wx" type="text"  />
          <FormControl label="QQ" name="qq" type="number"  />
          <FormControl label="电话号码" name="phone" type="text"  />
          <FormControl label="电子邮箱" name="email" type="text"  />
          <FormControl label="邮编" name="zipCode" type="text"  />
          <FormControl label="通讯地址" name="postalAddress" type="text"  responsive={{xl: 24}}  />
        </div>
        <div className="form-content" tab="其他">
          <FormControl label="人数" name="numberOfPeople" type="number"  />
          <FormControl label="所属行业" name="industry" type="text"  />
          <FormControl label="经营范围" name="scopeOfBusiness" type="text"  />
          <FormControl label="经营年限" name="operationPeriod" type="text"  />
          <FormControl label="有无法院起诉" name="ThereIsNoCourt" type="radio-group" data={QSData}  />
          <FormControl label="证照附件"  name="accordingToAnnex" type="file"   responsive={{xl: 24}}/>
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
