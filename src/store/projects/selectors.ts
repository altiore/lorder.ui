import { createSelector } from 'reselect';

import { IState, ITask, IUser } from 'src/@types';
import { DownloadList } from 'src/store/@common/entities';
import { routeProjectId } from 'src/store/router';
import { currentProjectId } from 'src/store/timer';
import { timePercentByProjectId, timeSpentByProjectId } from 'src/store/user-works';
import { Member } from './members/Member';
import { Project } from './Project';

const baseState = (state: IState) => state.projects;

export const allProjectList = createSelector([baseState], (state: DownloadList<Project>): Project[] => state.list);

export const ownProjectList = createSelector(
  [baseState],
  (state: DownloadList<Project>): Project[] => state.list.filter(el => typeof el.accessLevel === 'number')
);

// export const ownProjectListWithoutDefault = createSelector(
//   [ownProjectList, defaultProjectId],
//   (state: Project[], defProjectId): Project[] => state.filter(el => el.id !== defProjectId)
// );

export const selectedProject = createSelector(
  [ownProjectList, currentProjectId],
  (projects, id) => id && projects.find(el => el.id === id)
);

export const openedProject = createSelector(
  [ownProjectList, routeProjectId],
  (projects, id) => id && projects.find(el => el.id === id)
);

export const projectMembers = createSelector([openedProject, selectedProject], (opened: Project, selected: Project) => {
  return opened ? opened.members : selected && selected.members;
});

export const projectMembersAsUsers = createSelector(
  projectMembers as any,
  (members: Member[] = []): IUser[] => {
    return members.map(el => el.member);
  }
);

export const projectTaskTypes = createSelector(openedProject, (project: Project) => project && project.taskTypes);

export const getProjectById = createSelector(allProjectList, (list: Project[]) => (id: number): Project =>
  list.find(e => e.id === id) || new Project()
);

export const getLabelForSelectField = createSelector([getProjectById], getProject => (task: ITask) => {
  const project = getProject(task.projectId);
  const projectInfo = project.title ? ` (${project.title})` : '';
  return task.title + projectInfo;
});

export const ownProjectListWithStatistic = createSelector(
  [ownProjectList, timePercentByProjectId, timeSpentByProjectId],
  (list: Project[] = [], getPercent, getTime) =>
    list.map<Partial<Project> & { percent: string | number; time: string }>(project => ({
      ...project,
      percent: getPercent(project.id as number),
      time: getTime(project.id as number),
    }))
);

export const selectedProjectWithStatistic = createSelector(
  [ownProjectListWithStatistic, selectedProject],
  (list, project) => project && list.find(el => el.id === project.id)
);
