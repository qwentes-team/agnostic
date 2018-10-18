import {configure} from '@storybook/angular';

const req = require.context('../projects/components/', true, /\.story\.ts$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
