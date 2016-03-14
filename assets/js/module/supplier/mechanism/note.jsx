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
      <DataForm   onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
        <Tabs>
          <div className="form-content" tab="基本信息">
            <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
            <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="最后修改时间" name="up_date" type="text" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="供应商编号" name="cust_id" type="text"  readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="公司/企业名称" name="cust_name" type="text" onClick={this.textclick}  responsive={{xl: 12}}/>
            <FormControl label="公司地址" name="s_adds" type="text"   responsive={{xl: 12}}/>
            <FormControl label="联系人" name="c_contacts" type="text"   responsive={{xl: 12}}/>
            <FormControl label="手机" name="mobile" type="number"   responsive={{xl: 12}}/>
            <FormControl label="微信" name="wx" type="text"   responsive={{xl: 12}}/>
            <FormControl label="QQ" name="qq" type="number"   responsive={{xl: 12}}/>
            <FormControl label="电话号码" name="phone" type="text"   responsive={{xl: 12}}/>
            <FormControl label="电子邮箱" name="email" type="text"   responsive={{xl: 12}}/>
            <FormControl label="通讯地址" name="c_adds" type="text"   responsive={{xl: 12}}/>
            <FormControl label="邮编" name="zip" type="text"   responsive={{xl: 12}}/>
            <FormControl label="供应商类别" name="cust_class" type="radio-group" data={KHFLdata}   responsive={{xl: 12}}/>
            <FormControl label="客户状态" name="cust_status" type="radio-group" data={KHLXData}   responsive={{xl: 12}}/>
            <FormControl label="公司营业执证" name="work_id" type="text"   responsive={{xl: 24}}/>
            <FormControl label="公司营业执证附件"  name="work_id_p" type="file"   responsive={{xl: 24}}/>
            <FormControl label="税务登记号(国税)" name="tax1_id" type="text"   responsive={{xl: 24}}/>
            <FormControl label="税务登记号(国税)"  name="tax1_id_p" type="file"   responsive={{xl: 24}}/>
            <FormControl label="税务登记号(地税)" name="tax2_id" type="text"   responsive={{xl: 24}}/>
            <FormControl label="税务登记号(地税)"  name="tax2_id_p" type="file"   responsive={{xl: 24}}/>
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
