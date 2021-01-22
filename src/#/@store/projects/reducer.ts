import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import { Action, ActionMeta, combineActions as combineActionsRedux, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { AxiosResponse } from 'axios';

import { DownloadList } from '../@common/entities';
import { combineActions } from '../@common/helpers';
import {
  addTaskTypeToProject,
  deleteProjectMemberAct,
  deleteTaskTypeFromProject,
  fetchAllParticipantProjectsAction,
  fetchProjectDetails,
  getAllProjects,
  getAllProjectTaskTypes,
  postProject,
  postProjectMember,
  publishProject,
  removeProject,
  removeProjectByAdmin,
  updateProjectAct,
  updateProjectMemberAccessLevel,
  updateStatistic,
  uploadLogoAct,
} from './actions';
import { acceptInvitationAct } from './members/actions';
import { Member } from './members/Member';
import {
  createProjectPartAct,
  deleteProjectPartAct,
  fetchProjectPartsAct,
  updateProjectPartAct,
} from './parts/actions';
import { projectParts } from './parts/reducer';
import { Project } from './Project';
import { projectTaskTypes } from './taskTypes/reducer';

import { ACCESS_LEVEL, IMeta } from '@types';

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
  const preparedPayload = cloneDeep(payload);
  preparedPayload.data = preparedPayload.data.map(el => ({
    ...el,
    ...el.project,
    uuid: get(el, ['project', 'pub', 'uuid']),
  }));
  return state.finishLoading(preparedPayload);
};

const getOwnProjectsFailHandler = (state: S): S => {
  return state.finishLoading();
};

const postProjectSuccessHandler = (state: DownloadList, { payload }: Action<AxiosResponse>) => {
  if (!payload) {
    throw new Error('payload is required!');
  }
  return state.addItem({
    ...payload.data,
    accessLevel: ACCESS_LEVEL.VIOLET,
  });
};

const removeProjectSuccessHandler = (state: S, { meta }: ActionMeta<P, M>) => {
  const index = state.list.findIndex(el => el.id === meta.previousAction.payload.projectId);
  return state.removeItem(index);
};

const fetchProjectDetailsSuccessHandler = (state: S, { payload }: Action<P>) => {
  const data = get(payload, 'data');
  const index = state.list.findIndex(el => el.id === data.id);
  return state.updateItem(index, data);
};

const postProjectMemberHandler = (state: S, { payload }: Action<P>) => {
  const projectIndex = state.list.findIndex(el => get(payload, 'projectId') === el.id);
  return state.updateItem(projectIndex, {
    members: state.list[projectIndex].members.addItem(
      new Member({
        accessLevel: ACCESS_LEVEL.WHITE,
        member: { email: (payload as IM).email },
        roles: [],
      })
    ),
  });
};

const postProjectMemberSuccessHandler = (state: S, { payload, meta }: ActionMeta<P, M>) => {
  const projectIndex = state.list.findIndex(el => meta.previousAction.payload.projectId === el.id);
  const memberIndex = state.list[projectIndex].members.list.findIndex(
    el => meta.previousAction.payload.email === el.member.email
  );
  return state.updateItem(projectIndex, {
    members: state.list[projectIndex].members.updateItem(
      memberIndex,
      new Member({
        roles: [],
        ...(payload as AxiosResponse).data,
      })
    ),
  });
};

const postProjectMemberFailHandler = (state: S, { meta }: ActionMeta<P, M>) => {
  const projectIndex = state.list.findIndex(el => meta.previousAction.payload.projectId === el.id);
  return state.updateItem(projectIndex, {
    members: state.list[projectIndex].members.removeItem(-1),
  });
};

const publishProjectHandler = (state, { payload, meta }) => {
  const projectIndex = state.list.findIndex(el => meta.previousAction.payload.projectId === el.id);
  return state.updateItem(projectIndex, {
    ...payload.data,
    uuid: get(payload, ['data', 'pub', 'uuid']),
  });
};

const updateStatisticStartHandler = (state, { payload, meta }) => {
  return state.startLoading();
};

const updateStatisticEndHandler = (state, { payload, meta }) => {
  return state.stopLoading();
};

const updateProjectMemberAccessLevelHandler = (state: S, { payload }: Action<P>) => {
  const projectIndex = state.list.findIndex(el => get(payload, 'projectId') === el.id);
  const memberIndex = state.list[projectIndex].members.list.findIndex(el => get(payload, 'memberId') === el.member.id);
  let preparedRoles = get(payload, 'request.data.roles');
  preparedRoles = preparedRoles
    ? preparedRoles.map(el => ({
        role: {
          id: el,
        },
      }))
    : undefined;
  const newAccessLevel = get(
    payload,
    'request.data.accessLevel',
    get(state, ['list', projectIndex, 'members', 'list', memberIndex, 'accessLevel'], ACCESS_LEVEL.RED)
  );
  return state.updateItem(projectIndex, {
    members: state.list[projectIndex].members.updateItem(memberIndex, {
      accessLevel: newAccessLevel,
      roles: preparedRoles || state.list[projectIndex].members.list[memberIndex].roles,
    }),
  });
};

const updateProjectMemberAccessLevelSuccessHandler = (state: S, { payload, meta }: any) => {
  const projectIndex = state.list.findIndex(el => get(meta, ['previousAction', 'payload', 'projectId']) === el.id);
  const memberIndex = state.list[projectIndex].members.list.findIndex(
    el => get(meta, ['previousAction', 'payload', 'memberId']) === el.member.id
  );
  const newAccessLevel = get(
    payload,
    ['data', 'accessLevel'],
    get(state, ['list', projectIndex, 'members', 'list', memberIndex, 'accessLevel'], ACCESS_LEVEL.RED)
  );
  return state.updateItem(projectIndex, {
    members: state.list[projectIndex].members.updateItem(memberIndex, {
      accessLevel: newAccessLevel,
      roles: get(payload, ['data', 'roles'], state.list[projectIndex].members.list[memberIndex].roles),
    }),
  });
};

const deleteProjectMemberHandler = (state: S, { payload }: Action<P>) => {
  const projectIndex = state.list.findIndex(el => (payload as IM).projectId === el.id);
  const memberIndex = state.list[projectIndex].members.list.findIndex(el => (payload as IM).memberId === el.member.id);
  return state.updateItem(projectIndex, {
    members: state.list[projectIndex].members.removeItem(memberIndex),
  });
};

const projectTaskTypeHandler = (state: any, action: ActionMeta<any, any>) => {
  let index: number;
  // if meta exists get projectId from meta
  if (action.meta) {
    index = state.list.findIndex(el => get(action.meta, 'previousAction.payload.projectId') === el.id);
  } else {
    index = state.list.findIndex(el => get(action.payload, 'projectId') === el.id);
  }

  if (index === -1) {
    return state;
  }

  return state.updateItem(index, {
    projectTaskTypes: projectTaskTypes(state.list[index].projectTaskTypes, action),
  });
};

const updateProjectHandler = (state: S, { payload }) => {
  const index = state.list.findIndex(el => el.id === get(payload, ['data', 'id']));
  if (index !== -1) {
    return state.updateItem(index, get(payload, 'data'));
  }

  return state;
};

const logOutHandler = () => {
  return new DownloadList(Project);
};

const acceptInvitationHandler = (state: S, { payload }: any) => {
  const index = state.list.findIndex(el => get(payload, ['data', 'project', 'id']) === el.id);

  // TODO: check that this logic is correct
  return state.updateItem(index, {
    accessLevel: get(payload, ['data', 'accessLevel']),
  });
};

const uploadLogoHandler = (state: S, { payload, meta }: any) => {
  const index = state.list.findIndex(el => el.id === meta?.previousAction?.payload?.projectId);
  if (index >= 0) {
    return state.updateItem(index, {
      logo: payload.data,
    });
  }

  return state;
};

const projectPartHandler = (state: any, action: ActionMeta<any, any>) => {
  let index: number;
  // if meta exists get projectId from meta
  if (action.meta) {
    index = state.list.findIndex(el => get(action.meta, 'previousAction.payload.projectId') === el.id);
  } else {
    index = state.list.findIndex(el => get(action.payload, 'projectId') === el.id);
  }

  if (index === -1) {
    return state;
  }

  return state.updateItem(index, {
    parts: projectParts(state.list[index]?.parts, action),
  });
};

export const projects: any = handleActions<S, any, any>(
  {
    [postProject.success]: postProjectSuccessHandler,
    [combineActionsRedux(
      fetchAllParticipantProjectsAction.toString(),
      getAllProjects.toString()
    ).toString()]: getOwnProjectsHandler,
    [combineActionsRedux(
      fetchAllParticipantProjectsAction.success,
      getAllProjects.success
    ).toString()]: getOwnProjectsSuccessHandler,
    [combineActionsRedux(
      fetchAllParticipantProjectsAction.fail,
      getAllProjects.fail
    ).toString()]: getOwnProjectsFailHandler,
    [combineActionsRedux(removeProject.success, removeProjectByAdmin.success).toString()]: removeProjectSuccessHandler,
    [fetchProjectDetails.success]: fetchProjectDetailsSuccessHandler,
    [postProjectMember.toString()]: postProjectMemberHandler,
    [postProjectMember.success]: postProjectMemberSuccessHandler,
    [postProjectMember.fail]: postProjectMemberFailHandler,

    [publishProject.success]: publishProjectHandler,
    [updateStatistic.toString()]: updateStatisticStartHandler,
    [updateStatistic.success]: updateStatisticEndHandler,
    [updateStatistic.fail]: updateStatisticEndHandler,

    [updateProjectMemberAccessLevel.toString()]: updateProjectMemberAccessLevelHandler,
    [updateProjectMemberAccessLevel.success]: updateProjectMemberAccessLevelSuccessHandler,

    [deleteProjectMemberAct.toString()]: deleteProjectMemberHandler,
    [combineActions(getAllProjectTaskTypes, addTaskTypeToProject, deleteTaskTypeFromProject)]: projectTaskTypeHandler,

    [updateProjectAct.success]: updateProjectHandler,
    [PURGE]: logOutHandler,

    [acceptInvitationAct.success]: acceptInvitationHandler,
    [uploadLogoAct.success]: uploadLogoHandler,

    [combineActions(
      fetchProjectPartsAct,
      createProjectPartAct,
      deleteProjectPartAct,
      updateProjectPartAct
    )]: projectPartHandler,
  },
  new DownloadList(Project)
);
