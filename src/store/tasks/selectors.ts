import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { selectedProjectId } from 'src/store/project';

export const allTasks = (state: IState) => state.tasks;

export const allTaskList = createSelector(allTasks, dr => dr.list);

export const filteredByProjectTasks = createSelector(
  [allTasks, selectedProjectId],
  (tasks, projectId) => (projectId ? tasks.list.filter(el => el.projectId === projectId) : tasks.list)
);
