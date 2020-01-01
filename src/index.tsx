import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Boundary from '@components/Boundary';
import Dialog from '@domains/@common/Dialog';
import Notification from '@domains/@common/Notification';
import { createStore } from '@store/createStore';
import lightTheme from '@styles/themes/light';
import '@styles/base.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

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
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onSuccess: async registration => {
    console.log('PWA onSuccess', {
      registration,
    });
    // await registration.update();
    // window.location.reload();
    console.log('new web PWA application was successfully ');
  },
  onUpdate: async registration => {
    console.log('PWA onUpdate', {
      registration,
    });
    // await registration.update();
    // window.location.reload();
    console.log('new web PWA application was successfully updated');
  },
});
