import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { DownloadList } from '../@common/entities';
import { projectId } from '../router';
import { Project } from './Project';

const baseState = (state: IState) => state.projects;

export const projectsIsLoaded = createSelector(baseState, (state: DownloadList): boolean => state.isLoaded);

export const projectsIsLoading = createSelector(baseState, (state: DownloadList): boolean => state.isLoading);

export const allProjectList = createSelector([baseState], (state: DownloadList<Project>): Project[] => state.list);

export const ownProjectList = createSelector(
  [baseState],
  (state: DownloadList<Project>): Project[] => state.list.filter(el => typeof el.accessLevel === 'number')
);

export const selectedProject = createSelector(
  [ownProjectList, projectId],
  (projects, id) => id && projects.find(el => el.id === id)
);

export const projectMembers = createSelector(selectedProject, (project: Project) => project && project.members);

export const projectTaskTypes = createSelector(selectedProject, (project: Project) => project && project.taskTypes);

export const getProjectById = createSelector(allProjectList, (list: Project[]) => (id: number): Project =>
  list.find(e => e.id === id) || new Project()
);
