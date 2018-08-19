import { createSelector } from 'reselect';

import { DownloadList } from '../@common/entities';
import { IState } from '../rootReducer';
import { projectId } from '../router';
import { Project } from './Project';

const baseState = (state: IState) => state.projects;

export const projectsIsLoaded = createSelector(baseState, (state: DownloadList): boolean => state.isLoaded);

export const projectsIsLoading = createSelector(baseState, (state: DownloadList): boolean => state.isLoading);

export const projectList = createSelector(baseState, (state: DownloadList<Project>): Project[] => state.list);

export const selectedProject = createSelector([projectList, projectId], (projects, id) => {
  console.log('selectedProject selector', {
    id,
    projects,
  });
  return id && projects.find(el => el.id === id);
});
