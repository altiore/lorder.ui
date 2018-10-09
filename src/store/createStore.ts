import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { ROLE } from '../@types';
import { clientsMiddleware } from './@common/middlewares';
import { createRootReducer } from './guestReducer';

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export async function createStore(initialState?: any) {
  // Create a history of your choosing (we're using a browser history in this case)
  const history = createHistory();
  const rootReducer = await createRootReducer(ROLE.SUPER_ADMIN);

  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history), clientsMiddleware))
  );

  if (module.hot) {
    module.hot.accept('./adminReducers', () => {
      createRootReducer().then(newReducer => store.replaceReducer(newReducer));
    });
  }

  const persistor = persistStore(store);

  // TODO: split reducers to several chunks
  // const injectAsyncReducers = async (role: ROLE): Promise<void> => {
  //   const newReducer = await createRootReducer(role);
  //   console.log('before replace reducer');
  //   store.replaceReducer(newReducer);
  // };

  return { store, history, persistor };
}
