const path = require('path');
const colors = require('colors');
const {readFileSync, writeFileSync} = require('fs');

const fileContent = (version) => `{
  "name": "@qwentes/agnostic",
  "version": "${version}"
}`;

exports.createMainPackageJson = (filePath, version) => {
  return new Promise((resolve, reject) => {
    try {
      const directory = path.basename(path.dirname(filePath))
      writeFileSync(filePath, fileContent(version), 'utf8');
      resolve({
        directory,
        version,
        message: `${directory}@${version} completed`,
      });
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
      const directory = path.basename(path.dirname(filePath));
      writeFileSync(filePath, fileEdited, 'utf8');
      resolve({
        directory,
        version,
        message: `${JSON.parse(fileEdited).name}@${version} completed`,
      });
    } catch (e) {
      reject(e);
    }
  });
};
