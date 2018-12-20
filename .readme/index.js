const fs = require('fs');
const Util = require('./Util');

const buildComponentNameExample = title => {
  const snakeToCamelString = Util.snakeToCamel(title);
  return Util.capitalizeFirstLetter(snakeToCamelString);
};

const title = 'button';
const valueToInsertInReadme = {};

const basePath = `${__dirname}/../projects/components/src/lib/${title}/${title}.component`;

const componentPath = `${basePath}.ts`;
const scssPath = `${basePath}.scss`;

const componentFileContent = fs.readFileSync(componentPath, 'utf8');
const scssFileContent = fs.readFileSync(scssPath, 'utf8');

const componentFileContentArray = componentFileContent.split('\n').filter(line => line);
valueToInsertInReadme.title = componentFileContentArray.find(line => line.includes('selector: ')).match(/'([^']+)'/)[1];

valueToInsertInReadme.componentNameExample = buildComponentNameExample('infinite-scroll');

valueToInsertInReadme.cssCustomProperties = scssFileContent
  .split('\n')
  .filter(line => line.includes(`  --${valueToInsertInReadme.title}`))
  .map(line => line.substr(3, line.lastIndexOf(':') - 3));

console.log(valueToInsertInReadme);
