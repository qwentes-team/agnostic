const colors = require('colors');
const {runCommandSync, commandModel} = require('./command');
const {replacePackageJsonVersion} = require('./package');

exports.build = (directories, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!directories.length) {
      console.log(colors.green('\nALL BUILDS DONE!'));
      return resolve();
    }

    const activeDirectory = directories[0];
    const packageJsonPath = `${__dirname}/../dist/${activeDirectory}/package.json`;
    const commands = {
      test: !options.skipTest && commandModel('npm', ['run', 'test', activeDirectory, '--', '--watch=false']),
      build: commandModel('npm', ['run', 'build', activeDirectory]),
    }

    return runCommandSync(Object.values(commands).filter(Boolean))
      .then(() => replacePackageJsonVersion(packageJsonPath, options.version))
      .then(() => {
        const directoriesToBuild = directories.filter(dir => dir !== activeDirectory);
        return exports.build(directoriesToBuild, options);
      })
      .catch((e) => reject(e));
  });
};
