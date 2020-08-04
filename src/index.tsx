import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl-redux';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';
import get from 'lodash/get';
import { PersistGate } from 'redux-persist/integration/react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from '#';
import Dialog from '#/@common/dialog';
import Notification from '#/@common/notification';
import { createStore } from '#/@store/createStore';

import '@styles/base.css';
import lightTheme from '@styles/themes/light';

import * as serviceWorker from './serviceWorker';

createStore().then(({ store, history }) => {
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider>
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
      </IntlProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement
  );

  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.register({
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
    store,
  });
});
