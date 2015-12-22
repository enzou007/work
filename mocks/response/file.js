var fs = require("fs");
var _ = require("underscore");
var Paging = require("./Paging");

function File(path) {
  this._filePath = path;
  if(fs.existsSync(path)){
    this._data = JSON.parse(fs.readFileSync(path));
  }else{
    this._data = [];
    fs.open(path, "a", function(err, fd){
      fs.writeFileSync(path, "[]");
    });
  }
}

_.extend(File.prototype, {
  getData: function(){
    return this._data;
  },
  setData: function(newData){
    this._data = newData;
  },
  getDataByPage: function(page, count, condition){
    return Paging(this.getData(), page, count, condition);
  },
  add: function(doc){
    this._data.push(doc);
  },
  updateByObjectId: function(newDoc){
    return _.extend(this.findByObjectId(newDoc["@objectId"]), newDoc);
  },
  delete: function(cb){
    var newData = [];
    _.each(this.getData(), function(doc){
      if(!cb(doc)){
        newData.push(doc)
      }
    });
    this.setData(newData);
  },
  deleteByObjectId: function(objectIds){
    this.delete(function(doc){
      return objectIds.indexOf(doc["@objectId"]) > -1;
    })
  },
  find: function(cb){
    return _.find(this.getData(), cb);
  },
  filter: function(cb){
    return _.filter(this.getData(), cb);
  },
  findByObjectId: function(objectId){
    return this.find(function(doc){
      return doc["@objectId"] === objectId;
    })
  },
  save: function (data) {
    fs.writeFileSync(this._filePath, JSON.stringify(data || this._data));
    //重新加载文件, 切断所用对象的引用关系.
    this.reload();
  },
  reload: function (filePath) {
    this._data = JSON.parse(fs.readFileSync(filePath || this._filePath));
  }
})
module.exports = File;
