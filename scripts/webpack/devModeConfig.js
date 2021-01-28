const { merge } = require("webpack-merge");
const rootDir = require("../var/rootDir");
const baseConfig = require("./baseConfig");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "development",
  output: {
    path: `${rootDir}/www`,
    filename: "[name].js",
    pathinfo: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: `${rootDir}/runtime.html`,
      inject: true
    }),
  ],
  devtool: "eval-cheap-module-source-map",
});
