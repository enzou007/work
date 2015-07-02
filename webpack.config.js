var webpack = require("webpack");

module.exports = {
  entry: ["./assets/js/index.js"],
  output: {
    path: __dirname + "/build/js",
    filename: "bundle.js",
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
      loader: 'react-hot!babel?stage=0'
    }, {
      test: /[\/|\\]bootstrap[\/|\\]js/,
      loader: "exports?jQuery!imports?jQuery=jquery"
    }]
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ],
  lessLoader: {
    lessPlugins: []
  }
};
