import _ from "underscore";
import $ from "jquery";
import FormAction from 'Action/form';
import Immutable from 'immutable';
import { Store, msg } from 'iflux';
import { urlParamToObject } from 'Util/Strings';

import Config from './defaultConfig'

class Action extends FormAction{
  _nodeIdMap = {};
  isShowNodeIfo = true;
  _postList = null;
  _roleList = null;
  _moduleList = null;
  init(){
    $.get("/1/system/module").done(data => {
      let parentMap = {};
      let appList = [];
      _.each(data, mdl => {
        if(mdl.path.indexOf("system") === -1){
          if(mdl.parent){
            mdl.parent = parentMap[mdl.parent];
            appList.push(mdl);
          }else{
            parentMap[mdl.objectId] = mdl.name;
          }
        }
      });
      this._moduleList = appList;
    });

    $.get("/1/system/role").done(data => {
      this._roleList = _.map(data, item => {
        return {
          id: item["@objectId"],
          text: item.RoleName
        }
      })
    })
    $.get("/1/system/position").done(data => {
      this._postList = _.map(data, item => {
        return {
          id: item["@objectId"],
          text: item.PositionName
        }
      })
    })
  }
  getDefaultStore(){
    return {
      flow: Config.getDefaultFlowInfo(),
      form: {}
    }
  }
  setField(key, val) {
    if (key == null) return this;
    val = this.parseValue(key, val);
    if (typeof key === 'object') {
      this.getStore().cursor().get("form").merge(val);
    } else {
      this.getStore().cursor().get("form").set(key, val);
    }
    return this;
  }
  getFormData(){
    return this.getStore().data().get("form");
  }
  isNewNote(){
    return !this._param.objectId;
  }
  getObjectId(){
    return this._param.objectId || "";
  }
  getPath(){
    return this._param.path;
  }

  bindFlowMap(flowMap){
    this._flowMap = flowMap;
  }
  bindDocument(){
    if(!this.isNewNote()){
      $.get(`${this.getPath()}/${this.getObjectId()}`).then(data => {
        this.getStore().cursor().get("flow").mergeDeep(data);
        _.each(data.nodes, node => {
           this._nodeIdMap[node.unid] = node.id;
         })
      })
    }
  }
  saveFlow(){
    let flowMapInfo = this._flowMap.getValue(this._nodeIdMap).toJS();
    let flowInfo = this.getStore().data().get("flow").toJS();

    _.each(flowInfo.nodes, (node, index) => {
      _.extend(node, _.find(flowMapInfo,(item) => {
        return item.unid === node.unid;
      }))
    });

    return $.post(`${this.getPath()}/${this.getObjectId()}`, {content:JSON.stringify(flowInfo)});
  }

  getModuleList(){
    return this._moduleList;
  }
  getPostList(){
    return this._postList;
  }
  getRoleList(){
    return this._roleList;
  }
  addNode(type, x, y){
    let newNode = Config.getDefaultNode(type, x, y, this.getNewNodeId());
    this._nodeIdMap[newNode.get("unid")] = newNode.get("id");
    this.getStore().cursor().get("flow").get("nodes").push(newNode);
  }
  activeNode(unid, nodeId){
    let newData = null;
    let flowStore = this.getStore().data().get("flow");

    if(unid === "__flow"){
      newData = flowStore.delete("nodes");
    }else{
      newData = flowStore.get("nodes").find(node => {
        return node.get("unid") === unid;
      });
      this.activeNodeId = nodeId;
    }
    if(!newData.equals(this.getStore().data().get("form"))){
      if(this.isShowNodeIfo){
        this.getStore().cursor().set("form",newData);
      }
    }
  }
  clearNodeInfo(){
    this.getStore().reset("form");
  }
  setIsShowNodeInfo(checked){
    this.isShowNodeIfo = checked;
    if(!checked){
      this.clearNodeInfo();
    }
  }
  saveNodeInfo(){
    var newNodeData = this.getStore().data().get("form");
    if(newNodeData.get("@type")){
      if(this.validateNode(newNodeData)){
        this.getStore().cursor().get("flow").get("nodes").set(this.getNodeIndexByUnid(newNodeData.get("unid")), newNodeData);
        this._nodeIdMap[newNodeData.get("unid")] = newNodeData.get("id");
        this.activeNodeId = newNodeData.get("id");
      }
    }else{
      this.getStore().cursor().get("flow").merge(newNodeData);
    }
  }
  validateNode(newNode){
    if(this.activeNodeId !== newNode.get("id") && this.getNodeIndexById(newNode.get("id")) > -1){
      return false;
    }
    return true;
  }
  removeNode(unid){
    this.getStore().cursor().get("flow").get("nodes").delete(this.getNodeIndexByUnid(unid));
    delete this._nodeIdMap[unid];
  }
  getNodeIndexByUnid(unid){
    return this.getStore().data().get("flow").get("nodes").findIndex(node => {
      return node.get("unid") === unid;
    });
  }
  getNodeIndexById(id){
    return this.getStore().data().get("flow").get("nodes").findIndex(node => {
      return node.get("id") === id;
    });
  }
  getNewNodeId(){
    let ids = [];
    this.getStore().data().get("flow").get("nodes").forEach(node => {
      if(node["@type"] !== "text"){
        if((/\d/).test(node.get("id"))){
          ids.push(+node.get("id").replace(/\D/g, ""))
        }
      }
    })
    if(ids.length === 0){
      return "node1";
    }
    ids.sort(function(a, b) {return a < b});
    return "node" + (+ids[0] + 1);
  }
  getParentNodes(curNode){
    let filterNodeIds = curNode.get("outputs").toJS();
    let rejectNodes = this.getStore().data().get("flow").get("nodes")
      .filter(node => {
        if(filterNodeIds.indexOf(node.get("id")) > -1){
          filterNodeIds.push(node.get("id"));
          return false;
        }
        if(node.get("unid") !== curNode.get("unid")){
          return node.get("@type") === "start" || node.get("@type") === "task";
        }
        return false;
      })
      .map(node => {
        return {
          id: node.get("id"),
          text: node.get("name")
        }
      }).toJS();
    return rejectNodes;
  }
}

export default new Action(urlParamToObject(location.search.substring(1)))
