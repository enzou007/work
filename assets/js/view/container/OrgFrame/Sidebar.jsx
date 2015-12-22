import React from 'react';
import action from "Action/viewFrame";
import $ from 'jquery';

import Scroll from 'Component/Scrollbar.jsx'
import OrganizationTree from 'Component/form/OrganizationTree.jsx';
import clickAway from 'rctui/src/js/higherorder/clickaway';
@clickAway
export default class Sidebar extends React.Component {
  state={
    openContextMenu: false,
    treeFilter: "",
    contextMenuTop: 0,
    contextMenuLeft: 0,
  }
  _deptId = ""
  _deptName = ""
  componentDidMount() {
    this.updateScrollbar();
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.openContextMenu) {
      this.bindClickAway();
    } else {
      this.unbindClickAway();
    }
    this.updateScrollbar();
  }
  updateScrollbar(){
    if(!this.refScroll){
      this.refScroll = this.refs.ref_scroll;
    }
    this.refScroll.updateScrollbar();
  }
  componentClickAway() {
    if(this.state.openContextMenu){
      this.setState({
        openContextMenu: false
      });
    }
  }
  render () {
    return (
      <div>
        <div className="orgTree-header">
          <div className="orgTree-title">组织树</div>
          <div className="orgTree-search input-group">
  					<input className="form-control" ref="ref_search_text" onKeyDown={this.triggerEnter.bind(this)}/>
  					<span className="input-group-btn">
  						<button className="btn btn-sm btn-default" type="button" onClick={this.searchOrg.bind(this)}>
  							<i className="icon-calendar bigger-110"></i>查询
  						</button>
  					</span>
          </div>
          <div className="orgTree-divider" onClick={this.toggleShowSearchBox.bind(this)}><i className="fa fa-search"></i></div>
        </div>
        <Scroll ref="ref_scroll" id="orgTree" style={{height: this.props.maxHeight+"px", width:"100%"}} className="panel-body ex3" autoshow={true}>
          <OrganizationTree value={[""]} onClick={this.changeOrgTree.bind(this)} filter={this.state.treeFilter}
            onDoubleClick={this.DoubleClick.bind(this)} onRightClick={this.RightClick.bind(this)}/>
          {
            this.state.openContextMenu ?
              <ul className="dropdown-menu orgTree-contextMenu" style={{top: this.state.contextMenuTop + "px", left: this.state.contextMenuLeft + "px"}}>
                <li><b>{this._deptName}</b></li>
                <li className="divider"></li>
                <li><a onClick={this.contextMenuClick.bind(this, "department", "modify")}>修改部门</a></li>
  							<li><a onClick={this.contextMenuClick.bind(this, "department", "create")}>新建部门</a></li>
  							<li><a onClick={this.contextMenuClick.bind(this, "personnel", "create")}>新建人员</a></li>
  						</ul>
              : null
          }
        </Scroll>
      </div>
    );
  }
  changeOrgTree(item) {
    action.triggerSearch([["departmentId", "=", item["@objectId"]]]);
    $("#currentItemName").text(item.name);
    this.componentClickAway();
    action._activeDeptId = item["@objectId"];
    this.updateScrollbar();
  }
  triggerEnter(event){
    if(event.keyCode === 13){
      this.searchOrg();
    }
  }
  searchOrg() {
    this.setState({
      treeFilter: this.refs.ref_search_text.getDOMNode().value
    }, () => {this.updateScrollbar();});
  }
  RightClick(event, id, name){
    this._deptId = id;
    this._deptName = name;
    this.setState({
      openContextMenu: true,
      contextMenuTop: event.clientY,
      contextMenuLeft: event.clientX + 10
    });
  }
  DoubleClick(event, id, name){
    window.open(action.getOption().formURL.department+"&objectId=" + id);
  }
  contextMenuClick(form, type){
    this.componentClickAway();
    if(type==="create"){
      window.open(action.getOption().formURL[form]+"&parent=" + this._deptId);
    }else{
      window.open(action.getOption().formURL[form]+"&objectId=" + this._deptId);
    }
  }
  toggleShowSearchBox(){
    $(".orgTree-search").toggleClass("orgTree-search-show");
    $(".orgTree-divider i").toggleClass("fa-angle-right");
    if(!$(".orgTree-search").hasClass("orgTree-search-show")){
      this.setState({
        treeFilter: ""
      })
    }else{
      this.refs.ref_search_text.getDOMNode().focus();
    }
  }
}
