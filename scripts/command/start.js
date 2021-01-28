const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const devModeConfig = require("../webpack/devModeConfig");
const devServerConfig = require("../webpack/devServerConfig");

// 想要启用 HMR，还需要修改 webpack 配置对象，使其包含 HMR 入口起点
webpackDevServer.addDevServerEntrypoints(devModeConfig, devServerConfig);

; (
  new webpackDevServer(webpack(devModeConfig), devServerConfig)
).listen(8080);
