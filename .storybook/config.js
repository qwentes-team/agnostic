import {configure, addDecorator} from '@storybook/angular';
import {withOptions} from '@storybook/addon-options';
import {withKnobs} from '@storybook/addon-knobs';

export const SECTION = {
  FORM: 'Form Controls',
  INDICATORS: 'Buttons & Indicators',
  LAYOUT: 'Layout',
  MODAL: 'Popup & Modals',
};

addDecorator(withKnobs);
addDecorator(
  withOptions({
    name: 'Agnostic',
    sortStoriesByKind: true,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
  })
);

const req = require.context('../projects/components/', true, /\.story\.ts$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
