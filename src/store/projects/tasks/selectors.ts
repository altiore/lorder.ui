import { createSelector } from 'reselect';

import { DownloadList } from '../../@common/entities';
import { Project } from '../Project';
import { openedProject } from '../selectors';
import { ProjectTask } from './ProjectTask';

export const projectTasks = createSelector(
  openedProject,
  (project: Project): DownloadList<ProjectTask> => project && project.tasks
);

export const projectTasksIsLoading = createSelector(
  projectTasks,
  (tasks: DownloadList<ProjectTask>) => tasks.isLoading
);

export const getEditTaskInitialValues = createSelector(
  projectTasks,
  (tasks: DownloadList<ProjectTask>) => (taskId: number) => tasks.list.find(el => el.id === taskId)
);
