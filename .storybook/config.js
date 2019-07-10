import { addDecorator, addParameters, configure } from '@storybook/react';

import MaterialThemes from './decor/MaterialThemes';
import { BACKGROUND_DEFAULT, BACKGROUND_DARK } from '@styles/themes/light/variables';

function loadStories() {
  const importAll = r => r.keys().forEach(r);

  importAll(require.context('../stories', true, /\.stories\.(tsx|js)/));
  importAll(require.context('../src/@components', true, /\.stories\.(tsx|js)/));
}

addDecorator(MaterialThemes);

addParameters({
  backgrounds: [{ name: 'white', value: BACKGROUND_DEFAULT, default: true }, { name: 'black', value: BACKGROUND_DARK }],
});

configure(loadStories, module);
