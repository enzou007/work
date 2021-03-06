import React from 'react';
import { List, Set } from 'immutable';

import Action from 'Action/form';
import Form from 'Component/form/Form.jsx';
import FormControl from 'Component/form/FormControl.jsx';
import Modal from 'Component/bootstrap/Modal.jsx';

import 'Component/form/Select.jsx';
import 'Component/form/Department.jsx';
import 'Component/form/Personnel.jsx';
import 'rctui/input';

import 'Less/component/acl-processors.less'

export default class ACLProcessors extends React.Component{
  static defaultProps = {
    action: new Action()
  }
  state = {
    data: this.props.value || new List()
  }
  componentWillMount() {
    this.props.action.on("close", () => {
      this._modal.close();
    })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      data: nextProps.value
    });
  }
  getValue(){
    return this.state.data;
  }
  render() {
    return (
      <div className="acl-processors">
        <div className="processor-toolbar">
          <i className="fa fa-plus processor-add" onClick={this.addProcessor.bind(this)}>添加</i>
        </div>
        <div className="form-control">
          { this.state.data.map((item, index) => {
              return (
                <div className="result" key={index} onClick={this.editProcessor.bind(this, item, index)}>
                  <div title={item.get("label")} className="context">{item.get("label")}</div>
                  <i title="删除" className="fa fa-close" onClick={this.deleteProcessor.bind(this, index)}></i>
                </div>
              )
          })}
        </div>
      </div>
    );
  }
  addProcessor(){
    this.props.action.getStore().reset();
    this.props.action.getStore().cursor().set("@c", ProcessorsType[0].id);
    this.openModalBox();
  }
  editProcessor(data, index){
    let processor = this.props.action.getStore();
    processor.reset();
    processor.cursor().merge(data);
    processor.cursor().set("__index", index);
    this.openModalBox();
  }
  deleteProcessor(index, event){
    event.preventDefault();
    event.stopPropagation();
    let data = this.state.data.delete(index);
    this.setState({
      data: data
    })
    if(this.props.onChange){
      this.props.onChange(data);
    }
  }
  openModalBox(){
    this._modal = Modal.create(
      <ProcessorsForm channel={this.props.action} store={this.props.action.getStore()} form="" onSubmit={this.saveProcessor.bind(this)}
        roleList={this.props.channel.getRoleList()}/>
    , {backdrop: true}, document.getElementById("form"))
  }
  saveProcessor(){
    this._modal.close();
    let processor = this.props.action.getStore().data().delete("Base");

    let data;
    if(processor.has("__index")){
      data = this.state.data.set(processor.get("__index"), processor.delete("__index"));
    }else{
      data = this.state.data.push(processor);
    }
    this.setState({
      data: data
    })

    if(this.props.onChange){
      this.props.onChange(data, processor);
    }
  }
}

const ProcessorsType = [{
  id: ".UserProcessor", text: "人员"
}, {
  id: ".RoleProcessor", text: "角色"
}, {
  id: ".DepartmentProcessor", text: "部门"
}]

const ProcessorsForm = React.createClass({
  __index : null,
  _roleName: "",
  componentWillMount() {
    this.setRelatedDepartment();
  },
  setRelatedDepartment(){
    let data = this.props.store.data();
    if(data.get("@c") === ".DepartmentProcessor"){
      this.props.store.cursor().set("relatedDepartment", Set.of(data.get("relatedDepartment")));
    }else if(data.get("@c") === ".RoleProcessor"){
      this._roleName = data.get("label").replace("[Role]: ", "");
    }
  },
  componentDidMount() {
    this.props.store.onStoreChange((nextState, path) => {
      if (this.isMounted()) {
        this.replaceState(nextState);
      }
    });
    if(this.props.store.data().has("__index")){
      this.__index = this.props.store.data().get("__index");
    }
  },
  render () {
    let type = this.props.store.data().get("@c");
    return (
      <Form layout="aligned" channel={this.props.channel} store={this.props.store.data()} responsive={{xl:20}} onSubmit={this.handleSubmit}>
        <div className="modal-header">
          <button type="button" className="close" onClick={this.closeModal}>
            <span aria-hidden="true">×</span>
          </button>
          <h4 className="modal-title">处理人配置</h4>
        </div>

        <div className="modal-body">
          <FormControl label="类型" name="@c" type="select" data={ProcessorsType} onChange={this.processorChange}/>
          <FormControl label="姓名" name="userIds" type="personnel" mult={true} show={type === ".UserProcessor"} />
          <FormControl label="部门" name="relatedDepartment" type="department" show={type === ".DepartmentProcessor"}/>
          <FormControl label="角色" name="roleId" type="select" data={this.props.roleList} show={type === ".RoleProcessor"} onChange={this.roleChange}/>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-default btn-sm" onClick={this.closeModal}>取消</button>
          <button type="submit" className="btn btn-primary btn-sm">确定</button>
        </div>
      </Form>
    );
  },
  closeModal() {
    this.props.channel.emit('close');
  },
  handleSubmit(){
    let data = this.props.store.data();
    let result = {}
    switch (data.get("@c")) {
      case ".DepartmentProcessor":
          result.label = "[Dept]: " + this.props.channel.getField("relatedDepartment")._control.getFullValue().toJS()[0].name;
          result.relatedDepartment = data.get("relatedDepartment").toList().get(0);
        break;
      case ".RoleProcessor":
        result.label = "[Role]: " + this._roleName;
        break;
      case ".UserProcessor":
        result.label = "[User]: " + this.props.channel.getField("userIds")._control.getFullValue().map(user => {
          return user.name;
        }).join(",");
        break;
    }
    this.props.store.cursor().merge(result);
    this.props.onSubmit();
  },
  processorChange(value){
    this._roleName = "";
    this.props.store.reset();
    this.props.store.cursor().set("@c", value);
    if(this.__index !== null){
      this.props.store.cursor().set("__index", this.__index);
    }
  },
  roleChange(value, data){
    this._roleName = data.text;
  },
  postChange(value, data){
    this._postName = data.text;
  }
});

FormControl.register('acl', function (props) {
  return <ACLProcessors {...props}/>
}, ACLProcessors, 'List');
