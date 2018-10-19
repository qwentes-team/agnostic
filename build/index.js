const {basename} = require('path');
const {argv} = require('yargs');
const {build} = require('./build');
const {createMainPackageJson} = require('./package');
const {getChildDirectories} = require('./shared');

const version = argv.v;
const skipTest = argv.skipTest;
const mainPackageJsonPath = `${__dirname}/../dist/package.json`;
const directories = getChildDirectories(basename(`${__dirname}/../projects/`));

console.log('\x1b[32m%s\x1b[0m', `\nProjects: ${directories.join(', ')}`);

build(directories, {version, skipTest: skipTest})
  .then(() => createMainPackageJson(version, mainPackageJsonPath))
  .then(() => console.log('\nFinish, bye :)'))
  .catch(console.log);
