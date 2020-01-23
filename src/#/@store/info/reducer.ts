import { handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { IMeta } from '@types';
import { IInfo, Info } from './Info';

type S = IInfo;
type P = any;
type M = IMeta<any>;

const logOutHandler = () => {
  return new Info();
};

export const info = handleActions<S, P, M>(
  {
    [PURGE]: logOutHandler,
  },
  new Info()
);
