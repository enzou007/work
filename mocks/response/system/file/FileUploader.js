var fs = require("fs");
var formidable = require("formidable");
var Mock = require("mockjs");
//var UEConfig = require("./richTextConfig.js");

var BASE_PATH = "build/atts/";
var BASE_PATH_TMP = "build/atts/tmp/"

function Uploader(req, res, next) {
  var _url = req.url.toLowerCase();
  if(req.method.toUpperCase() === "POST" && _url.indexOf("/1/system/filesystemserver") > -1){
    //附件控件上传处理
    res.setHeader("Content-Type", "application/json; charset=utf-8");
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
      res.statusCode = "200";
      result.originPath = filePath.replace("build", "");
      res.end(JSON.stringify(result));
      next();
    });
  }else if(_url.indexOf("/1/system/richtextserver") > -1){
    //文本编辑器内附件处理
    var result;
    switch (req.query.action.toLowerCase()) {
      case "config":
        result = require("./richTextConfig.js");
        break;
      case 'uploadimage':
        //由于上载是异步执行, 所以由saveFile处理response;
        saveFile("image", req, res, next);
        return true;
      /* 上传涂鸦 */
      case 'uploadscrawl':
        saveFile("scrawl", req, res, next);
        return true;
      /* 上传视频 */
      case 'uploadvideo':
        saveFile("video", req, res, next);
        return true;
      /* 上传文件 */
      case 'uploadfile':
        saveFile("file", req, res, next);
        return true;

      /* 列出图片 */
      case 'listimage':
      /* 列出文件 */
      case 'listfile':
        result = getFileList();
        break;

      /* 抓取远程文件 */
      case 'catchimage':
        //TODO
        break;
      default:
        result = {"state": "请求错误!"}
        break;
    }

    //输出处理结果
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.statusCode = "200";
    res.end(JSON.stringify(result));
    next()
  }else if(_url.indexOf("atts") > -1){
    //atts目录下文件请求设置为文件下载, atts/ueditor目录除外.
    if(_url.indexOf("atts/ueditor") === -1){
      //res.setHeader("Content-Type", "application/force-download");
      res.setHeader("Content-Disposition", "attachment")
      //res.end();
    }
    next()
  }else{
    next()
  }
}

function saveFile(action, req, res, cb) {
  var form = new formidable.IncomingForm();
  var filePath = BASE_PATH + "ueditor/" + action + "/";

  form.uploadDir = filePath;

  form.parse(req, function(err, fields, files){

    var file = files.upfile;
    fs.rename(file.path, filePath + file.name);
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.statusCode = "200";

    var result = {
      state : "SUCCESS",
      url: (filePath + file.name).replace("build", ""),
      title: file.name,
      original: file.name,
      type: file.type,
      size: file.size
    };
    res.end(JSON.stringify(result));
    cb();
  });

}

function getFileList() {
  // TODO 未知用途
  return {}
}

module.exports = Uploader;
