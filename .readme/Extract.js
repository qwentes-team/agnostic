const Constants = require('./Constants');

const componentTitle = componentFileContent => {
  return componentFileContent
    .split('\n')
    .find(line => line.includes('selector: '))
    .match(/'([^']+)'/)[1];
};

const componentNameExample = title => {
  const snakeToCamelString = title.replace(/(\-\w)/g, m => m[1].toUpperCase());
  return snakeToCamelString[0].toUpperCase() + snakeToCamelString.slice(1);
};

const cssCustomProperties = (scssFileContent, componentTitle) => {
  return scssFileContent
    .split('\n')
    .filter(line => line.includes(`  --${componentTitle}`))
    .map(line => line.substr(2, line.lastIndexOf(':') - 2))
    .join('\n');
};

const htmlTemplateUsage = storyFileContent => {
  const splitter = ".add('Demo'"; // leave double quotes
  return storyFileContent
    .split(splitter)[1]
    .match(/`([\s\S]*?)`/gm)[0]
    .slice(1, -1);
};

const description = moduleFileContent => {
  const regexToMatch = /\/\*([\s\S]*?)\\*\//gm;
  if (!moduleFileContent.match(regexToMatch)) {
    return Constants.TEMPLATE.DESCRIPTION;
  }
  return moduleFileContent
    .match(regexToMatch)[0]
    .split('\n')
    .slice(1, -1)
    .join('\n');
};

module.exports = {
  componentTitle,
  componentNameExample,
  cssCustomProperties,
  htmlTemplateUsage,
  description,
};
