import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore as createReduxStore, Store } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { clientsMiddleware } from './@common/middlewares';
import { createRootReducer } from './guestReducer';

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export function createStore(initialState?: any) {
  // Create a history of your choosing (we're using a browser history in this case)
  const history = createHistory();

  const store = createReduxStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history), clientsMiddleware))
  );

  const persistor = persistStore(store);

  return { store, history, persistor };
}

export function injectAsyncReducers(store: Store, asyncReducers: any): void {
  store.replaceReducer(createRootReducer(asyncReducers));
}
