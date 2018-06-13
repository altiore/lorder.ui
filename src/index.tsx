import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './domains/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App role={'guest'} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
