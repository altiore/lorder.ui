import pick from 'lodash-es/pick';
import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { defaultProjectId } from 'src/store/identity/selectors';
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
