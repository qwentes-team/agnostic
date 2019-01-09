const {lstatSync, readdirSync, existsSync} = require('fs');
const {join} = require('path');
const yargs = require('yargs');
const signale = require('signale');
const Constants = require('./Constants');

const help = yargs
  .command('npm run readme:list', 'Create a list of components with/without readme')
  .example('npm run readme:list', 'Create the list of components with/without readme')
  .epilog(`Copyright ${new Date().getFullYear()} Qwentes`).argv;

const getPathDirectories = () => {
  return readdirSync(Constants.PROJECTS_PATH)
    .map(name => join(Constants.PROJECTS_PATH, name))
    .filter(source => lstatSync(source).isDirectory());
};

const getDirectories = () => getPathDirectories().map(dir => dir.split('/')[dir.split('/').length - 1]);

const paths = getPathDirectories();
const directories = getDirectories();
const readmeFileName = 'README.md';

signale.info('List of components with/without readme:\n');

paths.forEach((path, i) => {
  existsSync(`${path}/${readmeFileName}`)
    ? signale.success(`${directories[i].toUpperCase()} has ${readmeFileName}`)
    : signale.warn(`${directories[i].toUpperCase()} has not ${readmeFileName}`);
});
