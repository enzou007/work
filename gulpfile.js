var gulp = require("gulp"),
  gutil = require("gulp-util"),
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  changed = require("gulp-changed");

var path = require("path");

var browserSync = require("browser-sync"),
  reload = browserSync.reload;

// 合并css
var less = require("gulp-less"),
  LessPluginAutoPrefix = require('less-plugin-autoprefix'),
  autoprefix = new LessPluginAutoPrefix({
    browsers: ["last 2 versions"]
  });
gulp.task("less", function() {
  return gulp.src(["assets/less/main.less", "assets/less/ace/ace.less"])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(less({
      modifyVars: {
        "bower-components": "\"../lib\""
      },
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest("./build/css"))
    .pipe(reload({
      stream: true
    }));
});

// 处理bower的包
var mainBowerFiles = require("main-bower-files"),
  bowerNormalizer = require("gulp-bower-normalize");
gulp.task("bower", function() {
  return gulp.src(mainBowerFiles(), {
      base: "bower_components"
    })
    .pipe(bowerNormalizer())
    .pipe(changed("build/lib"))
    .pipe(gulp.dest("build/lib"));
});

// 同步目录
var dirSync = require("gulp-directory-sync");
gulp.task("sync", function () {
  return gulp.src('')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(dirSync('assets/lib', 'build/lib', {
      printSummary: true,
      nodelete: true
    }));
});

// 编译html，自动引入相关静态资源
var inject = require("gulp-inject");
gulp.task("html", ["bower", "less", "sync"], function() {

  var injectSource = function(src, name) {
    return inject(gulp.src(src, {
      read: false,
      cwd: "build"
    }), {
      addRootSlash: false,
      name: name
    });
  };

  return gulp.src("assets/*.html")
    .pipe(injectSource([
      "lib/bootstrap/**/*.css",
      "lib/fontawesome/**/*.css",
      "css/*.css"
    ]))
    .pipe(gulp.dest("build"));
});

var webpack = require("webpack"),
  webpackConfiguration = require("./webpack.config");
webpackConfiguration.lessLoader.lessPlugins.push(autoprefix);
gulp.task("webpack", function(callback) {
  webpack(webpackConfiguration, function(err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true
    }));
    callback();
  });
});

var WebpackDevServer = require("webpack-dev-server");
var HOST = "localhost";
var args = process.argv.splice(3);
args.some(function(val, index) {
  if ("--host" == val || "-h" == val) {
    HOST = args[index + 1];
    return true;
  }
});
gulp.task("webpack:server", function() {

  for(var key in webpackConfiguration.entry){
    webpackConfiguration.entry[key].push(
      "webpack-dev-server/client?http://" + HOST + ":3005",
      "webpack/hot/only-dev-server"
    );
  }

  var jsxLoader = webpackConfiguration.module.loaders.filter(function (item) {
    return item.test.test(".jsx");
  })[0];
  jsxLoader.loader = "react-hot!" + jsxLoader.loader;

  webpackConfiguration.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin(
      "[file].map", null, ".[resource-path]", ".[resource-path]?[hash]"
    ),
    new webpack.NoErrorsPlugin()
  );

  new WebpackDevServer(webpack(webpackConfiguration), {
    contentBase: "http://" + HOST + ":3005",
    hot: true,
    quiet: false,
    noInfo: false,
    filename: "[name].bundle.js",
    publicPath: "/js/",
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    stats: {
      colors: true
    }
  }).listen(3005, HOST, function(err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://" + HOST + ":3005/webpack-dev-server/index.html");

    // keep the server alive or continue?
    // callback();
  });
});

var modRewrite = require('connect-modrewrite');
gulp.task("server:mock", ["webpack:server"], function() {
  var apimock = require('apimock-middleware'),
    bodyParser = require('body-parser'),
    FileUpLoader = require('./mocks/response/system/file/FileUploader');

  browserSync({
    server: {
      baseDir: "build",
      middleware: [
        modRewrite([
          "^/js/(.*)$ http://" + HOST + ":3005/js/$1 [P]"
        ]),
        bodyParser.urlencoded({
          extended: false
        }),
        bodyParser.json(),
        apimock("./mocks/apimock.yml"),
        FileUpLoader
      ]
    }
  }, function(err) {
    if (err) throw new gutil.PluginError("browser-sync", err);
  });
});

gulp.task("server:proxy", ["webpack:server"], function () {
  browserSync({
    server: {
      baseDir: "build",
      middleware: [
        modRewrite([
          "^/js/(.*)$ http://" + HOST + ":3005/js/$1 [P]",
          "^/1/(.*)$ http://" + HOST + ":8080/1/$1 [P]"
        ])
      ]
    }
  }, function(err) {
    if (err) throw new gutil.PluginError("browser-sync", err);
  });
});

gulp.task("atts:folder", function(){
  var fs = require('fs');

  // 创建所有目录
  var mkdirs = function (dirpath, mode, callback) {
    fs.exists(dirpath, function (exists) {
      if (exists) {
        callback && callback(dirpath);
      } else {
        //尝试创建父目录，然后再创建当前目录
        mkdirs(path.dirname(dirpath), mode, function () {
          fs.mkdir(dirpath, mode, callback);
        });
      }
    });
  };

  [
    "build/atts/tmp",
    "build/atts/ueditor/image",
    "build/atts/ueditor/video",
    "build/atts/ueditor/file",
    "build/atts/ueditor/scrawl"
  ].forEach(function (path) {
    mkdirs(path);
  });
})

// 纯前端开发模式，使用mock获取需要的数据
gulp.task("dev", ["html", "server:mock", "atts:folder"], function() {
  gulp.watch(["assets/less/*.less", "assets/less/ace/**/*.less"], ["less"]);
});

// 混合开发模式，通过反向代理访问后端服务获取数据
gulp.task("proxy", ["html", "server:proxy", "atts:folder"], function() {
  gulp.watch(["assets/less/*.less", "assets/less/ace/**/*.less"], ["less"]);
});
