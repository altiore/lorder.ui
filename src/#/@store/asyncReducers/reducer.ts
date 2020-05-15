import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { replaceReducers } from './actions';

import { IMeta } from '@types';

interface S {
  list: string[];
}
type M = IMeta<any>;

const replaceReducersHandler = (s, { payload }) => {
  return { list: payload };
};

export const asyncReducersReducer: Reducer<S, any> = handleActions(
  {
    [replaceReducers.toString()]: replaceReducersHandler,
  },
  { list: [] }
);
