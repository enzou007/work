import _ from 'underscore';
import $ from 'jquery';
import { Iterable } from 'immutable';

const CACHE_NAME = "DEPARTMENT_CACHE";
const CACHE_DURING = 1000 * 60 * 60 * 24; //1天

class Action {
  params = []
  handles = []
  static cache = null
  constructor() {
    this.setCache(this.getLocalStorage().data || []);
  }
  getLocalStorage() {
    let now = _.now();
    let cacheItem = JSON.parse(localStorage.getItem(CACHE_NAME));
    if(cacheItem!=null && cacheItem.timeStamp + CACHE_DURING > now){
      return cacheItem;
    }
    return {};
  }
  setLocalStorage = _.debounce((data) => {
    localStorage.setItem(CACHE_NAME, JSON.stringify({
      timeStamp: _.now(),
      data
    }));
  }, 100)
  setCache(data) {
    if(this.cache == null || this.cache.size == 0){
      this.__proto__.cache = new Iterable.Keyed(_.reduce(data, function (memo, item) {
        memo[item.id] = item;
        return memo;
      }, {}));
    }
    return this;
  }
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

    return Promise.resolve(this.load().then(() => {
      return this.cache.get(objectId);
    }));
  }
  query(key, region, limit = 10) {
    return $.ajax({
      url: '1/system/department',
      headers: {
        'Region': region
      },
      data: {
        key,
        limit
      }
    });
  }
  children(parentId) {
    const cacheFilter = () => {
      return this.cache.reduce(function (memo, item) {
        if(item.parent == parentId){
          memo.push(item);
        }
        return memo;
      }, []);
    }

    if(this.cache.size > 0){
      return Promise.resolve(cacheFilter());
    }

    return Promise.resolve(this.load().then(() => {
      return cacheFilter();
    }));
  }
  load = (() => {
    let reqs = {};
    return (id = "") => {
      if(!reqs[id]){
        reqs[id] = $.get(`1/system/department/tree/${id}`).then(resp => {
          this.setCache(resp).setLocalStorage(resp);
          delete reqs[id];
        });
      }
      return reqs[id];
    };
  })()
};

export default Action;
