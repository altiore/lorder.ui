import moment from 'moment';
import { handleActions } from 'redux-actions';

import { IMeta } from '@types';

import { resetGlobalCache } from './actions';
import { Other } from './Other';

type S = Other;
type P = any;
type M = IMeta<any>;

const resetGlobalCacheSuccess = () => {
  return new Other({
    cashResetAt: moment(),
  });
};

export const other: any = handleActions<S, P, M>(
  {
    [resetGlobalCache.success]: resetGlobalCacheSuccess,
  },
  new Other()
);
