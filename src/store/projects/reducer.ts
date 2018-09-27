import { AxiosResponse } from 'axios';
import get from 'lodash-es/get';
import { Action, ActionMeta, handleActions } from 'redux-actions';

import { IMeta } from 'src/@types';
import { DownloadList } from '../@common/entities';
import { TaskType } from '../task-types';
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
  return new DownloadList({
    ...state,
    isLoading: true,
  });
};

const getAllProjectsSuccessHandler = (state: S, { payload }: Action<P>): S => {
  return new DownloadList({
    ...state,
    isLoaded: true,
    isLoading: false,
    list:
      payload && (payload as AxiosResponse).data && (payload as AxiosResponse).data.map((el: any) => new Project(el)),
  });
};

const getAllProjectsFailHandler = (state: S): S => {
  return new DownloadList();
};

const postProjectSuccessHandler = (state: DownloadList, { payload }: Action<P>) => {
  return new DownloadList({
    ...state,
    list: payload ? [...state.list, new Project((payload as AxiosResponse).data)] : state.list,
  });
};

const addTaskTypeToProjectHandler = (state: DownloadList, { payload }: Action<P>) => {
  const index = state.list.findIndex(el => get(payload, 'projectId') === el.id);
  return new DownloadList({
    ...state,
    list: [
      ...state.list.slice(0, index),
      {
        ...state.list[index],
        taskTypes: [...state.list[index].taskTypes, new TaskType({ id: get(payload, 'taskTypeId') })],
      },
      ...state.list.slice(index + 1),
    ],
  });
};

const removeProjectSuccessHandler = (state: S, { meta }: ActionMeta<P, M>) => {
  const index = state.list.findIndex(el => el.id === meta.previousAction.payload.projectId);
  return new DownloadList({
    ...state,
    list: [...state.list.slice(0, index), ...state.list.slice(index + 1)],
  });
};

const fetchProjectDetailsSuccessHandler = (state: S, { payload }: Action<P>) => {
  const data = get(payload, 'data');
  const index = state.list.findIndex(el => el.id === data.id);
  return new DownloadList({
    ...state,
    list: [
      ...state.list.slice(0, index),
      new Project({
        ...state.list[index],
        ...data,
      }),
      ...state.list.slice(index + 1),
    ],
  });
};

const deleteTaskTypeFromProjectHandler = (state: S, { payload }: Action<P>) => {
  const projectIndex = state.list.findIndex(el => get(payload, 'projectId') === el.id);
  const taskTypeIndex = state.list[projectIndex].taskTypes.findIndex(el => get(payload, 'taskTypeId') === el.id);
  return new DownloadList({
    ...state,
    list: [
      ...state.list.slice(0, projectIndex),
      new Project({
        ...state.list[projectIndex],
        taskTypes: [
          ...state.list[projectIndex].taskTypes.slice(0, taskTypeIndex),
          ...state.list[projectIndex].taskTypes.slice(taskTypeIndex + 1),
        ],
      }),
      ...state.list.slice(projectIndex + 1),
    ],
  });
};

const postProjectMemberHandler = (state: S, { payload }: Action<P>) => {
  const projectIndex = state.list.findIndex(el => get(payload, 'projectId') === el.id);
  return new DownloadList({
    ...state,
    list: [
      ...state.list.slice(0, projectIndex),
      new Project({
        ...state.list[projectIndex],
        members: [
          ...state.list[projectIndex].members,
          new Member({
            accessLevel: 1,
            member: { email: (payload as IM).email },
            status: 0,
          }),
        ],
      }),
      ...state.list.slice(projectIndex + 1),
    ],
  });
};

const postProjectMemberSuccessHandler = (state: S, { payload, meta }: ActionMeta<P, M>) => {
  const projectIndex = state.list.findIndex(el => meta.previousAction.payload.projectId === el.id);
  const memberIndex = state.list[projectIndex].members.findIndex(
    el => meta.previousAction.payload.email === el.member.email
  );
  return new DownloadList({
    ...state,
    list: [
      ...state.list.slice(0, projectIndex),
      new Project({
        ...state.list[projectIndex],
        members: [
          ...state.list[projectIndex].members.slice(0, memberIndex),
          new Member((payload as AxiosResponse).data),
          ...state.list[projectIndex].members.slice(memberIndex + 1),
        ],
      }),
      ...state.list.slice(projectIndex + 1),
    ],
  });
};

const postProjectMemberFailHandler = (state: S, { meta }: ActionMeta<P, M>) => {
  const projectIndex = state.list.findIndex(el => meta.previousAction.payload.projectId === el.id);
  return new DownloadList({
    ...state,
    list: [
      ...state.list.slice(0, projectIndex),
      new Project({
        ...state.list[projectIndex],
        members: state.list[projectIndex].members.slice(0, state.list[projectIndex].members.length - 1),
      }),
      ...state.list.slice(projectIndex + 1),
    ],
  });
};

const deleteProjectMemberHandler = (state: S, { payload }: Action<P>) => {
  const projectIndex = state.list.findIndex(el => (payload as IM).projectId === el.id);
  const memberIndex = state.list[projectIndex].members.findIndex(el => (payload as IM).memberId === el.member.id);
  return new DownloadList({
    ...state,
    list: [
      ...state.list.slice(0, projectIndex),
      new Project({
        ...state.list[projectIndex],
        members: [
          ...state.list[projectIndex].members.slice(0, memberIndex),
          ...state.list[projectIndex].members.slice(memberIndex + 1),
        ],
      }),
      ...state.list.slice(projectIndex + 1),
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
  new DownloadList()
);
