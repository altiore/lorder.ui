import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { DownloadList } from 'src/store/@common/entities';
import { projectId } from 'src/store/router';
import { timePercentByProjectId, timeSpentByProjectId } from 'src/store/user-works';
import { IUser } from 'src/store/users';
import { Member } from './members/Member';
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

export const projectMembersAsUsers = createSelector(
  projectMembers,
  (members: Member[] = []): IUser[] => members.map(el => el.member)
);

export const projectTaskTypes = createSelector(selectedProject, (project: Project) => project && project.taskTypes);

export const getProjectById = createSelector(allProjectList, (list: Project[]) => (id: number): Project =>
  list.find(e => e.id === id) || new Project()
);

export const ownProjectListWithStatistic = createSelector(
  [ownProjectList, timePercentByProjectId, timeSpentByProjectId],
  (list: Project[], getPercent, getTime) =>
    list.map(project => ({
      ...project,
      percent: getPercent(project.id as number),
      time: getTime(project.id as number),
    }))
);
