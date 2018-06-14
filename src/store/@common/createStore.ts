import { createStore as createReduxStore } from 'redux';

export const createStore = (initialState: any) => {
  const store = createReduxStore((state: any) => state, initialState);
  return store;
}
​