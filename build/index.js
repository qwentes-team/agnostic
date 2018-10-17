const { basename } = require('path');
const { argv } = require('yargs');
const { execute } = require('./ExecuteCommand');
const { createMainPackageJSON } = require('./CreateMainPackage');
const { getDirectories } = require('./Util');

const version = argv.v;
const skipTest = argv.skipTest;
const mainPackageJsonPath = `${__dirname}/../dist/package.json`;
const directories = getDirectories(basename(`${__dirname}/../projects/`));

console.log('\x1b[32m%s\x1b[0m', `\nProjects: ${directories.join(', ')}`);

execute([...directories], {version, skip: skipTest})
  .then(() => createMainPackageJSON(version, mainPackageJsonPath))
  .then(() => console.log('\nFinish, bye :)'))
  .catch(console.log);
