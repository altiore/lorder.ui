import * as moment from 'moment';
import { createSelector } from 'reselect';

import { IEvent, ITask } from 'src/@types';
import { DownloadList } from 'src/store/@common/entities';
import { defaultProjectId } from 'src/store/identity/selectors';
import { selectedProjectId } from 'src/store/project';
import { allTasks, UserWork } from 'src/store/tasks';
import { tasksFilter } from 'src/store/tasksFilter';
import { currentTaskId } from 'src/store/timer';
import { lastUserWorks } from 'src/store/user-works/selectors';

export const filteredByProjectTasks = createSelector(
  [allTasks, selectedProjectId, currentTaskId],
  (tasks, projectId, taskId) =>
    projectId ? tasks.list.filter(el => el.projectId === projectId && el.id !== taskId) : tasks.list
);

const filteredFunction = {
  recent: (a: ITask, b: ITask) => (a.id < b.id ? -1 : 1),
  smart: (a: ITask, b: ITask) => (a.value > b.value ? -1 : 1),
  ['new']: (a: ITask, b: ITask) => (a.id > b.id ? -1 : 1),
};

export const sortedByFilterTasks = createSelector(
  [filteredByProjectTasks, tasksFilter],
  (tasks = [], filter = 'smart') => [...tasks].sort(filteredFunction[filter])
);

export const checkIsCurrent = createSelector([currentTaskId], cTaskId => (taskId: number) => cTaskId === taskId);

export const events = createSelector(
  [lastUserWorks, defaultProjectId],
  (userWorks: DownloadList<UserWork>, defPrId: number): IEvent[] => {
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
