var React = require("react");
var $ = require("jquery");
var _ = require("underscore");
var DataForm = require("View/form/DataForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx");
require("rctui/input");
require("Component/form/Select.jsx");
var ModuleForm = React.createClass({
  getInitialState: function() {
    return {
      modules: []
    };
  },
  componentWillMount: function(){
    let curObjectId = this.props.action.getStore("form").get("@objectId");
    $.get("/1/system/module").done(data => {
      let appList = _.filter(data, mdl => {
        if(mdl["@objectId"] === curObjectId){
          return false;
        }
        return mdl.parent === "null" || (!mdl.parent)
      })
      appList.unshift({
        name: "根目录",
        "@objectId": "null",
        path: ""
      })
      this.setState({
        modules: appList
      });
    });
  },
  render: function () {
    return (
      <DataForm onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} title="菜单管理">
        <div className="form-content" tab="基本信息">
          <Fieldset title="基本信息">
            <FormControl label="名称" name="name" type="text"/>
            <FormControl label="父级" name="parent" type="select" data={this.state.modules}
              filterAble={true} optionTpl='<i class="{ico}"></i>  {name}-{path}' resultTpl="{name}" valueTpl="{@objectId}"/>
            <FormControl label="编号" name="@objectId" type="text"/>
            <FormControl label="路径" name="path" type="text"/>
            <FormControl label="排序" name="sort" type="text"/>
            <FormControl label="图标" name="ico" type="text"/>
          </Fieldset>
        </div>
      </DataForm>
    );
  }
});

module.exports = ModuleForm;
