var fs = require("fs");
var formidable = require("formidable");
var Mock = require("mockjs");

var BASE_PATH = "build/atts/";
var BASE_PATH_TMP = "build/atts/tmp/"

if(!fs.existsSync(BASE_PATH)){
  fs.mkdirSync(BASE_PATH);
}

if(!fs.existsSync(BASE_PATH_TMP)){
  fs.mkdirSync(BASE_PATH_TMP);
}
module.exports = function (req, res, next) {
  if(req.method.toUpperCase() === "POST" && req.url.toLowerCase().indexOf("/1/system/filesystemserver") > -1){
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    var statusCode = 200;
    var result = { info: "ok" }

    var objectId = req.url.match(/filesystemserver\/{0,1}(.*)$/i)[1];
    var form = new formidable.IncomingForm();
    var path = "";
    if(objectId){
      path = BASE_PATH + objectId;
    }else{
      path = BASE_PATH_TMP + Mock.Random.guid();
    }

    if(!fs.existsSync(path)){
      fs.mkdirSync(path);
    }

    path += "/";

    form.uploadDir = path;

    var filePath = path;

    form.parse(req, function(err, fields, files){
      filePath += files.file.name;
      fs.rename(files.file.path, filePath);
      res.statusCode = statusCode;
      result.originPath = filePath.replace("build", "");
      res.end(JSON.stringify(result));
      next();
    });
  }else{
    next()
  }
}
