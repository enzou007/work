var React = require("react");
var $ = require("jquery");
var Gritter = require('Component/Gritter.jsx');
var DataForm = require("View/form/DataForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx");

require("rctui/input");
require("Component/form/Personnel.jsx");
require("Component/form/Department.jsx");

var RoleForm = React.createClass({

  onCreate: function () {

  },
  beforeSubmit: function () {
    var action = this.props.action;
    if(action.isNewNote()){
      var url = action.getPath() + "/unique";
      var value = action.getField("RoleID").value;
      var flag = true;
      $.ajax({
         type: "GET",
         url: url,
         async: false,
         data: {key:"RoleID", value: value},
         dataType: "json",
         success: function(result){
           flag = result.status === "none";
         }
      });
      if(!flag){
        this.showMessage();
      }
      return flag;
    }
  },
  render: function () {
    return (
      <DataForm onCreate={this.onCreate} onBeforeSubmit={this.beforeSubmit} title="角色管理">
        <div className="form-content" tab="基本信息">
          <Fieldset title="基本信息">
            <FormControl label="角色名称" name="RoleName" type="text" responsive={{xl: 12}}/>
            <FormControl label="角色编号" name="RoleID" type="text" responsive={{xl: 12}}/>
            <FormControl label="部门" name="Departments" mult={true} type="department" responsive={{xl: 24}}/>
            <FormControl label="人员" name="Personnels" mult={true} type="personnel" responsive={{xl: 24}}/>
          </Fieldset>
        </div>
      </DataForm>
    );
  },
  showMessage: function(){
    let id = Gritter.add({
      title: '提示',
      time: 1500,
      class_name: "gritter-light gritter-error",
      after_close: () => {
        Gritter.remove(id);
      },
      text: (
        <div>
          <h5>角色编号重复,请重新填写!</h5>
          <div style={{textAlign: "right"}}>
            <a className="btn btn-sm btn-primary" onClick={() => Gritter.remove(id)}>确定</a>
          </div>
        </div>
      )
    })
  }
});

module.exports = RoleForm;
