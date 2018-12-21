const fs = require('fs');
const Util = require('./Util');
const yargs = require('yargs');

const help = yargs
  .command('npm run readme', 'Create a readme.md file for the component passed in input')
  .options('title', {
    alias: 't',
    description: 'Title of the component (folder name in projects/components/src/lib)',
    string: true,
  })
  .example('npm run readme -- -t button', 'Create the readme file for the ag-button component')
  .epilog(`Copyright ${new Date().getFullYear()} Qwentes`)
  .require('title').argv;

const buildComponentNameExample = title => {
  const snakeToCamelString = Util.snakeToCamel(title);
  return Util.capitalizeFirstLetter(snakeToCamelString);
};

const buildCssCustomProperties = (scssFileContent, componentTitle) => {
  return scssFileContent
    .split('\n')
    .filter(line => line.includes(`  --${componentTitle}`))
    .map(line => line.substr(2, line.lastIndexOf(':') - 2))
    .join('\n');
};

const buildHtmlTemplateUsage = storyFileContent => {
  return storyFileContent
    .split(".add('Demo'")[1]
    .match(/`([\s\S]*?)`/gm)[0]
    .slice(1, -1);
};

const title = yargs.argv.title;

const TEMPLATE_CONSTANTS = {
  TITLE: 'TITLE',
  DESCRIPTION: 'DESCRIPTION',
  HTML_TEMPLATE_USAGE: 'HTML_TEMPLATE_USAGE',
  COMPONENT_NAME_EXAMPLE: 'COMPONENT_NAME_EXAMPLE',
  CSS_CUSTOM_PROPERTIES: 'CSS_CUSTOM_PROPERTIES',
  PROPERTIES: 'PROPERTIES',
  EVENTS: 'EVENTS',
};

const valueToInsertInReadme = {
  componentTitle: '',
  componentNameExample: '',
  cssCustomProperties: '',
  htmlTemplateUsage: '',
};

const basePath = `${__dirname}/../projects/components/src/lib/${title}`;
const baseTemplatePath = `${__dirname}/template.md`;
const componentPath = `${basePath}/${title}.component.ts`;
const scssPath = `${basePath}/${title}.component.scss`;
const storyPath = `${basePath}/${title}.story.ts`;

const baseTemplateFileContent = fs.readFileSync(baseTemplatePath, 'utf8');
const componentFileContent = fs.readFileSync(componentPath, 'utf8');
const scssFileContent = fs.readFileSync(scssPath, 'utf8');
const storyFileContent = fs.readFileSync(storyPath, 'utf8');

const componentFileContentArray = componentFileContent.split('\n').filter(line => line);

valueToInsertInReadme.componentTitle = componentFileContentArray
  .find(line => line.includes('selector: '))
  .match(/'([^']+)'/)[1];

valueToInsertInReadme.componentNameExample = buildComponentNameExample(title);
valueToInsertInReadme.cssCustomProperties = buildCssCustomProperties(
  scssFileContent,
  valueToInsertInReadme.componentTitle
);
valueToInsertInReadme.htmlTemplateUsage = buildHtmlTemplateUsage(storyFileContent);

const readmeFileContent = baseTemplateFileContent
  .replace(TEMPLATE_CONSTANTS.TITLE, valueToInsertInReadme.componentTitle)
  .replace(new RegExp(TEMPLATE_CONSTANTS.COMPONENT_NAME_EXAMPLE, 'g'), valueToInsertInReadme.componentNameExample)
  .replace(TEMPLATE_CONSTANTS.CSS_CUSTOM_PROPERTIES, valueToInsertInReadme.cssCustomProperties)
  .replace(TEMPLATE_CONSTANTS.HTML_TEMPLATE_USAGE, valueToInsertInReadme.htmlTemplateUsage);

//fs.writeFileSync(`${basePath}/README.md`, readmeFileContent);

console.log(readmeFileContent);

console.log(`File created in the component ${title} folder`);
