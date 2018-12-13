import {configure, addDecorator} from '@storybook/angular';
import {setOptions} from '@storybook/addon-options';
import {withKnobs} from '@storybook/addon-knobs';

export const SECTION = {
  FORM: 'Form Controls',
  INDICATORS: 'Buttons & Indicators',
  LAYOUT: 'Layout',
  MODAL: 'Popup & Modals',
};

setOptions({
  name: 'Agnostic',
  sortStoriesByKind: true,
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
});

addDecorator(withKnobs);

const req = require.context('../projects/components/', true, /\.story\.ts$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
