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

const cssCustomProperties = (scssFileContent, title) => {
  const content = scssFileContent
    .split('\n')
    .filter(line => line.includes(`  --ag-${title}`))
    .map(line => line.substr(2, line.lastIndexOf(':') - 2))
    .join('\n');
  if (!content) {
    return 'No CSS custom properties';
  }
  return `These are the CSS custom properties you can manage:\n\n\`\`\`\n${content}\n\`\`\``;
};

const htmlTemplateUsage = storyFileContent => {
  const splitter = ".add('Demo'"; // leave double quotes
  return storyFileContent
    .split(splitter)[1]
    .match(/`([\s\S]*?)`/gm)[0]
    .slice(1, -1)
    .replace(new RegExp('<br/>|<br>', 'g'), '')
    .split('\n')
    .filter(line => line.trim())
    .join('\n');
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

const properties = componentFileContent => {
  const header = `| Property  | Type  | Default |\n|-----------|-------|---------|\n`;

  const contentInput = componentFileContent
    .split('\n')
    .filter(line => line.match('@Input()'))
    .map(line => {
      const formattedLine = line
        .split('@Input() public')
        .pop()
        .trim()
        .slice(0, -1);
      const formattedLineSplittedByColon = formattedLine.split(':');
      const formattedLineSplittedByEqual = formattedLine.split('=');
      const name = formattedLine.split(' ')[0].slice(0, -1);
      const defaultValue = formattedLine.indexOf('=') > 0 ? formattedLineSplittedByEqual[1].trim() : '';
      const type =
        formattedLine.indexOf(':') > 0
          ? formattedLineSplittedByColon[1].trim().split(' ')[0]
          : defaultValue === 'true' || defaultValue === 'false'
          ? 'boolean'
          : '';
      return {name, type, defaultValue};
    })
    .reduce((acc, line) => acc + `| ${line.name} | ${line.type} | ${line.defaultValue} |\n`, '');

  const contentAttribute = componentFileContent
    .split('\n')
    .filter(line => line.match('@Attribute'))
    .join('')
    .match(/'(.*?)'/gm)
    .map(element => ({name: element.slice(1, -1), type: 'string', defaultValue: ''}))
    .reduce((acc, line) => acc + `| ${line.name} | ${line.type} | ${line.defaultValue} |\n`, '');

  if (!contentInput && !contentAttribute) {
    return 'No properties';
  }

  return header + contentInput + contentAttribute;
};

const events = componentFileContent => {
  const header = `| Event  | Return |\n|--------|--------|\n`;
  const content = componentFileContent
    .split('\n')
    .filter(line => line.match('@Output()'))
    .map(line => {
      const formattedLine = line
        .split('@Output() public')
        .pop()
        .trim()
        .slice(0, -1);
      const name = formattedLine.split(' ')[0].slice(0, -1);
      const returnValue = formattedLine.match('<(.*?)>') && formattedLine.match('<(.*?)>')[1];
      return {name, returnValue};
    })
    .reduce((acc, line) => acc + `| ${line.name} | ${line.returnValue} |\n`, '');

  return content ? header + content : 'No events';
};

module.exports = {
  componentTitle,
  componentNameExample,
  cssCustomProperties,
  htmlTemplateUsage,
  description,
  properties,
  events,
};
