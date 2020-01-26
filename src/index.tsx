import React from 'react';
import * as Sentry from '@sentry/browser';

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
import Boundary from '@components/Boundary';
import '@styles/base.css';
import lightTheme from '@styles/themes/light';
import * as serviceWorker from './serviceWorker';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });
}

createStore().then(({ store, persistor, history }) => {
  ReactDOM.render(
    <Boundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
            <MuiThemeProvider theme={lightTheme}>
              <CssBaseline />
              <App />
              <Notification />
              <Dialog />
            </MuiThemeProvider>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </Boundary>,
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
