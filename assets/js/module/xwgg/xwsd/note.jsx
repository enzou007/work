"use strict";

var React = require("react"),
    Tabs = require("../../../component/bootstrap/Tabs.jsx"),
    Dropdown = require("../../../component/bootstrap/Dropdown.jsx"),
    Fieldset = require("../../../component/form/Fieldset.jsx"),
    //FlowFormBase = require("../../../component/form/FlowFormBase.jsx"),
    Dept = require("../../../component/form/Dept.jsx");

var Flow = require("../../../view/form/Flow.jsx");

var Form = require("rctui/Form");
var FormControl = require("rctui/FormControl");
//var FormSubmit = require("rctui/FormSubmit");
var Input = require("rctui/Input");
var Select = require("rctui/Select");
var DateTime = require("rctui/Datetime");

//var DEMO = FlowFormBase.extend({
var DEMO = React.createClass({
  TestClick: function(e){
    console.log("11111111111111111111111111111111111111111111111")
  },
  beferSubmit: function(){
    return true;
  },
  getOperateBtn: function(){
    var OperateBtn = [];
    OperateBtn.push(
      <Dropdown className="btn btn-inverse" value="按钮">
        <ul onClick={this.TestClick}>
          <li><a href="#">111111</a></li>
          <li><a href="#">222222</a></li>
          <li className="divider"></li>
          <li><a href="#">333333</a></li>
        </ul>
      </Dropdown>
    );

    OperateBtn.push(
      <Dropdown className="btn btn-inverse" value="按钮aaa" clickMenuClose={false}>
        <ul onClick={this.TestClick}>
          <li><a href="#">111111</a></li>
          <li><a href="#">222222</a></li>
          <li className="divider"></li>
          <li><a href="#">333333</a></li>
        </ul>
      </Dropdown>
    )
    return OperateBtn;
  },
  render: function () {

    return (
      <Flow>
          <Tabs>
            <div tab="基本信息" className="form-content">
                <Fieldset title="Form表单">
                  <FormControl type="text" name="StPsn" min={4} label="申 请 人" className="col-sm-6"/>
                  <FormControl type="date" name="StDate"   label="申请日期" className="col-sm-6"/>
                  <FormControl type="select" name="StSex"  label="性别" className="col-sm-6" mult={false} data={["男","女"]}/>
                  <FormControl type="number" name="StAge"   label="年龄" className="col-sm-6"/>
                  <FormControl type="select" name="StLeader" label="部门领导" className="col-sm-12" src="/1/system/user/search" mult={true} filterAble={true}/>
                  <FormControl type="select" name="StDept" label="所属部门" className="col-sm-6" data={["1","2","3","4"]} mult={false} filterAble={true}/>

                    <FormControl type="text"   name="StDept1" label="部门" className="col-sm-6">
                      <Dept />
                    </FormControl>

                </Fieldset>
            </div>

            <div tab="基本信息" className="form-content">

            </div>

          </Tabs>
      </Flow>
    );
  }
});

module.exports = DEMO;
