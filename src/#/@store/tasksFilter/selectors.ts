import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState } from '@types';

const baseState = (state: IState) => state.tasksFilter;

export const tasksFilter = createDeepEqualSelector(baseState, state => state.filter);

export const searchTerm = createDeepEqualSelector(baseState, s => s.search);

export const filteredMembers = createDeepEqualSelector(baseState, (s): number[] => s.members);

export const filteredOpenedStatuses = createDeepEqualSelector(baseState, (s): number[] => s.openedStatuses || []);

export const projectPart = createDeepEqualSelector(baseState, s => s.projectPart);
