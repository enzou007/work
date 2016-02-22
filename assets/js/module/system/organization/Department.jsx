var React = require("react");
var $ = require("jquery");
var DataForm = require("View/form/DataForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  Grid = require("Component/form/Grid.jsx").Grid,
  Column = require("Component/form/Grid.jsx").Column,
  PersonnelAction = require("Action/personnel.js");

require("Component/form/Radio.jsx");
require("Component/form/Checkbox.jsx");
require("Component/form/Personnel.jsx");
require("Component/form/Select.jsx");
require("rctui/input");

var DepartmentForm = React.createClass({
  getInitialState: function() {
    return {
      showTable: false
    };
  },
  getGridForm: function () {
    return (
      <div>
        <FormControl label="岗位名称" name="StPostName" type="select"  required={true}
          optionTpl="{PositionName}" valueTpl="{PositionName}" data={this.getPostList()} filterAble={true}
          onChange={function(val, data){this.channel.setField("StPostID",data.PositionID)}}/>
        <FormControl label="岗位编号" name="StPostID" type="text" readOnly={true}/>
        <FormControl label="人员" name="StPostPsn" type="personnel"  required={true} mult={true}/>
        <FormControl label="是否继承" name="StPostExtend" type="radio-group"  data={["是", "否"]} value="否"/>
      </div>
    );
  },
  showTable: function(){
    if(this.state.showTable === false){
      this.setState({showTable: true});
    }
  },
  renderPsnCell: function(cellData){
    if(!this.psnAction){
      this.psnAction = new PersonnelAction();
    }
    var text = [];
    this.psnAction.syncFetch(cellData.toArray(), function(data) {
      for(var i = 0; i < data.length; i++) {
        text.push(data[i].name);
      }
    });
    return text.join("; ");
  },
  render: function () {
    return (
      <DataForm title="部门信息">
        <Tabs>
          <div className="form-content" tab="基本信息">
            <Fieldset title="基本信息">
              <FormControl label="部门编号" name="@objectId" type="text"/>
              <FormControl label="部门名称" name="name" type="text"/>
              <FormControl label="简称" name="shortName" type="text"/>
            </Fieldset>
          </div>
          <div className="form-content" tab="岗位信息" onShow={this.showTable}>
            <Fieldset title="岗位明细">
              <FormControl name="StPsotData" type="grid" responsive={{xl: 24}} show={this.state.showTable}>
                <Grid height={500} form={this.getGridForm()} uniqueKey={["StPostID"]}>
                  <Column label="岗位名称" width={0.2} dataKey="StPostName"/>
                  <Column label="岗位编号" width={0.2} dataKey="StPostID"/>
                  <Column label="人员" width={0.5} dataKey="StPostPsn" cellRenderer={this.renderPsnCell}/>
                  <Column label="是否继承" width={0.1} dataKey="StPostExtend"/>
                </Grid>
              </FormControl>
            </Fieldset>
          </div>
        </Tabs>
      </DataForm>
    );
  },
  getPostList: function(){
    if(!this._PostList){
      $.ajax({
         type: "GET",
         url: "1/system/position",
         async: false,
         data:{page:0, count:0},
         dataType: "json",
         success: (data) => {
           this._PostList = data
         }
      });
    }
    return this._PostList;
  }
});

module.exports = DepartmentForm;
