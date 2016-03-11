var React = require('react'),
_ = require("underscore");
var PropTypes = React.PropTypes;
var DataForm = require("View/form/DataForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx");

  require("rctui/input");
   require("rctui/datetime");
 require("Component/form/Personnel.jsx");
var Product = React.createClass({
  getInitialState: function() {
    return {
      readonly: false
    };
  },
  onCreate: function () {
      this.props.action.setField({
        AgentPsn: this.props.session.get("name"),
        CreateDate: "2015-07-21",
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
      <DataForm  >
          <div className="form-content" tab="基本信息">
            <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
            <FormControl label="创建人" name="AgentPsn" type="personnel" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="类别代码" name="class_id" type="text"  responsive={{xl: 12}}/>
            <FormControl label="类别名称" name="class_name" type="text"  responsive={{xl: 12}}/>
            <FormControl label="类别层级" name="class_level" type="number"  responsive={{xl: 12}}/>
            <FormControl label="上级类别代码" name="p_class_id" type="text"  responsive={{xl: 12}}/>
          </div>


      </DataForm>
    );
  }

});

module.exports = Product;
