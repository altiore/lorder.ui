import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { DownloadList } from '#/@store/@common/entities';
import { defaultProjectId } from '#/@store/identity';
import { routeProjectId } from '#/@store/router';
import { currentProjectId } from '#/@store/timer';

import { Project } from './Project';

import { IMember, IProject, IState, IUser } from '@types';

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

export const createUserTaskFormInitials = createDeepEqualSelector([selectedProject], (p: IProject) =>
  p ? { projectId: p.id } : {}
);

export const defaultProjectInfo = createDeepEqualSelector(
  [ownProjectList, defaultProjectId],
  (list, defId) => list && list.find(el => el.id === defId)
);

export const projectsExceptDefault = createDeepEqualSelector(
  [ownProjectList, defaultProjectId],
  (list, defProjectId) => {
    return list
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
      : [];
  }
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
      desc: p.desc,
      monthlyBudget: p.monthlyBudget,
      slogan: p.slogan,
      strategy: p.strategy,
      title: p.title,
    }
);

export const projectMembers = createDeepEqualSelector(
  [openedProject, selectedProject],
  (opened: Project, selected: Project) => {
    const res = opened ? opened.members : selected ? selected.members : { list: [] };
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
  (project: Project | undefined) => project && project.projectTaskTypes && project.projectTaskTypes.list
);

export const getProjectById = createDeepEqualSelector(allProjectList, (list: Project[]) => (id: number): Project =>
  list.find(e => e.id === id) || new Project()
);

export const openedTaskColumns = createDeepEqualSelector([openedProject], pr => (pr ? pr.taskColumns : []));
