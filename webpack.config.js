var webpack = require("webpack");

module.exports = {
  entry: {
    app: ["./assets/js/index.js"],
    form: ["./assets/js/form.js"]
  },
  output: {
    path: __dirname + "/build/js",
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
    publicPath: "/js/",
    pathinfo: true
  },
  resolve: {
    alias: {
      "Component": __dirname + "/assets/js/component",
      "View": __dirname + "/assets/js/view",
      // 默认引入React的插件
      "react$": "react/lib/ReactWithAddons",
      "backbone-validation$": "backbone-validation/dist/backbone-validation-amd",
      "backbone.select$": "backbone.select/dist/amd/backbone.select"
    },
    modulesDirectories: ["node_modules", "bower_components"]
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loader: "style!css!less"
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: "url?limit=100000"
    }, {
      test: /\.json$/,
      loader: "json"
    }, {
      test: /\.js$/,
      include: /assets[\/\\]js/,
      loader: 'babel?stage=0&optional=runtime'
    }, {
      test: /\.jsx$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel?stage=0&optional=runtime'
    }, {
      test: /\.(js|jsx)$/,
      include: /node_modules[\/\\]rctui/,
      loader: 'babel?stage=0'
    }, {
      test: /module[\/\\](?!home[\/\\]).*\.jsx$/,
      loader: 'bundle?lazy!babel?stage=0&optional=runtime'
    }, {
      test: /module[\/\\].+[\/\\]option\.js$/,
      loader: 'bundle?lazy!babel?stage=0&optional=runtime'
    }, {
      test: /\.js$/,
      include: /(bootstrap|gritter)/,
      loader: "exports?jQuery!imports?jQuery=jquery"
    }]
  },
  plugins: [
    // 过滤moment多余的语言模块
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    // 在form.js中引入jsx时，过滤掉home相关代码
    new webpack.ContextReplacementPlugin(/\.\/module/, function (result) {
      if (result.regExp.toString().indexOf(".jsx") !== -1) {
        result.regExp = /^\.\/(?!home).+\/.*\/.+\.jsx$/;
      }
    }),
    // 替换backbone.select的错误依赖
    new webpack.NormalModuleReplacementPlugin(/backbone$/, function (result) {
      if (/backbone\.select[\/\\]dist[\/\\]amd$/.test(result.context)) {
        result.request = "../../../backbone/backbone.js";
      }
    }),
    // 处理React-UI的依赖，简化路径处理
    new webpack.NormalModuleReplacementPlugin(/^rctui/, function (result) {
      var request = result.request,
        infos = request.split("/");
      if (infos.length === 2) {
        var componentName = infos.pop().replace(/[A-Z]/g, function (input, index) {
          return (index !== 0 ? "-" : "") + input.toLowerCase();
        });
        result.request = infos.shift() + "/src/js/components/" + infos.join("/") + (infos.length > 0 ? "/" : "") + componentName + ".jsx";
      } else {
        result.request = infos.shift() + "/src/js/" + infos.join("/");
      }
    }),
    // 将form-control.jsx 替换成新的实现
    new webpack.NormalModuleReplacementPlugin(/\.\/form-control\.jsx$/, "Component/form/FormControl.jsx"),
    new webpack.optimize.CommonsChunkPlugin("commons.js"),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    new webpack.optimize.DedupePlugin()
  ],
  lessLoader: {
    lessPlugins: []
  }
};
