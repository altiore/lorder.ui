import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { IState } from '@types';

const baseState = (state: IState) => state.tasksFilter;

export const tasksFilter = createDeepEqualSelector(baseState, state => state.filter);

export const searchTerm = createDeepEqualSelector(baseState, state => state.search);

export const projectId = createDeepEqualSelector(baseState, state => state.projectId);

export const filteredMembers = createDeepEqualSelector(baseState, (state): number[] => state.members);

export const filteredOpenedStatuses = createDeepEqualSelector(
  baseState,
  (state): string[] => state.openedStatuses || []
);

export const projectPart = createDeepEqualSelector(baseState, s => s.projectPart);

export const selectedProjectRole = createDeepEqualSelector(baseState, s => s.selectedRole);
