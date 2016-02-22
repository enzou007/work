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
          <FormControl label="最后修改时间" name="UP_DATE" type="date" readOnly={true} responsive={{xl: 12}}/>
          <FormControl label="供应商编号" name="CUST_ID" type="text" responsive={{xl: 12}}/>
          <FormControl label="公司/企业名称" name="CUST_NAME" type="text" onClick={this.textclick}  responsive={{xl: 12}}/>
          <FormControl label="公司地址" name="S_ADDS" type="text"   responsive={{xl: 12}}/>
          <FormControl label="联系人" name="C_CONTACTS" type="text"   responsive={{xl: 12}}/>
          <FormControl label="手机" name="MOBILE" type="number"   responsive={{xl: 12}}/>
          <FormControl label="微信" name="WX" type="text"   responsive={{xl: 12}}/>
          <FormControl label="QQ" name="QQ" type="number"   responsive={{xl: 12}}/>
          <FormControl label="电话号码" name="PHONE" type="text"   responsive={{xl: 12}}/>
          <FormControl label="电子邮箱" name="EMAIL" type="text"   responsive={{xl: 12}}/>
          <FormControl label="通讯地址" name="C_ADDS" type="text"   responsive={{xl: 12}}/>
          <FormControl label="邮编" name="ZIP" type="text"   responsive={{xl: 12}}/>
          <FormControl label="供应商类别" name="CUST_CLASS" type="select" data={KHFLdata}   responsive={{xl: 12}}/>
          <FormControl label="客户状态" name="CUST_STATUS" type="select" data={KHLXData}   responsive={{xl: 12}}/>
          <FormControl label="公司营业执照" name="WORK_ID" type="text"   responsive={{xl: 24}}/>
          <FormControl label="公司营业执照附件"  name="WORK_ID_P" type="file"   responsive={{xl: 24}}/>
          <FormControl label="税务登记号(国税)" name="TAX1_ID" type="text"   responsive={{xl: 24}}/>
          <FormControl label="税务登记号(国税)"  name="TAX1_ID_P" type="file"   responsive={{xl: 24}}/>
          <FormControl label="税务登记号(地税)" name="TAX2_ID" type="text"   responsive={{xl: 24}}/>
          <FormControl label="税务登记号(地税)"  name="TAX2_ID_P" type="file"   responsive={{xl: 24}}/>
        </div>
          {/*<div className="form-content" tab="企业信息">*/}

            {/*<FormControl label="公司营业执照" name="blicense" type="file"   responsive={{xl: 24}}/>*/}

        {/*}</div>*/}
      </FlowForm>

    );
  }

});

module.exports = qy;
