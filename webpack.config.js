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
      "backbone-validation": "backbone-validation/dist/backbone-validation-amd"
    },
    modulesDirectories: ["node_modules", "bower_components"]
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loader: "style!css!less?config=lessLoaderCustom"
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
      test: /module[\/\\].+[\/\\](Form\.jsx|option\.js)$/,
      loader: 'bundle?lazy'
    }, {
      test: /[\/\\]bootstrap[\/\\]js/,
      loader: "exports?jQuery!imports?jQuery=jquery"
    }]
  },
  plugins: [
    // 过滤moment多余的语言模块
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
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
