const colors = require('colors');
const {basename} = require('path');
const {argv} = require('yargs');
const {build} = require('./build');
const {createMainPackageJson} = require('./package');
const {getChildDirectories} = require('./shared');

const version = argv.v;
const skipTest = argv.skipTest;
const mainPackageJsonPath = `${__dirname}/../dist/package.json`;
const directories = getChildDirectories(basename(`${__dirname}/../projects/`));

console.log(colors.green(`Projects: ${directories.join(', ')}\n`));

build(directories, {version, skipTest: skipTest})
  .then(() => createMainPackageJson(mainPackageJsonPath, version))
  .then(({version}) => console.log(colors.green.bold(`\n@qwentes/agnostic@${version}`)))
  .catch(console.log);
