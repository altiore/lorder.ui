import * as localForage from 'localforage';
import { reducer as notifications } from 'react-notification-system-redux';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { persistReducer } from 'redux-persist';

import { IState } from 'src/@types';
import { dialog } from './dialog';
import { identity } from './identity';
import { uiReducer } from './ui';

localForage.config({
  description: 'Altiore contribution version 1.0',
  name: 'altiore',
  storeName: 'contribution',
  version: 1.0,
});

const persistConfig = {
  blacklist: ['dialog', 'form'],
  key: 'altiore',
  storage: localForage,
};

export function createRootReducer(asyncReducers: any = {}) {
  return persistReducer(
    persistConfig,
    combineReducers<IState>({
      dialog,
      form,
      identity,
      notifications,
      router: routerReducer,
      ui: uiReducer,
      ...asyncReducers,
    })
  );
}
