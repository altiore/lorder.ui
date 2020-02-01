import { handleActions } from 'redux-actions';

import { IMeta } from '@types';
import { replaceReducers } from './actions';

interface S {
  list: string[];
}
type M = IMeta<any>;

const replaceReducersHandler = (s, { payload }) => {
  return { list: payload };
};

export const asyncReducersReducer = handleActions<S>(
  {
    [replaceReducers.toString()]: replaceReducersHandler,
  },
  { list: [] }
);
