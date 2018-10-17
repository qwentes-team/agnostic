const { writeFileSync } = require('fs');

const fileContent = (version) => `{
  "name": "@qwentes/agnostic",
  "version": "${version}"
}`;

const createMainPackageJSON = (version, filePath) => {
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

module.exports = {
  createMainPackageJSON,
};
