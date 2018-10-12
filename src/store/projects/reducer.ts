import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, ActionMeta, handleActions } from 'redux-actions';

import { IMeta } from 'src/@types';
import { DownloadList } from '../@common/entities';
import {
  addTaskTypeToProject,
  deleteProjectMember,
  deleteTaskTypeFromProject,
  fetchProjectDetails,
  getAllProjects,
  postProject,
  postProjectMember,
  removeProject,
} from './actions';
import { Member } from './members/Member';
import { Project } from './Project';

type S = DownloadList<Project>;
interface IM {
  memberId: number;
  projectId: number;
  email: string;
}
type P = AxiosResponse | IM;
type M = IMeta<{ projectId: number; email: string; memberId: number }>;

const getAllProjectsHandler = (state: S): S => {
  return state.startLoading();
};

const getAllProjectsSuccessHandler = (state: S, { payload }: Action<AxiosResponse>): S => {
  return state.finishLoading(payload);
};

const getAllProjectsFailHandler = (state: S): S => {
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
        accessLevel: 1,
        member: { email: (payload as IM).email },
        status: 0,
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

// TODO: add member to delete request in order to have ability revert it back if request failed
// const deleteProjectMemberFailHandler = (state: S, { payload, meta }: ActionMeta<P, M>) => {
//   const projectIndex = state.list.findIndex(el => meta.previousAction.payload.projectId === el.id);
//   const memberIndex = state.list[projectIndex].members.findIndex(el => meta.previousAction.payload.email === el.email);
//   return new DownloadList({
//     ...state,
//     list: [
//       ...state.list.slice(0, projectIndex),
//       new Project({
//         ...state.list[projectIndex],
//         members: [
//           ...state.list[projectIndex].members.slice(0, memberIndex),
//           new User((payload as AxiosResponse).data),
//           ...state.list[projectIndex].members.slice(memberIndex + 1),
//         ],
//       }),
//       ...state.list.slice(projectIndex + 1),
//     ],
//   });
// };

export const projects = handleActions<S, P>(
  {
    [postProject.success]: postProjectSuccessHandler,
    [getAllProjects.toString()]: getAllProjectsHandler,
    [getAllProjects.success]: getAllProjectsSuccessHandler,
    [getAllProjects.fail]: getAllProjectsFailHandler,
    [addTaskTypeToProject.toString()]: addTaskTypeToProjectHandler,
    [removeProject.success]: removeProjectSuccessHandler,
    [fetchProjectDetails.success]: fetchProjectDetailsSuccessHandler,
    [deleteTaskTypeFromProject.toString()]: deleteTaskTypeFromProjectHandler,
    [postProjectMember.toString()]: postProjectMemberHandler,
    [postProjectMember.success]: postProjectMemberSuccessHandler,
    [postProjectMember.fail]: postProjectMemberFailHandler,
    [deleteProjectMember.toString()]: deleteProjectMemberHandler,
    // [deleteProjectMember.fail]: deleteProjectMemberFailHandler,
  },
  new DownloadList(Project)
);
