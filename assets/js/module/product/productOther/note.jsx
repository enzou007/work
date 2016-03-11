var React = require('react'),
_ = require("underscore");;
var PropTypes = React.PropTypes;
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx");

  require("rctui/input");
  require("Component/form/Select.jsx");
  require("rctui/datetime");
  var Mock = require("mockjs");
  var pdtypedata =[];
  var CURRENCY = [{id:"01",text:"RMB"},{id:"14",text:"美元"}];
  var product = React.createClass({
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
  //  this.props.action.setField({
  //    LastDate: Mock.Random.now()
  //  });
    // if(this.props.action.getField("Birthday").value === ""){
    //   return false;
    // }else{
    //   return true;
    // }
  },
  afterSubmit: function () {

  },
  getreturn : function (e,d){
    this.props.action.setField({
    //  returncondition: floatprodatavalue[floatprodata.findIndex(x => x == e)]
    CURRENCY:d.text
    });
  },
  render: function() {
    return (
      <FlowForm   onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
          <div className="form-content" tab="基本信息">
            <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
            <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="产品编号" name="prt_id" type="text"  responsive={{xl: 12}}/>
            <FormControl label="产品类别" name="class_id" type="select" data={pdtypedata}  responsive={{xl: 12}}/>
            <FormControl label="产品名称" name="prt_name" type="text"  responsive={{xl: 12}}/>
            <FormControl label="币种" name="cur_name" type="select" data={CURRENCY} onChange={this.getreturn} responsive={{xl: 12}}/>
            <FormControl label="币种代码" name="currency" type="text" responsive={{xl: 12}}/>
            <FormControl label="服务费" name="service_f" type="text" responsive={{xl: 12}}/>
          </div>


      </FlowForm>
    );
  }

});

module.exports = product;
