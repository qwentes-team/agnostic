const {join, basename} = require('path');
const {argv} = require('yargs');
const {lstatSync, readdirSync, readFileSync, writeFileSync} = require('fs');
const {spawn} = require('child_process');

// non so perchè non gli piace --version
const version = argv.v;
const skipTest = Boolean(argv.skipTest);

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source)
  .map(name => join(source, name))
  .filter(isDirectory)
  .map(el => el.split('/')[1]);

const executeCommandPromise = (command) => {
  return new Promise((resolve, reject) => {
    command.stdout.on('data', (data) => console.log(data));
    command.stderr.on('data', (data) => reject(`stderr: ${data}`));
    command.on('close', (code) => resolve(`Finished command. Child process exited with code ${code}`));
  })
};

const replacePackageJSONVersion = (someFile) => {
  return new Promise((resolve, reject) => {
    try {
      const contentOfFile = readFileSync(someFile, 'utf8');
      const result = contentOfFile.replace(/0.0.0-PLACEHOLDER/g, version);
      writeFileSync(someFile, result, 'utf8');
      resolve('Replace package.json version successfully');
    } catch (e) {
      reject(e);
    }
  });
};

const createMainPackageJSON = () => {
  return new Promise((resolve, reject) => {
    const fileContent = `{
  "name": "@qwentes/agnostic",
  "version": "${version}"
}`;
    const filePath = `${__dirname}/dist/package.json`;
    console.log(filePath);
    resolve('Create main package.json successfully');
    try {
      writeFileSync(filePath, fileContent, 'utf8');
      resolve('Create main package.json successfully');
    } catch (e) {
      reject(e);
    }
  });
};

const source = basename(`${__dirname}/projects/`);
const directories = getDirectories(source);

const testCommand = spawn('npm', ['--help']);
const buildCommand = spawn('npm', ['run', 'build', 'components']);
const packageJsonPath = `${__dirname}/dist/components/package.json`;
console.log(packageJsonPath);

executeCommandPromise(testCommand)
  .then((data) => {
    console.log(data);
    return executeCommandPromise(buildCommand);
  })
  .then((data) => {
    console.log(data);
    return replacePackageJSONVersion(packageJsonPath);
  })
  .then((data) => {
    console.log(data);
    return createMainPackageJSON();
  })
  .then(console.log)
  .catch(console.log);
