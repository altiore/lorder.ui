import get from 'lodash/get';
import pick from 'lodash/pick';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { routeProjectId, routeTaskSequenceNumber } from '#/@store/router/selectors';

import { ITaskFormData } from './consts';
import { Task } from './Task';

import { IState, ITask } from '@types';

export const allTasks = (state: IState) => state.tasks;

export const allTaskList = createDeepEqualSelector(allTasks, a => a.list.filter(el => !el.isArchived));

export const isTasksLoaded = createDeepEqualSelector(allTasks, a => a.isLoaded);

export const isTasksLoading = createDeepEqualSelector(allTasks, a => a.isLoading);

export const filteredTaskList = createDeepEqualSelector(allTaskList, tasks => tasks);

export enum EDIT_TASK_FORM_PROPS {
  description = 'description',
  id = 'id',
  sequenceNumber = 'sequenceNumber',
  isDetailsLoaded = 'isDetailsLoaded',
  source = 'source',
  title = 'title',
  status = 'status',
  statusTypeName = 'statusTypeName',
  value = 'value',
  performerId = 'performerId',
  projectId = 'projectId',
  typeId = 'typeId',
}

export const getTaskInitialsFromTask = (task: ITask, userId?: number): ITaskFormData => {
  const initialValues: ITaskFormData =
    pick<ITask, EDIT_TASK_FORM_PROPS>(task, Object.values(EDIT_TASK_FORM_PROPS)) || {};
  const taskProjectParts = task.projectParts;
  initialValues.projectParts = taskProjectParts
    ? taskProjectParts.slice(0).map((el: any) => (typeof el === 'number' ? el : el.id))
    : [];
  if (userId && task.userTasks) {
    const curUserTask = task.userTasks.find(ut => ut.userId === userId);
    if (curUserTask && curUserTask.complexity) {
      initialValues.complexity = curUserTask.complexity;
    }
  }
  return initialValues;
};

export const getEditTaskInitialValues = createDeepEqualSelector(
  [allTaskList],
  (list: Task[]) => (projectId: number, sequenceNumber: number) => {
    const curTask: ITask | undefined = list.find(
      (el: Task) => el.projectId === projectId && el.sequenceNumber === sequenceNumber
    );
    if (curTask) {
      return getTaskInitialsFromTask(curTask);
    }

    return {};
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

export const getTaskIdBySequenceNumber = createDeepEqualSelector([allTaskList], list => (sequenceNumber, projectId) =>
  list.find(el => el.sequenceNumber === sequenceNumber && el.projectId === projectId)?.id
);

export const getTaskById = createDeepEqualSelector([allTaskList], list => taskId => list.find(el => el.id === taskId));

export const getTaskUsersByTaskId = createDeepEqualSelector([getTaskById], getTask => taskId => {
  const task = getTask(taskId);
  if (task) {
    return task.userTasks ? task.userTasks : [];
  }

  return [];
});
