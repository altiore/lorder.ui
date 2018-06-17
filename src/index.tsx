import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { createStore } from 'src/store/createStore';

import { App } from './domains/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={createStore()}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
