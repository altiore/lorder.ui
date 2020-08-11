import { createDeepEqualSelector } from '#/@store/@common/createSelector';

import { Task } from '../tasks';

import { IState } from '@types';
import { flatToHierarchy } from '@utils/flat-to-hierarchy';

const baseState = (state: IState) => state.project;

export const selectedProjectId = createDeepEqualSelector(baseState, (state: { selected?: number }) => state.selected);

export const getNewOption = createDeepEqualSelector([selectedProjectId], projectId => (inputValue: string) =>
  new Task({ title: inputValue || '', projectId })
);

export const projectRoles = createDeepEqualSelector(baseState, s => s.roles || []);

export const projectParts = createDeepEqualSelector(baseState, s => s.parts);

export const projectPartsTree = createDeepEqualSelector(projectParts, parts => {
  return flatToHierarchy(parts);
});
