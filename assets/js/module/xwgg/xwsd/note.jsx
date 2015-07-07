var React = require("react");

var ReactUI = require("rctui");
var FormTest = ReactUI.Form;
var FormControl = ReactUI.FormControl;
var FormSubmit = ReactUI.FormSubmit;
var Input = ReactUI.Input;

var Form = React.createClass({
    render: function () {
        return (
            <FormTest layout="aligned" autoload={true} action="json/form.json">
              <FormControl name="text" label="text" type="text" width={12} min={2} max={6} />

              <FormSubmit>
                <span>提交</span>
                <span>处理中</span>
              </FormSubmit>
            </FormTest>
        );
    }
});

module.exports = Form;

/*

var React = require("react"),
    Tabs = require("../../../component/bootstrap/Tabs.jsx"),
    DatePicker = require("../../../component/bootstrap/DatePicker.jsx"),
    Dept = require("../../../component/form/dept.jsx"),
    Psn = require("../../../component/form/psn.jsx");


var Form = React.createClass({
    render: function () {
        return (
            <div>
                <div id="navbar" className="navbar navbar-default">navbar</div>
                <form className="container form-horizontal" role="form">
                    <Tabs triggerLink={true}>
                        <div tab="基本信息" className="form-content">
                            <fieldset>
                                <legend>Form表单</legend>
                                
                                <div className="form-group">
                                    <label className="control-label col-md-2 col-sm-2">文本文本文本</label>
                                    <div className="col-md-4 col-sm-10">
                                        <input className="width-100" type="text"/>
                                    </div>
                                    <label className="control-label col-md-2 col-sm-2">日期文本文本</label>
                                    <div className="col-md-4 col-sm-10">
                                        <input className="width-100" type="text"/>
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label className="control-label col-md-2 col-sm-2">文本</label>
                                    <div className="col-md-4 col-sm-10">
                                        <input className="width-100" type="text"/>
                                    </div>
                                    <label className="control-label col-md-2 col-sm-2">日期</label>
                                    <div className="col-md-4 col-sm-10">
                                        <DatePicker />
                                        
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-2 col-sm-2">人员</label>
                                    <div className="col-md-4 col-sm-10">
                                        <Psn />
                                    </div>
                                    <label className="control-label col-md-2 col-sm-2">组织</label>
                                    <div className="col-md-4 col-sm-10">
                                        <Dept />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-md-2 col-sm-2">其他</label>
                                    <div className="col-md-10 col-sm-10">
                                        <input className="width-100" type="text"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-md-2 col-sm-2">其他</label>
                                    <div className="col-md-10 col-sm-10">
                                        <textarea className="width-100" rows="3"></textarea>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Form表单</legend>
                                <div className="form-group">
                                    <label for="disabledSelect"  className="col-sm-2 control-label">表名</label>
                                    <div className="col-sm-10">
                                        <select id="disabledSelect" className="form-control">
                                            <option>禁止选择</option>
                                            <option>禁止选择</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>                            
                        </div>
                        <div tab="附件" className="form-content">
                        
                            附件
                        </div>
                    </Tabs>
                </form>
            </div>
        );
    }
});

module.exports = Form;
*/
