const {spawn} = require('child_process');
const { replacePackageJSONVersion } = require('./ReplaceVersionPackage');
const { commandModel } = require('./Util');

const executeCommand = (commandArgs, options = {}) => {
  return new Promise((resolve, reject) => {
    if (options.skip) {
      resolve();
      return;
    }
    const command = spawn(commandArgs.name, commandArgs.params);
    command.stdout.on('data', (data) => console.log(data.toString('utf8')));
    command.stderr.on('data', (data) => reject(`stderr: ${data}`));
    command.on('close', (code) => {
      console.log(`Finished command "${command.spawnargs.join(' ')}". Child process exited with code ${code}`);
      resolve();
    });
  })
};

const execute = (directories, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!directories.length) {
      console.log('All builds done!!');
      resolve();
      return;
    }
    const activeDirectory = directories[0];
    const testCommand = commandModel('npm', ['--help']);
    const buildCommand = commandModel('npm', ['run', 'build', activeDirectory]);
    const packageJsonPath = `${__dirname}/../dist/${activeDirectory}/package.json`;

    executeCommand(buildCommand)
      .then(() => executeCommand(testCommand))
      .then(() => replacePackageJSONVersion(packageJsonPath, options.version))
      .then(() => {
        execute(directories.filter(dir => dir !== activeDirectory), options)
          .then((data) => resolve(data))
          .catch(console.log);
      })
      .catch((e) => reject(e));
  });
};


module.exports = {
  execute,
};
