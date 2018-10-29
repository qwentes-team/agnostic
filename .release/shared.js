const {lstatSync, readdirSync} = require('fs');
const {join} = require('path');

exports.getChildDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(source => lstatSync(source).isDirectory())
    .map(el => el.split('/')[1]);
