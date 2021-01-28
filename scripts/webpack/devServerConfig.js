// const rootDir = require("../var/rootDir");

module.exports = {
  clientLogLevel: "error",
  compress: true,
  contentBase: false,
  publicPath: "/",
  hot: true,
  watchOptions: {
    aggregateTimeout: 1e3,
    poll: 1000,
    ignored: ["scripts/**", "node_modules/**"]
  },
  open: true
};
