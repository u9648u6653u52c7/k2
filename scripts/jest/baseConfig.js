const rootDir = require("../var/rootDir");

module.exports = {
  rootDir,
  collectCoverageFrom: [
    "src/**/*.js"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/scripts/",
    "/dist/",
    "/test/",
  ],
  moduleDirectories: [
    "node_modules"
  ],
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],
  // moduleNameMapper: {},
  // modulePathIgnorePatterns: [],
  // setupFiles: [],
  // setupFilesAfterEnv: [],
  // snapshotSerializers: [],
  // testEnvironment: "jest-environment-jsdom",
  // testEnvironmentOptions: {},
  testPathIgnorePatterns: [
    "/node_modules/",
    "/scripts/",
    "/dist/",
    "/test/",
  ],
  // testRegex: [],
  testURL: "http://localhost",
  timers: "fake",
  verbose: true,
};
