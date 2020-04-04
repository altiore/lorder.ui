import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState } from '@types';

const baseState = (state: IState) => state.info;

export const infoActivity = createDeepEqualSelector(baseState, s => s.activity);

export const infoPeople = createDeepEqualSelector(baseState, s => s.people);

export const infoProjects = createDeepEqualSelector(baseState, s => s.projects);
