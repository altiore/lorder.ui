import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Dialog from 'src/domains/@common/Dialog'
import Notification from 'src/domains/@common/Notification'
import { App } from './domains';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from './store/createStore';
import theme from './styles/materialTheme';

const { store, history, persistor } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <App />
          <Notification />
          <Dialog />
        </MuiThemeProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
