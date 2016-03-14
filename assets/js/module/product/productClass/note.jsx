var React = require('react'),
_ = require("underscore");
var PropTypes = React.PropTypes;
var DataForm = require("View/form/DataForm.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  FormControl = require("Component/form/FormControl.jsx");

require("rctui/input");
require("rctui/datetime");
require("Component/form/Select.jsx");
var Mock = require("mockjs");
var pdata = [];
var Product = React.createClass({
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
    //this.props.action.setField({
    //  pdnum: Mock.Random.now()
    //});
    // if(this.props.action.getField("Birthday").value === ""){
    //   return false;
    // }else{
    //   return true;
    // }
  },
  render: function() {
    return (
      <DataForm  title="产品类别" onCreate={this.onCreate} >
        <Fieldset title="基本信息">
          <FormControl label="创建时间" name="CreateDate" type="text" readOnly={true}  responsive={{xl: 12}}/>
          <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
          <FormControl label="类别代码" name="class_id" type="text"  responsive={{xl: 12}}/>
          <FormControl label="类别名称" name="class_name" type="text"  responsive={{xl: 12}}/>
          <FormControl label="编号" name="class_level" type="number"    responsive={{xl: 12}}/>
          <FormControl label="归属层级" name="p_class_id"  type="select" data={pdata} responsive={{xl: 12}}/>
        </Fieldset>
      </DataForm>
    );
  }

});

module.exports = Product;
