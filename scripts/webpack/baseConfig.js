const rootDir = require("../var/rootDir");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  context: rootDir,
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {},
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    })
  ],
  optimization: {}
};
