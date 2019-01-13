import { MuiThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import * as moment from 'moment';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Dialog from 'src/domains/@common/Dialog';
import Notification from 'src/domains/@common/Notification';
import { App } from './domains';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from './store/createStore';
import theme from './styles/materialTheme';

moment.locale('ru');

createStore().then(({ store, persistor, history }) => {
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
