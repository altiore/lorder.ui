import get from 'lodash/get';
import pick from 'lodash/pick';
import { createSelector } from 'reselect';

import { IState } from '@types';
import { defaultProjectId } from '@store/identity/selectors';
import { routeProjectId, routeTaskSequenceNumber } from '@store/router/selectors';
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
  (allTaskList: Task[]) => (projectId: number, sequenceNumber: number) => {
    return (
      pick<any>(allTaskList.find((el: Task) => el.projectId === projectId && el.sequenceNumber === sequenceNumber), [
        'description',
        'id',
        'sequenceNumber',
        'isDetailsLoaded',
        'source',
        'title',
        'status',
        'value',
        'performerId',
      ]) || {}
    );
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
  [allTaskList, routeProjectId, routeTaskSequenceNumber],
  (list, projectId, sequenceNumber) => {
    return list.find(el => el.sequenceNumber === sequenceNumber && el.projectId === projectId);
  }
);

export const isCurrentTaskDetailsLoaded = createSelector(
  [currentTaskDetails],
  s => get(s, 'isDetailsLoaded', false)
);
