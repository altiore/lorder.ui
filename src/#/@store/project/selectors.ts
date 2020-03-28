import { createSelector } from 'reselect';

import { Task } from '../tasks';

import { IState } from '@types';

const baseState = (state: IState) => state.project;

export const selectedProjectId = createSelector(
  baseState,
  (state: { selected?: number }) => state.selected
);

export const getNewOption = createSelector(
  [selectedProjectId],
  projectId => (inputValue: string) => new Task({ title: inputValue || '', projectId })
);

export const createUserTaskFormInitials = createSelector(
  selectedProjectId,
  projectId => ({ projectId })
);

export const projectRoles = createSelector(
  baseState,
  s => s.roles || []
);
