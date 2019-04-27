import intersection from 'lodash-es/intersection';
import { createSelector } from 'reselect';

import { filteredMembers, searchTerm } from 'store/tasksFilter/selectors';
import { DownloadList } from '../../@common/entities';
import { Project } from '../Project';
import { openedProject, selectedProject } from '../selectors';
import { ProjectTask } from './ProjectTask';

export const projectTasks = createSelector(
  openedProject,
  (project: Project = new Project()): DownloadList<ProjectTask> => project.tasks
);

export const filteredProjectTasks = createSelector(
  [projectTasks, searchTerm, filteredMembers],
  (list, sTerm = '', members = []) => {
    if (!sTerm && !members.length) {
      return list ? list.list : [];
    }
    return list && list.list.length
      ? list.list
          .filter(el => ~el.title.toLowerCase().indexOf(sTerm.trim().toLowerCase()))
          .filter(el => (members.length ? !!intersection(members, el.users.map(el => el.id)).length : true))
      : [];
  }
);

export const selectedProjectTasks = createSelector(
  selectedProject,
  (project: Project = new Project()): DownloadList<ProjectTask> => project.tasks
);

export const getSelectedProjectTaskById = createSelector(
  selectedProjectTasks,
  (tasks: DownloadList<ProjectTask>) => (id: number) => tasks.list.find(el => el.id === id)
);

export const projectTasksIsLoading = createSelector(
  projectTasks,
  (tasks: DownloadList<ProjectTask>) => tasks.isLoading
);

export const STATUS_NAMES = ['Резерв', 'Сделать', 'В процессе', 'Обзор', 'Готово'];
