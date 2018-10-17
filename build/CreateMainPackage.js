const { writeFileSync } = require('fs');

const fileContent = (version) => `{
  "name": "@qwentes/agnostic",
  "version": "${version}"
}`;

const createMainPackageJSON = (version, filePath) => {
  return new Promise((resolve, reject) => {
    try {
      writeFileSync(filePath, fileContent(version), 'utf8');
      console.log('Create main package.json successfully');
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createMainPackageJSON,
};
