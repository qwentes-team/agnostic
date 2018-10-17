const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const getDirectories = (source) => readdirSync(source)
  .map(name => join(source, name))
  .filter(source => lstatSync(source).isDirectory())
  .map(el => el.split('/')[1]);

const commandModel = (name, params) => ({name, params});

module.exports = {
  getDirectories,
  commandModel
};
