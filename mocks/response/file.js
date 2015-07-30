var fs = require("fs");

function File(path) {
  var data = JSON.parse(fs.readFileSync(path));

  this.getData = function () {
    return data;
  }

  this.add = function (obj) {
    data.push(obj);
  }

  this.save = function () {
    fs.writeFileSync(path, JSON.stringify(data));
    //重新加载文件, 切断所用对象的引用关系.
    this.reload();
  }

  this.reload = function () {
    data = JSON.parse(fs.readFileSync(path));
  }
}

module.exports = File;
