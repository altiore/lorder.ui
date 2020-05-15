import get from 'lodash/get';
import pick from 'lodash/pick';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { defaultProjectId } from '#/@store/identity/selectors';
import { routeProjectId, routeTaskSequenceNumber } from '#/@store/router/selectors';

import { Task } from './Task';

import { IState } from '@types';

export const allTasks = (state: IState) => state.tasks;

export const allTaskList = createDeepEqualSelector(allTasks, a => a.list);

export const isTasksLoading = createDeepEqualSelector(allTasks, a => a.isLoading);

export const allTaskListWithoutDefProject = createDeepEqualSelector(
  [allTaskList, defaultProjectId],
  (list, defProjectId) => list.filter(el => el.projectId !== defProjectId)
);

export const filteredTaskList = createDeepEqualSelector(allTaskList, tasks => tasks);

export const EDIT_TASK_FORM_PROPS = [
  'description',
  'id',
  'sequenceNumber',
  'isDetailsLoaded',
  'source',
  'title',
  'status',
  'value',
  'performerId',
];

export const getEditTaskInitialValues = createDeepEqualSelector(
  [allTaskList],
  (allTaskList: Task[]) => (projectId: number, sequenceNumber: number) => {
    return (
      pick<any>(
        allTaskList.find((el: Task) => el.projectId === projectId && el.sequenceNumber === sequenceNumber),
        EDIT_TASK_FORM_PROPS
      ) || {}
    );
  }
);

export const currentTaskDetails = createDeepEqualSelector(
  [allTaskList, routeProjectId, routeTaskSequenceNumber],
  (list, projectId, sequenceNumber) => {
    return list.find(el => el.sequenceNumber === sequenceNumber && el.projectId === projectId);
  }
);

export const isCurrentTaskDetailsLoaded = createDeepEqualSelector([currentTaskDetails], s =>
  get(s, 'isDetailsLoaded', false)
);

export const getTaskBySequenceNumber = createDeepEqualSelector([allTaskList], list => (sequenceNumber, projectId) =>
  list.find(el => el.sequenceNumber === sequenceNumber && el.projectId === projectId)
);

export const getTaskById = createDeepEqualSelector([allTaskList], list => taskId => list.find(el => el.id === taskId));
