import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import get from 'lodash/get';

import App from '#';
import Dialog from '#/@common/Dialog';
import Notification from '#/@common/Notification';
import { createStore } from '#/@store/createStore';
import '@styles/base.css';
import lightTheme from '@styles/themes/light';

import * as serviceWorker from './serviceWorker';

createStore().then(({ store, history }) => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={lightTheme}>
            <CssBaseline />
            <App />
            <Notification />
            <Dialog />
          </MuiThemeProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>,
    document.getElementById('root') as HTMLElement
  );

  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.register({
    store,
    // onSuccess: async registration => {},
    onUpdate: async registration => {
      const waitingServiceWorker = registration.waiting;

      if (waitingServiceWorker) {
        waitingServiceWorker.addEventListener('statechange', event => {
          if (get(event, ['target', 'state']) === 'activated') {
            window.location.reload();
          }
        });
        waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
      }
    },
  });
});
