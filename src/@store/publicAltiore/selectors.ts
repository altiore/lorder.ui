import get from 'lodash/get';
import { createSelector } from 'reselect';

import { IState } from '@types';
import { PublicProject } from '@store/publicProject';

export const publicAltioreData = (state: IState): PublicProject => state.publicAltiore;

export const altioreStatistic = createSelector(
  publicAltioreData,
  s => s.statistic
);

export const altioreMembers = createSelector(
  altioreStatistic,
  s => get(s, 'members', [])
);
