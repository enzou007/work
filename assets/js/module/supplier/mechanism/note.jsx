var React = require('react');
var PropTypes = React.PropTypes;
var Mock = require("mockjs");
var DataForm = require("View/form/DataForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  FileUp = require("Component/form/FileUp.jsx");
require("rctui/input");
require("rctui/datetime");
require("rctui/select");
require('Component/form/Radio.jsx');
var zjtype = ["社会信用代码","营业执照"];
var Tabs = require("Component/bootstrap/Tabs.jsx");
var KHLXData =["生效","冻结"];
var KHFLdata=["个人供应商","企业供应商"];
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
    this.props.action.setField({
      AgentPsn: this.props.session.get("name"),
      CreateDate: Mock.Random.now("yyyy-MM-dd")
    });
  },
    beforeSubmit: function () {

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
      <DataForm  title ="供应商" onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
        <Tabs>
          <div className="form-content" tab="基本信息">
            <FormControl label="创建时间" name="CreateDate" type="text" readOnly={true} />
            <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true}/>
            <FormControl label="最后修改时间" name="lastModified" type="text" readOnly={true}/>
            <FormControl label="供应商状态" name="supplierStatus" type="radio-group" data={KHLXData} value="生效" />
          </div>
          <div className="form-content" tab="供应商信息">
            <FormControl label="供应商编号" name="supplierNumber" type="text"  readOnly={true}/>
            <FormControl label="公司/企业名称" name="nameOfFirm" type="text" required={true} />
            <FormControl label="证件类型" name="documentType" type="select" data={zjtype} required={true} />
            <FormControl label="证件号码" name="identificationNumber" type="text" required={true} />
            <FormControl label="公司地址" name="companyAddress" type="text" required={true} responsive={{xl: 24}} />
            <FormControl label="联系人" name="contacts" type="text"  />
            <FormControl label="手机" name="mobile" type="number"  />
            <FormControl label="微信" name="wx" type="text"  />
            <FormControl label="QQ" name="qq" type="number"  />
            <FormControl label="电话号码" name="phone" type="text"  />
            <FormControl label="电子邮箱" name="email" type="text"  />
            <FormControl label="邮编" name="zipCode" type="text"  />
            <FormControl label="通讯地址" name="postalAddress" type="text"  responsive={{xl: 24}} />
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

module.exports = qy;
