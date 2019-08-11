import get from 'lodash/get';
import pick from 'lodash/pick';
import { createSelector } from 'reselect';

import { IState } from '@types';
import { defaultProjectId } from '@store/identity/selectors';
import { routeTaskId } from '@store/router/selectors';
import { Task } from './Task';

export const allTasks = (state: IState) => state.tasks;

export const allTaskList = createSelector(
  allTasks,
  a => a.list
);

export const allTaskListWithoutDefProject = createSelector(
  [allTaskList, defaultProjectId],
  (list, defProjectId) => list.filter(el => el.projectId !== defProjectId)
);

export const filteredTaskList = createSelector(
  allTaskList,
  tasks => tasks
);

export const getEditTaskInitialValues = createSelector(
  [allTaskList],
  (allTaskList: Task[]) => (taskId: number) => {
    const res: any =
      pick<any>(allTaskList.find((el: Task) => el.id === taskId), [
        'description',
        'id',
        'isDetailsLoaded',
        'source',
        'title',
        'users',
        'status',
        'value',
        'performerId',
      ]) || {};
    res.users = (res.users || []).map(el => el.id || el);
    return res;
  }
);

export const getUserWorksById = createSelector(
  [allTaskList],
  tasks => (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      return task.userWorks;
    }
    return [];
  }
);

export const currentTaskDetails = createSelector(
  [allTaskList, routeTaskId],
  (list, taskId) => {
    return list.find(el => el.id === taskId);
  }
);

export const isCurrentTaskDetailsLoaded = createSelector(
  [currentTaskDetails],
  s => get(s, 'isDetailsLoaded', false)
);
