import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { DownloadList } from '#/@store/@common/entities';
import { routeProjectId } from '#/@store/router';
import { currentProjectId } from '#/@store/timer';
import { timePercentByProjectId, timeSpentByProjectId } from '#/@store/user-works';

import { Member } from './members/Member';
import { Project } from './Project';

import { IState, ITask, IUser } from '@types';

const baseState = (state: IState) => state.projects;

export const allProjectList = createDeepEqualSelector(
  [baseState],
  (state: DownloadList<Project>): Project[] => state.list
);

export const ownProjectList = createDeepEqualSelector([baseState], (state: DownloadList<Project>): Project[] =>
  state.list.filter(el => typeof el.accessLevel === 'number')
);

export const selectedProject: any = createDeepEqualSelector(
  [ownProjectList, currentProjectId],
  (projects, id) => id && projects.find(el => el.id === id)
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
    return opened ? opened.members : selected && selected.members;
  }
);

export const projectMembersAsUsers = createDeepEqualSelector(
  projectMembers as any,
  (members: Member[] = []): IUser[] => {
    return members.map(el => el.member);
  }
);

export const getProjectMemberById = createDeepEqualSelector([projectMembersAsUsers], members => userId =>
  members && members.find(el => el.id === userId)
);

export const projectTaskTypes = createDeepEqualSelector(
  openedProject as any,
  (project: Project) => project && project.taskTypes
);

export const getProjectById = createDeepEqualSelector(allProjectList, (list: Project[]) => (id: number): Project =>
  list.find(e => e.id === id) || new Project()
);

export const getLabelForSelectField = createDeepEqualSelector([getProjectById], getProject => (task: ITask) => {
  const project = getProject(task.projectId);
  const projectInfo = project.title ? ` (${project.title})` : '';
  return task.title + projectInfo;
});

export const ownProjectListWithStatistic = createDeepEqualSelector(
  [ownProjectList, timePercentByProjectId, timeSpentByProjectId],
  (list: Project[] = [], getPercent, getTime) =>
    list.map<Partial<Project> & { percent: string | number; time: string }>(project => ({
      ...project,
      percent: getPercent(project.id as number),
      time: getTime(project.id as number),
    }))
);

export const selectedProjectWithStatistic = createDeepEqualSelector(
  [ownProjectListWithStatistic, selectedProject],
  (list, project) => project && list.find(el => el.id === (project as any).id)
);
