import { MuiThemeProvider } from '@material-ui/core/styles';
import * as Sentry from '@sentry/browser';
import { ConnectedRouter } from 'connected-react-router';
import * as moment from 'moment';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Boundary from 'components/Boundary';
import Dialog from 'domains/@common/Dialog';
import Notification from 'domains/@common/Notification';
import { App } from './domains';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from './store/createStore';
import theme from './styles/materialTheme';

moment.locale('ru');

Sentry.init({
  dsn: 'https://c42e3efc3fa94160953f93a01647fdd7@sentry.io/1398903',
  enabled: process.env.NODE_ENV !== 'development',
  environment: process.env.NODE_ENV,
  whitelistUrls: ['https://altiore.org'],
});

createStore().then(({ store, persistor, history }) => {
  ReactDOM.render(
    <Boundary>
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
      </Provider>
    </Boundary>,
    document.getElementById('root') as HTMLElement
  );
});

registerServiceWorker();

const r = 'font-size: 40px; line-height: normal; font-weight: bold;';
console.group('Слушаю и повинуюсь...');
console.log('%c  Чего ты ждешь? Присоединяйся!', r);
console.log(
  '%cПрисоединиться здесь: https://t.me/joinchat/BmXj_kK5vnoAWdQF7tTc1g',
  'font-size:15px; line-height: normal'
);
console.groupEnd();
