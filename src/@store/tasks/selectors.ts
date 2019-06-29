import pick from 'lodash/pick';
import { createSelector } from 'reselect';

import { IState } from '@types';
import { defaultProjectId } from '@store/identity/selectors';
import { Task } from './Task';

export const allTasks = (state: IState) => state.tasks;

export const allTaskList = createSelector(allTasks, a => a.list);

export const allTaskListWithoutDefProject = createSelector([allTaskList, defaultProjectId], (list, defProjectId) =>
  list.filter(el => el.projectId !== defProjectId)
);

export const filteredTaskList = createSelector(allTaskList, tasks => tasks);

export const getEditTaskInitialValues = createSelector([allTaskList], (allTaskList: Task[]) => (taskId: number) =>
  pick(allTaskList.find((el: Task) => el.id === taskId), [
    'description',
    'id',
    'isDetailsLoaded',
    'source',
    'title',
    'users',
    'status',
    'value',
  ])
);

export const getUserWorksById = createSelector([allTaskList], tasks => (taskId: number) => {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    return task.userWorks;
  }
  return [];
});
