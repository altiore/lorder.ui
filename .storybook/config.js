import { addDecorator, addParameters, configure } from '@storybook/react';

import CenterDecor from './decor/Center';
import MaterialThemes from './decor/MaterialThemes';
import { BACKGROUND_DEFAULT, BACKGROUND_DARK } from '@styles/themes/light/variables';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(MaterialThemes);
addDecorator(CenterDecor);
addParameters({
  backgrounds: [{ name: 'white', value: BACKGROUND_DEFAULT, default: true }, { name: 'black', value: BACKGROUND_DARK }],
});

configure(loadStories, module);
