import get from 'lodash/get';
import pick from 'lodash/pick';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { routeProjectId, routeTaskSequenceNumber } from '#/@store/router/selectors';

import { Task } from './Task';

import { IState, ITask } from '@types';

export const allTasks = (state: IState) => state.tasks;

export const allTaskList = createDeepEqualSelector(allTasks, a => a.list.filter(el => !el.isArchived));

export const isTasksLoaded = createDeepEqualSelector(allTasks, a => a.isLoaded);

export const isTasksLoading = createDeepEqualSelector(allTasks, a => a.isLoading);

export const filteredTaskList = createDeepEqualSelector(allTaskList, tasks => tasks);

export const EDIT_TASK_FORM_PROPS = [
  'description',
  'id',
  'sequenceNumber',
  'isDetailsLoaded',
  'source',
  'title',
  'status',
  'statusTypeName',
  'value',
  'performerId',
  'projectParts',
  'typeId',
];

export const getEditTaskInitialValues = createDeepEqualSelector(
  [allTaskList],
  (list: Task[]) => (projectId: number, sequenceNumber: number) => {
    const curTask: ITask | undefined = list.find(
      (el: Task) => el.projectId === projectId && el.sequenceNumber === sequenceNumber
    );
    const initialValues = pick<any>(curTask || {}, EDIT_TASK_FORM_PROPS) || {};
    if (initialValues.projectParts) {
      initialValues.projectParts = (initialValues.projectParts as any)
        .slice(0)
        .map(el => (typeof el === 'number' ? el : el.id));
    }
    return initialValues;
  }
);

export const getTaskProjectParts = createDeepEqualSelector(
  [allTaskList],
  (list: Task[]) => (projectId: number, sequenceNumber: number) => {
    return get(
      list.find((el: Task) => el.projectId === projectId && el.sequenceNumber === sequenceNumber),
      'projectParts',
      []
    );
  }
);

export const currentTaskDetails = createDeepEqualSelector(
  [allTaskList, routeProjectId, routeTaskSequenceNumber],
  (list, projectId, sequenceNumber) => {
    return list.find(el => el.sequenceNumber === sequenceNumber && el.projectId === projectId);
  }
);

export const getTaskBySequenceNumber = createDeepEqualSelector([allTaskList], list => (sequenceNumber, projectId) =>
  list.find(el => el.sequenceNumber === sequenceNumber && el.projectId === projectId)
);

export const getTaskById = createDeepEqualSelector([allTaskList], list => taskId => list.find(el => el.id === taskId));

export const getTaskUsersByTaskId = createDeepEqualSelector([getTaskById], getTask => taskId => {
  const task = getTask(taskId);
  if (task) {
    return task.userTasks ? task.userTasks : [];
  }

  return [];
});
