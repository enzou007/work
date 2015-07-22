import _ from "underscore";
import $ from "jquery";

const LOCAL_CACHE_MAP = {};
const LOCAL_CACHE = [];

const action = {
  params: [],
  handles: [],
  _batchRequest: _.debounce(function () {

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
      url: "1/system/user",
      headers: {
        "Condition": JSON.stringify([["objectId", "in", objectIds]])
      }
    }).done(resp => {
      // 由于可能存在objectId不存在的情况，此处需要逐步比对respone和objectId
      let response = resp.slice(0);
      while (handle = handles.shift()) {
        let objectId = params.shift(),
          data = response[0];
        if (data.objectId === objectId) {
          handle.resolve(response.shift());
        } else {
          handle.resolve({
            objectId: objectId,
            id: "未知用户",
            name: "未知用户"
          });
        }
      }

      return resp;
    }).fail(resp => {
      while (handle = handles.shift()) {
        handle.reject(resp);
      }
    });

  }, 50),
  fetch(objectId) {
    // 对于数组参数，使用Promise.all直接封装
    if (_.isArray(objectId)) {
      return Promise.all(objectId.map(item => {
        return this.fetch(item);
      }));
    }
    // 从缓存中直接获取数据
    if (LOCAL_CACHE_MAP[objectId]) {
      return Promise.resolve(LOCAL_CACHE_MAP[objectId]);
    }

    let promise = new Promise((resolve, reject) => {
      this.params.push(objectId);
      this.handles.push({
        resolve, reject
      });
    });

    this._batchRequest();

    return promise;
  },
  query(key, limit = 10) {
    return $.ajax({
      url: "1/system/user",
      headers: {
        "Condition": JSON.stringify([["@key", "lk", key]])
      },
      data: {
        limit
      }
    });
  }
};

export default action;
