import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, ActionMeta, combineActions as combineActionsRedux, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { IMeta } from 'src/@types';
import { DownloadList } from '../@common/entities';
import { combineActions } from '../@common/helpers';
import {
  addTaskTypeToProject,
  deleteProjectMember,
  deleteProjectTask,
  deleteTaskTypeFromProject,
  fetchProjectDetails,
  getAllProjects,
  getAllProjectTasks,
  getAllProjectTaskTypes,
  getOwnProjects,
  patchProjectTask,
  postProject,
  postProjectMember,
  postProjectTask,
  removeProject,
} from './actions';
import { Member } from './members/Member';
import { Project } from './Project';
import { projectTasks } from './tasks/reducer';
import { projectTaskTypes } from './taskTypes/reducer';

type S = DownloadList<Project>;
interface IM {
  memberId: number;
  projectId: number;
  email: string;
}
type P = AxiosResponse | IM;
type M = IMeta<{ projectId: number; email: string; memberId: number }>;

const getOwnProjectsHandler = (state: S): S => {
  return state.startLoading();
};

const getOwnProjectsSuccessHandler = (state: S, { payload }: Action<AxiosResponse>): S => {
  return state.finishLoading(payload);
};

const getOwnProjectsFailHandler = (state: S): S => {
  return state.finishLoading();
};

const postProjectSuccessHandler = (state: DownloadList, { payload }: Action<AxiosResponse>) => {
  return state.addItem(payload && payload.data);
};

const removeProjectSuccessHandler = (state: S, { meta }: ActionMeta<P, M>) => {
  const index = state.list.findIndex(el => el.id === meta.previousAction.payload.projectId);
  return state.removeItem(index);
};

const addTaskTypeToProjectHandler = (state: DownloadList, { payload }: Action<P>) => {
  const index = state.list.findIndex(el => get(payload, 'projectId') === el.id);
  return state.updateItem(index, {
    taskTypes: state.list[index].taskTypes.addItem({ id: get(payload, 'taskTypeId') }),
  });
};

const deleteTaskTypeFromProjectHandler = (state: S, { payload }: Action<P>) => {
  const projectIndex = state.list.findIndex(el => get(payload, 'projectId') === el.id);
  const taskTypeIndex = state.list[projectIndex].taskTypes.list.findIndex(el => get(payload, 'taskTypeId') === el.id);
  const newTaskTypes = state.list[projectIndex].taskTypes.removeItem(taskTypeIndex);
  return state.updateItem(projectIndex, {
    taskTypes: newTaskTypes,
  });
};

const fetchProjectDetailsSuccessHandler = (state: S, { payload }: Action<P>) => {
  const data = get(payload, 'data');
  const index = state.list.findIndex(el => el.id === data.id);
  return state.updateItem(index, data);
};

const postProjectMemberHandler = (state: S, { payload }: Action<P>) => {
  const projectIndex = state.list.findIndex(el => get(payload, 'projectId') === el.id);
  return state.updateItem(projectIndex, {
    members: [
      ...state.list[projectIndex].members,
      new Member({
        accessLevel: 0,
        member: { email: (payload as IM).email },
      }),
    ],
  });
};

const postProjectMemberSuccessHandler = (state: S, { payload, meta }: ActionMeta<P, M>) => {
  const projectIndex = state.list.findIndex(el => meta.previousAction.payload.projectId === el.id);
  const memberIndex = state.list[projectIndex].members.findIndex(
    el => meta.previousAction.payload.email === el.member.email
  );
  return state.updateItem(projectIndex, {
    members: [
      ...state.list[projectIndex].members.slice(0, memberIndex),
      new Member((payload as AxiosResponse).data),
      ...state.list[projectIndex].members.slice(memberIndex + 1),
    ],
  });
};

const postProjectMemberFailHandler = (state: S, { meta }: ActionMeta<P, M>) => {
  const projectIndex = state.list.findIndex(el => meta.previousAction.payload.projectId === el.id);
  return state.updateItem(projectIndex, {
    members: state.list[projectIndex].members.slice(0, state.list[projectIndex].members.length - 1),
  });
};

const deleteProjectMemberHandler = (state: S, { payload }: Action<P>) => {
  const projectIndex = state.list.findIndex(el => (payload as IM).projectId === el.id);
  const memberIndex = state.list[projectIndex].members.findIndex(el => (payload as IM).memberId === el.member.id);
  return state.updateItem(projectIndex, {
    members: [
      ...state.list[projectIndex].members.slice(0, memberIndex),
      ...state.list[projectIndex].members.slice(memberIndex + 1),
    ],
  });
};

const projectTaskHandler = (state: S, action: ActionMeta<any, any>) => {
  let index: number;
  // if meta exists get projectId from meta
  if (action.meta) {
    index = state.list.findIndex(el => get(action.meta, 'previousAction.payload.projectId') === el.id);
  } else {
    index = state.list.findIndex(el => get(action.payload, 'projectId') === el.id);
  }

  return state.updateItem(index, {
    tasks: projectTasks(state.list[index].tasks, action),
  });
};

const projectTaskTypeHandler = (state: S, action: ActionMeta<any, any>) => {
  let index: number;
  // if meta exists get projectId from meta
  if (action.meta) {
    index = state.list.findIndex(el => get(action.meta, 'previousAction.payload.projectId') === el.id);
  } else {
    index = state.list.findIndex(el => get(action.payload, 'projectId') === el.id);
  }

  return state.updateItem(index, {
    taskTypes: projectTaskTypes(state.list[index].taskTypes, action),
  });
};

const getAllProjectTasksHandler = (state: S, { meta, payload }: ActionMeta<AxiosResponse, any>) => {
  const data = get(payload, 'data');
  const projectId = get(meta, 'previousAction.payload.projectId');
  const index = state.list.findIndex(el => el.id === projectId);
  return state.updateItem(index, {
    tasks: data,
  });
};

const logOutHandler = () => {
  return new DownloadList(Project);
};

export const projects = handleActions<S, P>(
  {
    [postProject.success]: postProjectSuccessHandler,
    [combineActionsRedux(getOwnProjects, getAllProjects).toString()]: getOwnProjectsHandler,
    [combineActionsRedux(getOwnProjects.success, getAllProjects.success).toString()]: getOwnProjectsSuccessHandler,
    [combineActionsRedux(getOwnProjects.fail, getAllProjects.fail).toString()]: getOwnProjectsFailHandler,
    [addTaskTypeToProject.toString()]: addTaskTypeToProjectHandler,
    [removeProject.success]: removeProjectSuccessHandler,
    [fetchProjectDetails.success]: fetchProjectDetailsSuccessHandler,
    [deleteTaskTypeFromProject.toString()]: deleteTaskTypeFromProjectHandler,
    [postProjectMember.toString()]: postProjectMemberHandler,
    [postProjectMember.success]: postProjectMemberSuccessHandler,
    [postProjectMember.fail]: postProjectMemberFailHandler,
    [deleteProjectMember.toString()]: deleteProjectMemberHandler,
    [combineActions(postProjectTask, patchProjectTask, deleteProjectTask)]: projectTaskHandler,
    [combineActions(getAllProjectTaskTypes)]: projectTaskTypeHandler,
    [getAllProjectTasks.success]: getAllProjectTasksHandler,
    [PURGE]: logOutHandler,
  },
  new DownloadList(Project)
);
