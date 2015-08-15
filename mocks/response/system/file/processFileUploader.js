var fs = require("fs");
var formidable = require("formidable");
var Mock = require("mockjs");

var ROOT_PATH = __dirname.replace(/mocks.*$/, "").replace(/\\/g, "/");

var BASE_PATH = "build/atts/";
var BASE_PATH_TMP = "build/atts/tmp/"

if(!fs.existsSync(BASE_PATH)){
  fs.mkdirSync(BASE_PATH);
}

if(!fs.existsSync(BASE_PATH_TMP)){
  fs.mkdirSync(BASE_PATH_TMP);
}
module.exports = function (data, req, res) {

  var form = new formidable.IncomingForm();
  var path = "";
  if(data.params && data.params.objectId){
    path = BASE_PATH + data.params.objectId;
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
  });
  console.log(filePath);
  return {
    json: {"originPath": filePath.replace("build/","")},
    status: 200
  }
}
