import get from 'lodash/get';
import moment from 'moment';
import { createSelector } from 'reselect';

import { IEvent, ITask } from '@types';
import { DownloadList } from '@store/@common/entities';
import { defaultProjectId } from '@store/identity/selectors';
import { selectedProjectId } from '@store/project';
import { allTasks, UserWork } from '@store/tasks';
import { tasksFilter } from '@store/tasksFilter';
import { currentTask, currentTaskId } from '@store/timer';
import { lastUserWorks } from '@store/user-works/selectors';

export const filteredByProjectTasks = createSelector(
  [allTasks, selectedProjectId, currentTaskId],
  (tasks, projectId, taskId) =>
    projectId ? tasks.list.filter(el => el.projectId === projectId && el.id !== taskId) : tasks.list
);

const filteredFunction = {
  new: (a: ITask, b: ITask) => (a.id > b.id ? -1 : 1),
  recent: (a: ITask, b: ITask) => (a.id < b.id ? -1 : 1),
  smart: (a: ITask, b: ITask) => (a.value > b.value ? -1 : 1),
};

export const sortedByFilterTasks = createSelector(
  [filteredByProjectTasks, tasksFilter],
  (tasks = [], filter = 'smart') => [...tasks].sort(filteredFunction[filter])
);

export const sortedByFilterTasksWithActive = createSelector(
  [sortedByFilterTasks, currentTask],
  (tasks = [], curTask): Array<ITask | 'filter' | undefined> => [
    curTask,
    'filter',
    ...tasks.filter(t => t.id !== get(curTask, 'id')),
  ]
);

export const checkIsCurrent = createSelector(
  [currentTaskId],
  cTaskId => (taskId: number) => cTaskId === taskId
);

export const events = createSelector(
  [lastUserWorks, defaultProjectId],
  (userWorks: DownloadList<UserWork>, defPrId: number | undefined): IEvent[] => {
    return userWorks.list
      .filter(uw => moment().diff(uw.startAt, 'hours') <= 24)
      .sort((a, b) => (a.startAt.unix() > b.startAt.unix() ? 1 : -1))
      .map(userWork => ({
        data: userWork,
        finishAt: userWork.finishAt,
        isActive: userWork.projectId !== defPrId,
        name: (userWork.task as ITask).title || userWork.taskId.toString(),
        startAt: userWork.startAt,
      }));
  }
);
