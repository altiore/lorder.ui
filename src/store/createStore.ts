import { createStore as createReduxStore } from 'redux';

import { IState, rootReducer } from './rootReducer';

export const createStore = (initialState?: IState & undefined) => {
  const store = createReduxStore(rootReducer, initialState);
  return store;
}
​