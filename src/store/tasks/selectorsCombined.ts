import { createSelector } from 'reselect';

import { selectedProjectId } from 'src/store/project';
import { allTasks } from 'src/store/tasks';
import { currentTaskId } from 'src/store/timer';

export const filteredByProjectTasks = createSelector(
  [allTasks, selectedProjectId, currentTaskId],
  (tasks, projectId, taskId) =>
    projectId ? tasks.list.filter(el => el.projectId === projectId && el.id !== taskId) : tasks.list
);
