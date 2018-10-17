const { basename } = require('path');
const { argv } = require('yargs');
const { execute } = require('./ExecuteCommand');
const { createMainPackageJSON } = require('./CreateMainPackage');
const { getDirectories } = require('./Util');

const version = argv.v;
const skipTest = argv.skipTest;
const mainPackageJsonPath = `${__dirname}/../dist/package.json`;
const directories = getDirectories(basename(`${__dirname}/../projects/`));

console.log(directories);

execute([...directories], {version, skip: skipTest})
  .then(() => createMainPackageJSON(version, mainPackageJsonPath))
  .catch(console.log);
