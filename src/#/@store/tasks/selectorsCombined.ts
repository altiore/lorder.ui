import get from 'lodash/get';
import includes from 'lodash/includes';
import moment from 'moment';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { defaultProjectId, userId } from '#/@store/identity/selectors';
import { routeProjectId } from '#/@store/router';
import { Task } from '#/@store/tasks/Task';
import { filteredMembers, searchTerm, tasksFilter } from '#/@store/tasksFilter';
import { currentTask, currentTaskId } from '#/@store/timer';
import { lastUserWorks } from '#/@store/user-works/selectors';

import { allTasks, getTaskById } from './selectors';

import { IDownloadList, IEvent, ITask, IUserWork } from '@types';

export const filteredByPerformerTasks = createDeepEqualSelector(
  [allTasks, userId, currentTaskId],
  (tasks, currentUserId, taskId) =>
    currentUserId ? tasks.list.filter(el => el.performerId === currentUserId && el.id !== taskId) : []
);

const filteredFunction = {
  new: (a: ITask, b: ITask) => (a.id > b.id ? -1 : 1),
  recent: (a: ITask, b: ITask) => (a.id < b.id ? -1 : 1),
  smart: (a: ITask, b: ITask) => (a.value > b.value ? -1 : 1),
};

export const sortedByFilterTasks = createDeepEqualSelector(
  [filteredByPerformerTasks, tasksFilter],
  (tasks = [], filter = 'smart') => [...tasks].sort(filteredFunction[filter])
);

export const sortedByFilterTasksWithActive = createDeepEqualSelector(
  [sortedByFilterTasks, currentTask, defaultProjectId],
  (tasks = [], curTask, defProdjId): Array<ITask | 'filter' | undefined> => [
    curTask,
    'filter',
    ...tasks.filter(t => t.id !== get(curTask, 'id') && t.projectId !== defProdjId && includes([1, 2, 3], t.status)),
  ]
);

export const checkIsCurrent = createDeepEqualSelector([currentTaskId], cTaskId => (sequenceNumber: number) =>
  cTaskId === sequenceNumber
);

export const events = createDeepEqualSelector(
  [lastUserWorks, getTaskById, defaultProjectId],
  (userWorks: IDownloadList<IUserWork>, getTask, defPrId: number | undefined): IEvent[] => {
    return userWorks.list
      .filter(uw => moment().diff(uw.startAt, 'hours') <= 24)
      .sort((a, b) => (a.startAt.unix() > b.startAt.unix() ? 1 : -1))
      .map(userWork => {
        const task = getTask(userWork.taskId);
        return {
          data: {
            ...userWork,
            task,
          },
          finishAt: userWork.finishAt,
          isActive: userWork.projectId !== defPrId,
          name: get(task, 'title', userWork.taskId.toString()),
          startAt: userWork.startAt,
        };
      });
  }
);

export const projectTasks = createDeepEqualSelector(
  [allTasks, routeProjectId],
  (list, projectId: number | undefined): Task[] => (projectId ? list.list.filter(el => el.projectId === projectId) : [])
);

export const filteredProjectTasks = createDeepEqualSelector(
  [projectTasks, searchTerm, filteredMembers],
  (list, sTerm = '', members = []) => {
    if (!list || !list.length) {
      return [];
    }
    let res = list;
    if (sTerm) {
      res = res.filter(el => ~el.title.toLowerCase().indexOf(sTerm.trim().toLowerCase()));
    }
    if (members) {
      res = res.filter(el => (members.length ? includes(members, el.performerId) : true));
    }
    return res;
  }
);

export const STATUS_NAMES = ['Резерв', 'Сделать', 'В процессе', 'Обзор', 'Готово'];

export const allStatuses = () => STATUS_NAMES;
