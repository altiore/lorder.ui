import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';

import { clientsMiddleware } from './@common/middlewares';
import { rootReducer } from './rootReducer';

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

export const createStore = (initialState?: any) => {
  // Create a history of your choosing (we're using a browser history in this case)
  const history = createHistory();

  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk, clientsMiddleware)),
  );

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').rootReducer
      store.replaceReducer(nextRootReducer())
    })
  }

  return { store, history };
}
​