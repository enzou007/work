import _ from 'underscore';
import $ from 'jquery';
import { Iterable } from 'immutable';

class Action {
  params = []
  handles = []
  cache = new Iterable.Keyed()
  _batchRequest = _.debounce(function () {

    let params = this.params.slice(0),
      handles = this.handles.slice(0),
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
        'Condition': JSON.stringify([['objectId', 'in', objectIds]])
      }
    }).done(resp => {

      this.cache = this.cache.concat(_.reduce(resp, function (memo, item) {
        memo[item.objectId] = item;
        return memo;
      }, {}));

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
  query(key, limit = 10) {
    return $.ajax({
      url: '1/system/department',
      headers: {
        'Condition': JSON.stringify([['@key', 'lk', encodeURIComponent(key)]])
      },
      data: {
        limit
      }
    });
  }
  children(parent){
    return $.ajax({
      url: `1/system/department/${encodeURI(parent)}/@child`
    });
  }
};

export default Action;
