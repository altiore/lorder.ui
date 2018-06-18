import { applyMiddleware, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';

import { clientsMiddleware } from './@common/middlewares';
import { rootReducer } from './rootReducer';

export const createStore = (initialState?: any) => {
  const store = createReduxStore(rootReducer, initialState, applyMiddleware(thunk, clientsMiddleware));
  return store;
}
​