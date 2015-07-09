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
var FormSubmit = require("rctui/FormSubmit");
var Input = require("rctui/Input");
var Select = require("rctui/Select");
var DateTime = require("rctui/Datetime");

//var DEMO = FlowFormBase.extend({
var DEMO = React.createClass({
  TestClick: function(e){
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
      <Dropdown className="btn btn-inverse" value="按钮">
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
      <Flow operateBtns={this.getOperateBtn()}>
          <Tabs>
            <div tab="基本信息" className="form-content">
                <Fieldset title="Form表单">
                  <FormControl type="text"  min={4} label="申 请 人" className="col-md-6"/>
                  <FormControl type="date"   label="申请日期" className="col-md-6"/>
                  <FormControl type="select" label="性别" className="col-md-6" mult={false} data={["男","女"]}/>
                  <FormControl type="number"   label="年龄" className="col-md-6"/>
                  <FormControl type="select" label="部门领导" className="col-md-6" src="/1/system/user/search" mult={true} filterAble={true}/>
                  <FormControl type="select" label="所属部门" className="col-md-6" data={["1","2","3","4"]} mult={false} filterAble={true}/>
                  <FormControl type="text"   label="部门" className="col-md-6">
                    <Dept />
                  </FormControl>
                  <Dropdown className="btn btn-inverse" value="按钮">
                    <ul onClick={this.TestClick}>
                      <li><a href="#">111111</a></li>
                      <li><a href="#">222222</a></li>
                      <li className="divider"></li>
                      <li><a href="#">333333</a></li>
                    </ul>
                  </Dropdown>

                  <Dropdown className="btn btn-inverse" value="按钮" clickMenuClose={false}>
                    <ul onClick={this.TestClick}>
                      <li><a href="#">444</a></li>
                      <li><a href="#">555</a></li>
                      <li className="divider"></li>
                      <li><a href="#">666</a></li>
                    </ul>
                  </Dropdown>


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
