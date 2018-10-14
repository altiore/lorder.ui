import { createSelector } from 'reselect';

import { DownloadList } from '../../@common/entities';
import { Project } from '../Project';
import { selectedProject } from '../selectors';
import { Task } from './Task';

export const projectTasks = createSelector(
  selectedProject,
  (project: Project): DownloadList<Task> => project && project.tasks
);

export const projectTasksIsLoading = createSelector(projectTasks, (tasks: DownloadList<Task>) => tasks.isLoading);
