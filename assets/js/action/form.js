import _ from "underscore";
import $ from "jquery";
import { Store, msg } from 'iflux';

const actions = [];

export default class Action {
  constructor(param = {}) {
    this.id = param.id;
    this.uniqueId = _.uniqueId('form_action_');
    this._param = param;
    this._store = Store(this.getDefaultStore());
    this._controls = [];
    this._events = [];

    actions.push(this);
  }
  getDefaultStore() {
    return {};
  }
  getParam() {
    return this._param;
  }
  getStore() {
    return this._store;
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
    this._controls.push(element);
  }
  unregisterControl(element) {
    this._controls.splice(_.indexOf(this._controls, element), 1);
  }
  validateAll() {
    return _.every(this._controls, function (element) {
      return element.validate();
    })
  }
  destroy() {
    _.forEach(this._events, function (name) {
      msg.removeListener(name);
    });
    actions.splice(_.indexOf(actions, this), 1);
  }
  setField(key, val) {
    if (key == null) return this;

    let attrs;
    if (typeof key === 'object') {
      attrs = key;
    } else {
      (attrs = {})[key] = val;
    }

    this.getStore().cursor().mergeDeep(attrs);
    return this;
  }
}

export function findAction(predicate) {
  return _.find(actions, predicate);
}

export function getAction(id) {
  return _.findWhere(actions, { id });
}
