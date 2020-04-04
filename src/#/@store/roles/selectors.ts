import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState } from '@types';

const baseState = (state: IState) => state.roles;

export const rolesList = createDeepEqualSelector(baseState, s => s.list);
