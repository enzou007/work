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
      "backbone-validation": "backbone-validation/dist/backbone-validation-amd",
      "backbone.select": "backbone.select/dist/amd/backbone.select",
      "rctui": "rctui/dist/ReactUI-with-css"
    },
    modulesDirectories: ["node_modules", "bower_components"]
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loader: "style!css!less?config=lessLoaderCustom"
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.(png|jpg)$/,
      loader: "url?limit=100000"
    }, {
      test: /\.json$/,
      loader: "json"
    }, {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel?stage=0'
    }, {
      test: /module[\/\\].+[\/\\](\.jsx|option\.js)$/,
      loader: 'bundle?lazy'
    }, {
      test: /[\/\\]bootstrap[\/\\]js/,
      loader: "imports?jQuery=jquery!exports?jQuery"
    }]
  },
  plugins: [
    // 过滤moment多余的语言模块
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    // 替换backbone.select的错误依赖
    new webpack.NormalModuleReplacementPlugin(/backbone$/, function (result) {
      if (/backbone\.select[\/\\]dist[\/\\]amd$/.test(result.context)) {
        result.request = "../../../backbone/backbone.js";
      }
    }),
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
