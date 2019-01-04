const {lstatSync, readdirSync} = require('fs');
const {join} = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const yargs = require('yargs');
const signale = require('signale');

const help = yargs
  .command('npm run readme:all', 'Create the readme file for all the components')
  .options('skip', {alias: 's', description: 'list of elements to skip (to divide by a comma)', string: true})
  .example(
    'npm run readme:all -- --skip=dialog,input',
    'Create the readme file for all the components, skipping dialog and input'
  )
  .epilog(`Copyright ${new Date().getFullYear()} Qwentes`).argv;

const toSkip = yargs.argv.skip && yargs.argv.skip.split(',');
const projectsPath = `${__dirname}/../projects/components/src/lib`;

getDirectories = () => {
  const buildDirectories = readdirSync(projectsPath)
    .map(name => join(projectsPath, name))
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
    for (i = 0; i < directories.length; i++) {
      await exec(`npm run readme -- -t ${directories[i]}`);
      signale.success(`Created readme for ${directories[i].toUpperCase()}`);
    }
    signale.complete('All readme created!!');
    toSkip && signale.pending(`Remember that you skipped: ${toSkip.join(', ').toUpperCase()}`);
  } catch (e) {
    signale.fatal(new Error(`Unable to create readme for ${directories[i].toUpperCase()}. ${e}`));
  }
})();
