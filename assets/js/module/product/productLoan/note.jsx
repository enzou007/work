var React = require('react'),
_ = require("underscore");;
var PropTypes = React.PropTypes;
var FlowForm = require("View/form/FlowForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx");
  require("rctui/input");
  require("rctui/select");
   require("rctui/datetime");
  var Mock = require("mockjs");
  var pdtypedata =["投资","贷款","移民","注册","其他"]
  var floatprodata =["指数型","股票型","新股型","港股新股","对冲基金","混合型","定增型"];
var floatprodatavalue =["0.85","0.8","0.9","0.9","0.95","0.9","0.85"];
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
  render: function() {
    return (
      <FlowForm   onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} onSubmit={this.afterSubmit}  readOnly={this.state.readonly}>
          <div className="form-content" tab="基本信息">
            <FormControl label="创建时间" name="CreateDate" type="date" readOnly={true}  responsive={{xl: 12}}/>
            <FormControl label="创建人" name="AgentPsn" type="text" readOnly={true} responsive={{xl: 12}}/>
            <FormControl label="产品编号" name="pdnum" type="text"  responsive={{xl: 12}}/>
            <FormControl label="产品类别" name="pdtype" type="select" data={pdtypedata}  responsive={{xl: 12}}/>
            <FormControl label="产品名称" name="pdname" type="text"  responsive={{xl: 12}}/>
            <FormControl label="贷款银行" name="mbank" type="text" responsive={{xl: 12}}/>
            <FormControl label="服务费" name="startingpoint" type="number"  responsive={{xl: 12}}/>
            <FormControl label="理财师提点位" name="financialplanner" type="number"  responsive={{xl: 12}}/>
          </div>
      </FlowForm>
    );
  }

});

module.exports = product;
