var React = require('react');
import '../../../../less/app/OrgMain.less';
var OrgMain = React.createClass({

  render: function() {
    return (
      <div className="org-main">
        <h1 className="org-title">组织管理系统</h1>
        <div className="hr hr32 hr-dotted"></div>
        <div className="row">
          <div className="col-sm-7 infobox-container">
    				<div className="infobox infobox-green">
              <div className="infobox-icon">
              <i className="fa fa-home fa-2"></i>
            </div>
    					<div className="infobox-data">
    						<span className="infobox-data-number">349</span>
    						<div className="infobox-content">部门数量</div>
    					</div>
    				</div>
            <div className="infobox infobox-blue">
              <div className="infobox-icon">
              <i className="fa fa-user-plus fa-2"></i>
            </div>
    					<div className="infobox-data">
    						<span className="infobox-data-number">235</span>
    						<div className="infobox-content">岗位数量</div>
    					</div>
    				</div>
            <div className="infobox infobox-pink">
              <div className="infobox-icon">
              <i className="fa fa-users fa-2"></i>
            </div>
    					<div className="infobox-data">
    						<span className="infobox-data-number">200</span>
    						<div className="infobox-content">角色数量</div>
    					</div>
    				</div>
            <div className="infobox infobox-red">
              <div className="infobox-icon">
              <i className="fa fa-user fa-2"></i>
            </div>
    					<div className="infobox-data">
    						<span className="infobox-data-number">200</span>
    						<div className="infobox-content">员工数量</div>
    					</div>
    				</div>
            <div className="space-6"></div>
            <div className="btn btn-info btn-lg org-btn">
              <i className="ace-icon fa fa-home"></i>
              新建部门
            </div>
            <div className="btn btn-info btn-lg org-btn">
              <i className="ace-icon fa fa-user-plus"></i>
              新建岗位
            </div>
            <div className="btn btn-info btn-lg org-btn">
              <i className="ace-icon fa fa-users"></i>
              新建角色
            </div>
            <div className="btn btn-info btn-lg org-btn">
              <i className="ace-icon fa fa-user"></i>
              新建人员
            </div>
    			</div>
          <div className="col-sm-5">
            图表
          </div>
        </div>
        <div className="hr hr32 hr-dotted"></div>
        <div className="org-search">
					<div className="input-group">
						<input className="form-control input-mask-product" id="form-field-mask-3" type="text"/>

						<span className="input-group-addon">
							<i className="fa fa-search"></i>
						</span>
					</div>
				</div>
      </div>
    );
  }

});

module.exports = OrgMain;
