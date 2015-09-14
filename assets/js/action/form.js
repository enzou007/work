import _ from "underscore";
import $ from "jquery";
import { Map, List, Set } from 'immutable';
import { Store, msg } from 'iflux';

const actions = [];

export default class Action {
  constructor(param = {}) {
    this.id = param.id;
    this.uniqueId = _.uniqueId('form_action_');
    this._param = param;
    this._store = Store(this.getDefaultStore());
    this._controls = new Map();
    this._events = [];

    actions.push(this);
  }
  getDefaultStore() {
    return {
      module: {},
      fields: {}
    };
  }
  getParam() {
    return this._param;
  }
  getStore() {
    return this._store;
  }
  getModuleId() {
    return this.getParam().moduleId;
  }
  bindModule() {
    return $.get(`1/system/module/${this.getModuleId()}`).done(resp => {
      this.getStore().cursor().get("module").merge(resp);
      return resp;
    });
  }
  on(name, callback) {
    let eventName = `${this.uniqueId}:${name}`;
    this._events.push(eventName);
    msg.on(eventName, callback);
    return this;
  }
  emit(name, ...arg) {
    msg.emit(`${this.uniqueId}:${name}`, ...arg);
  }
  registerControl(element) {
    this._controls = this._controls.set(element.props.name, element);
  }
  unregisterControl(element) {
    this._controls = this._controls.remove(element.props.name);
  }
  validateAll() {
    let flag = true
    this._controls.forEach(function (element) {
      if(!element.validate()){
        flag = false;
      };
    });
    return flag;
  }
  destroy() {
    _.forEach(this._events, function (name) {
      msg.removeListener(name);
    });
    actions.splice(_.indexOf(actions, this), 1);
  }
  parseValue(key, val){
    if (typeof key === 'object') {
      let result = {};
      _.forEach(key, (item, name) => {
        result[name] = this.parseValue(name, item);
      });
      return result;
    } else {
      let valueType = this._controls.get(key).state.valueType;
      switch (valueType) {
        case 'List':
          if (!List.isList(val)) {
            return new List(val);
          }
          break;
        case 'Set':
          if (!Set.isSet(val)) {
            return new Set(val);
          }
          break;
        default:
          if (_.isFunction(val.toJS)) {
            return val.toJS();
          }
      }
      return val;
    }
  }
  setField(key, val) {
    if (key == null) return this;

    val = this.parseValue(key, val);
    if (typeof key === 'object') {
      this.getStore().cursor().merge(val);
    } else {
      this.getStore().cursor().set(key, val);
    }

    return this;
  }
  setField(key, val) {
    if (key == null) return this;

    val = this.parseValue(key, val);
    if (typeof key === 'object') {
      this.getStore().cursor().get("fields").merge(val);
    } else {
      this.getStore().cursor().get("fields").set(key, val);
    }
    return this;
  }
}

export function findAction(predicate) {
  return _.find(actions, predicate);
}

export function getAction(id) {
  return _.findWhere(actions, { id });
}
