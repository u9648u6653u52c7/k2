const { merge } = require("webpack-merge");
const rootDir = require("../var/rootDir");
const baseConfig = require("./baseConfig");

module.exports = merge(baseConfig, {
  target: false,
  mode: "production",
  output: {
    path: `${rootDir}/dist`,
    filename: "index.js",
    library: "k2",
    libraryTarget: "umd",
    globalObject: "this"
  },
  devtool: "source-map",
});
