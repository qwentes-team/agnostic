const fs = require('fs');
const yargs = require('yargs');
const signale = require('signale');
const Constants = require('./Constants');
const Extract = require('./Extract');

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

const paramsTitle = yargs.argv.title;
const valueToInsertInReadme = {};

const basePath = `${__dirname}/../projects/components/src/lib/${paramsTitle}`;
const baseTemplatePath = `${__dirname}/template.md`;
const modulePath = `${basePath}/${paramsTitle}.module.ts`;
const componentPath = `${basePath}/${paramsTitle}.component.ts`;
const scssPath = `${basePath}/${paramsTitle}.component.scss`;
const storyPath = `${basePath}/${paramsTitle}.story.ts`;

const baseTemplateFileContent = fs.readFileSync(baseTemplatePath, 'utf8');
const moduleFileContent = fs.readFileSync(modulePath, 'utf8');
const componentFileContent = fs.readFileSync(componentPath, 'utf8');
const scssFileContent = fs.readFileSync(scssPath, 'utf8');
const storyFileContent = fs.readFileSync(storyPath, 'utf8');

valueToInsertInReadme.componentTitle = Extract.componentTitle(paramsTitle);
valueToInsertInReadme.componentDescription = Extract.description(moduleFileContent);
valueToInsertInReadme.componentNameExample = Extract.componentNameExample(paramsTitle);
valueToInsertInReadme.htmlTemplateUsage = Extract.htmlTemplateUsage(storyFileContent);
valueToInsertInReadme.cssCustomProperties = Extract.cssCustomProperties(scssFileContent, paramsTitle);
valueToInsertInReadme.properties = Extract.properties(componentFileContent);
valueToInsertInReadme.events = Extract.events(componentFileContent);

const readmeFileContent = baseTemplateFileContent
  .replace(Constants.TEMPLATE.TITLE, valueToInsertInReadme.componentTitle)
  .replace(Constants.TEMPLATE.DESCRIPTION, valueToInsertInReadme.componentDescription)
  .replace(new RegExp(Constants.TEMPLATE.COMPONENT_NAME_EXAMPLE, 'g'), valueToInsertInReadme.componentNameExample)
  .replace(Constants.TEMPLATE.CSS_CUSTOM_PROPERTIES, valueToInsertInReadme.cssCustomProperties)
  .replace(Constants.TEMPLATE.HTML_TEMPLATE_USAGE, valueToInsertInReadme.htmlTemplateUsage)
  .replace(Constants.TEMPLATE.PROPERTIES, valueToInsertInReadme.properties)
  .replace(Constants.TEMPLATE.EVENTS, valueToInsertInReadme.events);

fs.writeFileSync(`${basePath}/README.md`, readmeFileContent);

signale.success(`File created in the component ${paramsTitle} folder`);
