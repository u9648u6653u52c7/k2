const yargs = require("yargs");
const { spawn } = require("child_process");

const argv = yargs
  .parserConfiguration({
    // Important: This option tells yargs to move all other options not
    // specified here into the `_` key. We use this to send all of the
    // Jest options that we don't use through to Jest (like --watch).
    'unknown-options-as-args': true,
  }).argv;

function getCommandArgs() {
  // Add the correct Jest config.
  const args = [
    "./scripts/command/jest.js",
    "--config",
    "./scripts/jest/baseConfig.js"
  ];
  // if (argv.project === 'devtools') {
  //   args.push(devToolsConfig);
  // } else {
  //   process.exit(1);
  // }

  // Push the remaining args onto the command.
  // This will send args like `--watch` to Jest.
  args.push(...argv._);

  return args;
}

function main() {
  const args = getCommandArgs();

  // Run Jest.
  const jest = spawn('node', args, {
    stdio: "inherit",
    env: { ...process.env },
  });
  // Ensure we close our process when we get a failure case.
  jest.on("close", code => {
    // Forward the exit code from the Jest process.
    if (code === 1) {
      process.exit(1);
    }
  });
}

main();
