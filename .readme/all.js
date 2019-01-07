const {lstatSync, readdirSync} = require('fs');
const {join} = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const yargs = require('yargs');
const signale = require('signale');
const Constants = require('./Constants');

const help = yargs
  .command('npm run readme:all', 'Create the readme file for all the components')
  .options('skip', {alias: 's', description: 'list of elements to skip (to divide by a comma)', string: true})
  .example(
    'npm run readme:all -- --skip=dialog,input',
    'Create the readme file for all the components, skipping dialog and input'
  )
  .epilog(`Copyright ${new Date().getFullYear()} Qwentes`).argv;

const toSkip = yargs.argv.skip && yargs.argv.skip.split(',');

const getDirectories = () => {
  const buildDirectories = readdirSync(Constants.PROJECTS_PATH)
    .map(name => join(Constants.PROJECTS_PATH, name))
    .filter(source => lstatSync(source).isDirectory())
    .map(dir => dir.split('/')[dir.split('/').length - 1]);

  if (!toSkip) {
    return buildDirectories;
  }
  return buildDirectories.filter(dir => !toSkip.includes(dir));
};

(async () => {
  const directories = getDirectories();
  let i;

  try {
    signale.info('Create batch of README.md:\n');
    for (i = 0; i < directories.length; i++) {
      await exec(`npm run readme -- -t ${directories[i]}`);
      signale.success(`Created readme for ${directories[i].toUpperCase()}`);
      i === directories.length - 1 && signale.log();
    }
    signale.complete('All readme created!!');
    toSkip && signale.warn(`Remember that you skipped: ${toSkip.join(', ').toUpperCase()}`);
  } catch (e) {
    signale.error(new Error(`Unable to create readme for ${directories[i].toUpperCase()}. ${e}`));
  }
})();
