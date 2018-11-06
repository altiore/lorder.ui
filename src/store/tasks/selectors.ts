import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { selectedProjectId } from 'src/store/project';

export const allTasks = (state: IState) => state.tasks;

export const filteredByProjectTasks = createSelector([allTasks, selectedProjectId], (tasks, projectId) =>
  tasks.list.filter(el => el.projectId === projectId)
);
