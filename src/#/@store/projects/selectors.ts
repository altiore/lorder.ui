import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { DownloadList } from '#/@store/@common/entities';
import { defaultProjectId } from '#/@store/identity';
import { routeProjectId } from '#/@store/router';
import { currentProjectId } from '#/@store/timer';

import { IMember } from './members/Member';
import { Project } from './Project';

import { IState, IUser } from '@types';

const baseState = (state: IState) => state.projects;

export const allProjectList = createDeepEqualSelector(
  [baseState],
  (state: DownloadList<Project>): Project[] => state.list
);

export const ownProjectList = createDeepEqualSelector([baseState], (state: DownloadList<Project>): Project[] =>
  state.list.filter(el => el && typeof el.accessLevel === 'number')
);

export const selectedProject: any = createDeepEqualSelector(
  [ownProjectList, currentProjectId],
  (projects, id) => id && projects.find(el => el.id === id)
);

export const projectsExceptDefault = createDeepEqualSelector([ownProjectList, defaultProjectId], (list, defProjectId) =>
  list
    ? list
        .filter(el => el.id !== defProjectId)
        .sort((a, b) => {
          if (a.shareValue > b.shareValue) {
            return -1;
          }
          if (a.shareValue < b.shareValue) {
            return 1;
          }
          return 0;
        })
    : []
);

export const openedProject = createDeepEqualSelector([ownProjectList, routeProjectId], (projects, id) => {
  if (id) {
    return projects.find(el => el.id === id);
  } else {
    return undefined;
  }
});

export const openedAccessLevel = createDeepEqualSelector([openedProject], p => p && p.accessLevel);

export const initialUpdateProject = createDeepEqualSelector(
  openedProject,
  p =>
    p && {
      monthlyBudget: p.monthlyBudget,
      title: p.title,
    }
);

export const projectMembers = createDeepEqualSelector(
  [openedProject, selectedProject],
  (opened: Project, selected: Project) => {
    const res = opened ? opened.members : selected && selected.members;
    return res && res.list
      ? res.list.sort((a, b) => {
          if (a.valueSum > b.valueSum) {
            return -1;
          } else if (a.valueSum < b.valueSum) {
            return 1;
          }
          return 0;
        })
      : [];
  }
);

export const projectMembersAsUsers = createDeepEqualSelector([projectMembers], (members: IMember[]): IUser[] => {
  return members.map(el => el.member);
});

export const getProjectMemberById = createDeepEqualSelector([projectMembersAsUsers], members => userId =>
  members && members.find(el => el.id === userId)
);

export const projectTaskTypes = createDeepEqualSelector(
  [openedProject],
  (project: Project | undefined) => project && project.taskTypes
);

export const getProjectById = createDeepEqualSelector(allProjectList, (list: Project[]) => (id: number): Project =>
  list.find(e => e.id === id) || new Project()
);
