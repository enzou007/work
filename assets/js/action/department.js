import _ from 'underscore';
import $ from 'jquery';
import { Iterable } from 'immutable';

const CACHE_NAME = "DEPARTMENT_CACHE";
const CACHE_DURING = 1000 * 60 * 60 * 24; //1天
const WRITE_DURING = 1000 * 60; //1分钟
//TODO 优化缓存, byParent, auery
class Action {
  params = []
  handles = []
  cache = new Iterable.Keyed(this.getLocalStorage())
  mixinCache(data) {
    this.cache = this.cache.concat(_.reduce(data, function (memo, item) {
      memo[item["@objectId"]] = _.extend({
        $timeStamp: item.$tiemStamp || _.now()
      }, item);
      return memo;
    }, {}));
    this.setLocalStorage();
  }
  getLocalStorage() {
    let now = _.now();
    return _.chain(JSON.parse(localStorage.getItem(CACHE_NAME)) || [])
      .filter(function (item) {
        return item.$timeStamp + CACHE_DURING > now;
      })
      .reduce(function (memo, item) {
        memo[item["@objectId"]] = item;
        return memo;
      }, {}).value();
  }
  setLocalStorage = _.throttle(() => {
    let now = _.now();
    localStorage.setItem(CACHE_NAME, JSON.stringify(_.filter(this.cache.toArray(), function (item) {
      return item.$timeStamp + CACHE_DURING > now;
    })));
  }, WRITE_DURING)
  _batchRequest = _.debounce(function () {

    let params = this.params.slice(),
      handles = this.handles.slice(),
      objectIds = _.reduce(params, function (memo, item) {
        if (_.isArray(item)) {
          memo.push(...item);
        } else {
          memo.push(item);
        }
        return memo;
      }, []);

    let handle = null;
    $.ajax({
      url: '1/system/department',
      headers: {
        'Condition': JSON.stringify([['@objectId', 'in', objectIds]])
      }
    }).done(resp => {
      this.mixinCache(resp);

      while (handle = handles.shift()) {
        let objectId = params.shift();
        handle.resolve(this.cache.get(objectId, {
          objectId: objectId,
          id: '未知部门',
          name: '未知部门'
        }));
      }

      return resp;
    }).fail(resp => {
      while (handle = handles.shift()) {
        handle.reject(resp);
      }
    });

    this.params = [];
    this.handles = [];

  }, 50)
  fetch(objectId) {
    // 对于数组参数，使用Promise.all直接封装
    if (_.isArray(objectId)) {
      return Promise.all(objectId.map(item => {
        return this.fetch(item);
      }));
    }
    // 从缓存中直接获取数据
    if (this.cache.has(objectId)) {
      return Promise.resolve(this.cache.get(objectId));
    }

    let promise = new Promise((resolve, reject) => {
      this.params.push(objectId);
      this.handles.push({
        resolve, reject
      });
    });

    this._batchRequest();

    return promise;
  }
  query(key, region, limit = 10) {
    return $.ajax({
      url: '1/system/department',
      headers: {
        'Condition': JSON.stringify([
          ['@key', 'lk', encodeURIComponent(key)],
          ['@region', 'in', region]
        ])
      },
      data: {
        limit
      }
    }).then((resp) => {
      this.mixinCache(resp);
      return resp;
    });
  }
  byParent(parent) {
    return $.ajax({
      url: '1/system/department',
      headers: {
        'Condition': JSON.stringify([
          ['parent', '=', parent]
        ])
      }
    }).then((resp) => {
      this.mixinCache(resp);
      return resp;
    });
  }
};

export default new Action();
