import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import omit from 'lodash/omit';
import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { replaceReducers } from '#/@store/asyncReducers';
import { loadInitialData } from '#/@store/identity';
import { getIntl } from '#/@store/intl/thunk';
import { initSockets } from '#/@store/sockets';

import clientsMiddleware from './@common/middlewares/clients/clientsMiddleware';
import { refreshTokenMiddleware } from './@common/middlewares/refreshToken';
import { createRootReducer } from './createRootReducer';
import { initExternalLibraries } from './externalLibraries/thunk';

import { ROLE } from '@types';

const isDevtoolsAvailable =
  process.env.NODE_ENV === 'development' && (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = isDevtoolsAvailable ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export const history = createBrowserHistory();
export let store;

export async function createStore(initialState?: any) {
  // Create a history of your choosing (we're using a browser history in this case)
  const rootReducer = await createRootReducer(history, ROLE.SUPER_ADMIN);

  store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history), refreshTokenMiddleware, clientsMiddleware))
  );

  if (module.hot) {
    module.hot.accept('./createRootReducer', () => {
      createRootReducer(history).then((newReducer: any) => store.replaceReducer(newReducer));
    });
  }

  store.persistor = persistStore(store, undefined, async () => {
    store.dispatch(replaceReducers(Object.getOwnPropertyNames(rootReducer)));
    await store.dispatch(getIntl());
    await store.dispatch(initExternalLibraries() as any);
    await store.dispatch(initSockets() as any);
    await store.dispatch(loadInitialData() as any);
  });

  return { store, history };
}

export function injectAsyncReducers(asyncReducers) {
  store.asyncReducers = { ...store.asyncReducers, ...asyncReducers };
  return createRootReducer(history, store.asyncReducers).then(newReducer => {
    store.replaceReducer(newReducer);
    store.dispatch(replaceReducers(store.asyncReducers));
    if (store.persistor) {
      store.persistor.persist();
    }
  });
}

export function removeAsyncReducers(asyncReducers) {
  store.asyncReducers = omit(store.asyncReducers, Object.keys(asyncReducers));
  return createRootReducer(history, store.asyncReducers).then(newReducer => {
    store.replaceReducer(newReducer);
    store.dispatch(replaceReducers(store.asyncReducers));
    if (store.persistor) {
      store.persistor.persist();
    }
  });
}
