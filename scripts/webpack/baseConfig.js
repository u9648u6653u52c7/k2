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
        include: `${rootDir}/src/`,
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
