import * as localForage from 'localforage';
import { reducer as notifications } from 'react-notification-system-redux';
import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { reducer as form } from 'redux-form';
import { persistReducer } from 'redux-persist';

import { IState, ROLE } from 'src/@types';
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

export async function createRootReducer(role: ROLE = ROLE.GUEST) {
  let asyncReducers: Partial<Reducer<IState>> = {};
  switch (role) {
    case ROLE.ADMIN:
      asyncReducers = (await import(/* webpackChunkName: "admin" */ 'src/store/adminReducers')).adminReducers;
      break;
    case ROLE.SUPER_ADMIN:
      asyncReducers = (await import(/* webpackChunkName: "super-admin" */ 'src/store/adminReducers')).adminReducers;
      break;
    case ROLE.USER:
      asyncReducers = (await import(/* webpackChunkName: "user" */ 'src/store/userReducers')).userReducers;
      break;
    case ROLE.GUEST:
    default:
      asyncReducers = {};
      break;
  }
  return persistReducer(
    persistConfig,
    combineReducers<IState>({
      dialog,
      form,
      identity,
      notifications,
      router: routerReducer,
      ui: uiReducer,
      ...(asyncReducers as any),
    })
  );
}
