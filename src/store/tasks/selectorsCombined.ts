import { createSelector } from 'reselect';

import { selectedProjectId } from 'src/store/project';
import { allTasks, ITask } from 'src/store/tasks';
import { tasksFilter } from 'src/store/tasksFilter';
import { currentTaskId } from 'src/store/timer';

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
