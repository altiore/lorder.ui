import pick from 'lodash-es/pick';
import { createSelector } from 'reselect';

import { DownloadList } from '../../@common/entities';
import { Project } from '../Project';
import { getProjectById, openedProject } from '../selectors';
import { ProjectTask } from './ProjectTask';

export const projectTasks = createSelector(
  openedProject,
  (project: Project): DownloadList<ProjectTask> => (project ? project.tasks : new DownloadList(ProjectTask))
);

export const projectTasksIsLoading = createSelector(
  projectTasks,
  (tasks: DownloadList<ProjectTask>) => tasks.isLoading
);

export const getEditTaskInitialValues = createSelector(
  [projectTasks, getProjectById],
  (tasks: DownloadList<ProjectTask>, getProject) => (taskId: number, projectId: number) => {
    const project = getProject(projectId);
    return pick(project.tasks.list.find((el: ProjectTask) => el.id === taskId), [
      'description',
      'id',
      'source',
      'status',
      'title',
      'value',
    ]);
  }
);

export const STATUS_NAMES = ['Резерв', 'Сделать', 'В процессе', 'Обзор', 'Готово'];
