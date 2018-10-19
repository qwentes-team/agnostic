const {readFileSync, writeFileSync} = require('fs');

const fileContent = (version) => `{
  "name": "@qwentes/agnostic",
  "version": "${version}"
}`;

exports.createMainPackageJson = (version, filePath) => {
  return new Promise((resolve, reject) => {
    try {
      writeFileSync(filePath, fileContent(version), 'utf8');
      console.log('\x1b[36m%s\x1b[0m', '\nCreate main package.json successfully');
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

exports.replacePackageJsonVersion = (filePath, version) => {
  return new Promise((resolve, reject) => {
    try {
      const fileContent = readFileSync(filePath, 'utf8');
      const fileEdited = fileContent.replace(/0.0.0-PLACEHOLDER/g, version);
      writeFileSync(filePath, fileEdited, 'utf8');
      console.log('\x1b[36m%s\x1b[0m', '\nReplace package.json version successfully');
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
