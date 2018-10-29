const colors = require('colors');
const {spawn} = require('child_process');

exports.commandModel = (name, params) => ({name, params});

exports.runCommand = commandArgs => {
  return new Promise((resolve, reject) => {
    const command = spawn(commandArgs.name, commandArgs.params);
    const commandString = command.spawnargs.join(' ');
    console.log(colors.cyan(commandString));
    command.stdout.on('data', data =>
      console.log(colors.gray(data.toString('utf8').trim()))
    );
    command.stderr.on('data', data => reject(`stderr: ${data}`));
    command.on('close', code => {
      console.log(
        colors.gray(
          `Finished command "${commandString}". Child process exited with code ${code}`
        )
      );
      resolve();
    });
  });
};

exports.runCommandSync = (commands, progress = 0) => {
  if (progress >= commands.length) {
    return Promise.resolve();
  }
  return exports
    .runCommand(commands[progress])
    .then(() => exports.runCommandSync(commands, ++progress))
    .catch(e => Promise.reject(e));
};
