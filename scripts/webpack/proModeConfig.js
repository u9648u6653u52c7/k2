const { merge } = require("webpack-merge");
const rootDir = require("../var/rootDir");
const baseConfig = require("./baseConfig");

module.exports = merge(baseConfig, {
  mode: "production",
  output: {
    path: `${rootDir}/dist`,
    filename: "index.js",
    library: "k2",
    libraryTarget: "umd",
  },
  devtool: "source-map",
});
