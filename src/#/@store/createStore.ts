import { routerMiddleware } from 'connected-react-router';
import omit from 'lodash/omit';
import { persistStore } from 'redux-persist';

import { replaceReducers } from '#/@store/asyncReducers';
import { loadInitialData } from '#/@store/identity';
import { initSockets } from '#/@store/sockets';

import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import { clientsMiddleware } from './@common/middlewares';
import { createRootReducer } from './createRootReducer';
import { initExternalLibraries } from './externalLibraries/thunk';
import { rootSaga } from './rootSaga';

import { ROLE } from '@types';

const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export const history = createBrowserHistory();
export let store;

export async function createStore(initialState?: any) {
  // Create a history of your choosing (we're using a browser history in this case)
  const rootReducer = await createRootReducer(history, ROLE.SUPER_ADMIN);
  const sagaMiddleware = createSagaMiddleware();

  store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history), clientsMiddleware, sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./createRootReducer', () => {
      createRootReducer(history).then((newReducer: any) => store.replaceReducer(newReducer));
    });
  }

  store.persistor = persistStore(store, undefined, async () => {
    store.dispatch(replaceReducers(Object.getOwnPropertyNames(rootReducer)));
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
