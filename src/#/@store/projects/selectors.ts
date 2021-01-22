import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { DownloadList } from '#/@store/@common/entities';
import { defaultProjectId } from '#/@store/identity';
import { routeProjectId } from '#/@store/router';
import { currentProjectId } from '#/@store/timer';

import { Project } from './Project';

import { IMember, IProject, IState, IUser, STATUS_NAME } from '@types';

const baseState = (state: IState) => state.projects;

export const allProjectList = createDeepEqualSelector(
  [baseState],
  (state: DownloadList<Project>): Project[] => state.list
);

export const ownProjectList = createDeepEqualSelector([baseState], (state: DownloadList<Project>): Project[] =>
  state.list.filter(el => el && typeof el.accessLevel === 'number')
);

export const selectedProject: any = createDeepEqualSelector([ownProjectList, currentProjectId], (projects, id) =>
  id ? projects.find(el => el.id === id) : undefined
);

export const createUserTaskFormInitials = createDeepEqualSelector([selectedProject], (p: IProject) =>
  p ? { projectId: p.id } : {}
);

export const defaultProjectInfo = createDeepEqualSelector([ownProjectList, defaultProjectId], (list, defId) =>
  list ? list.find(el => el.id === defId) : undefined
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

export const openedProjectStrategy = createDeepEqualSelector([openedProject], p => p?.strategy);

export const openedProjectStrategyInfo = createDeepEqualSelector([openedProject], p => p?.strategyInfo);

export const openedAccessLevel = createDeepEqualSelector([openedProject], p => p && p.accessLevel);

export const openedProjectUserRoles = createDeepEqualSelector(
  [openedProjectStrategyInfo],
  strategy => strategy?.userRoles || []
);

export const initialUpdateProject = createDeepEqualSelector(
  openedProject,
  p =>
    p &&
    (p.pub
      ? {
          desc: p.desc,
          monthlyBudget: p.monthlyBudget,
          slogan: p.slogan,
          strategy: p.strategy,
          title: p.title,
          viewColor: p.viewColor,
          viewType: p.viewType,
        }
      : {
          desc: p.desc,
          monthlyBudget: p.monthlyBudget,
          strategy: p.strategy,
          title: p.title,
        })
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

export const getProjectByUuid = createDeepEqualSelector(allProjectList, (list: Project[]) => (uuid: string): Project =>
  list.find(p => p.pub?.uuid === uuid || p.uuid === uuid) || new Project()
);

export const getTaskColumnsByProjectId = createDeepEqualSelector(getProjectById, getPr => (id: number) => {
  const pr = getPr(id);
  if (pr && pr.taskColumns) {
    return pr.taskColumns;
  }

  return [];
});

export const getMovesByStatus = createDeepEqualSelector(
  getTaskColumnsByProjectId,
  getColumns => (id: number, statusTypeName: STATUS_NAME) => {
    const columns = getColumns(id);
    if (columns) {
      const columnInfo = columns.find(el => el.statuses.includes(statusTypeName));
      return columnInfo ? columnInfo.moves.filter(m => m.from === statusTypeName) : [];
    }

    return null;
  }
);

export const getProjectStrategyByProjectId = createDeepEqualSelector(getProjectById, getPr => (id: number) => {
  const currentProject = getPr(id);
  if (currentProject && currentProject.strategy) {
    return currentProject.strategy;
  }
  return '';
});

export const getStrategyByProjectId = createDeepEqualSelector(getProjectById, getPr => (id: number) => {
  const currentProject = getPr(id);
  if (currentProject && currentProject.strategyInfo) {
    return currentProject.strategyInfo;
  }
  return undefined;
});

export const getPushForwardStatusesByProjectId = createDeepEqualSelector(
  getTaskColumnsByProjectId,
  getColumns => (id: number) => {
    const columns = getColumns(id);
    if (columns && columns.length) {
      return columns.reduce((res, col: any) => {
        if (col.moves.find(el => el.type === 'push_forward')) {
          return res.concat(col.statuses);
        }
        return res;
      }, []);
    }

    return [];
  }
);

export const isLoading = createDeepEqualSelector([baseState], state => state.isLoading);

export const openedTaskColumns = createDeepEqualSelector([openedProject], pr => (pr ? pr.taskColumns : []));
