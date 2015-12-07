var React = require("react");
var Mock = require("mockjs");

var DataForm = require("View/form/DataForm.jsx"),
  FormControl = require("Component/form/FormControl.jsx"),
  Tabs = require("Component/bootstrap/Tabs.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx");
require("Component/form/Radio.jsx");
require("Component/form/Checkbox.jsx");

require("rctui/input");
require("rctui/select");
require("Less/app/workflow.less");
var WorkflowForm = React.createClass({

  render: function () {
    return (
      <div className="workflow">
        <div className="page-header">
  				<h1>请假申请流程 </h1>
  			</div>
        <div className="rowaaa" style={{height:"600px"}}>
          <ul className="wf_sidebar dropdown-menu dropdown-info">
            <li><b>操作栏</b></li>
            <li className="divider"></li>
						<li><a href="#">开始</a></li>
						<li><a href="#">处理环节</a></li>
						<li><a href="#">条件节点</a></li>
            <li><a href="#">合并节点</a></li>
            <li><a href="#">并行节点</a></li>
            <li><a href="#">结束</a></li>
					</ul>
          <div className="wf_content">

          </div>
        </div>
      </div>
    );
  }
});

module.exports = WorkflowForm;
