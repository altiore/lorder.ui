import { handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { IInfo, Info } from './Info';

import { IMeta } from '@types';

type S = IInfo;
type P = any;
type M = IMeta<any>;

const logOutHandler = () => {
  return new Info();
};

export const info: any = handleActions<S, P, M>(
  {
    [PURGE]: logOutHandler,
  },
  new Info()
);
