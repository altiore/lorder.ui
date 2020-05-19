import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { Task } from '../tasks';

import { IState } from '@types';

const baseState = (state: IState) => state.project;

export const selectedProjectId = createDeepEqualSelector(baseState, (state: { selected?: number }) => state.selected);

export const getNewOption = createDeepEqualSelector([selectedProjectId], projectId => (inputValue: string) =>
  new Task({ title: inputValue || '', projectId })
);

export const createUserTaskFormInitials = createDeepEqualSelector(selectedProjectId, projectId => ({ projectId }));

export const projectRoles = createDeepEqualSelector(baseState, s => s.roles || []);

export const projectParts = createDeepEqualSelector(baseState, s => s.parts);
