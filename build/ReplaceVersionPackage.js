const { readFileSync, writeFileSync } = require('fs');

const replacePackageJSONVersion = (someFile, version) => {
  return new Promise((resolve, reject) => {
    try {
      const contentOfFile = readFileSync(someFile, 'utf8');
      const result = contentOfFile.replace(/0.0.0-PLACEHOLDER/g, version);
      writeFileSync(someFile, result, 'utf8');
      console.log('Replace package.json version successfully');
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  replacePackageJSONVersion,
};
