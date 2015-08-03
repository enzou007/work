import _ from "underscore";
import $ from "jquery";
import { Store, msg } from 'iflux';

const actions = [];

export default class Action {
  constructor(param) {
    this.id = param.id;
    this.uniqueId = _.uniqueId('form_action_');
    this._param = param;
    this._store = Store(this.getDefaultStore());
    this._controls = [];

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
    msg.on(`${this.uniqueId}:${name}`, callback);
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
}

export function findAction(predicate) {
  return _.find(actions, predicate);
}

export function getAction(id) {
  return _.findWhere(actions, { id });
}
