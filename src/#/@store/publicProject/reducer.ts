import omit from 'lodash/omit';
import { handleActions } from 'redux-actions';

import { updateProjectAct } from '#/@store/projects/actions';

import { AxiosResponse } from 'axios';

import { Project } from '../projects';
import { fetchPublicProject, postRequestMembershipAction } from './actions';
import { PublicProject } from './PublicProject';

import { IPublicProject } from '@types';

type S = IPublicProject;
type P = AxiosResponse;

const fetchPublicProjectHandler = () => {
  return new PublicProject({
    isLoading: true,
  });
};

const fetchPublicProjectSuccessHandler = (state: S, { payload }: any) => {
  return new PublicProject({
    ...payload.data,
    isLoaded: true,
    isLoading: false,
  });
};

const fetchPublicProjectFailHandler = () => {
  return new PublicProject({ isLoaded: false, isLoading: false });
};

const postRequestMembershipHandler = (state: S, { payload }) => {
  return new PublicProject({
    ...state,
    project: new Project({
      ...(state.project || {}),
      members: [...(state.project?.members.list || []), payload.data],
    }),
  });
};

const updateProjectHandler = (state: S, { payload }) => {
  if (state.projectId === payload.data?.id) {
    return new PublicProject({
      ...state,
      project: new Project({
        ...(state.project || {}),
        ...omit(payload.data, ['accessLevel', 'pub']),
      }),
    });
  }

  return state;
};

export const publicProject: any = handleActions<S, P, any>(
  {
    [fetchPublicProject.toString()]: fetchPublicProjectHandler,
    [fetchPublicProject.success]: fetchPublicProjectSuccessHandler,
    [fetchPublicProject.fail]: fetchPublicProjectFailHandler,

    [postRequestMembershipAction.success]: postRequestMembershipHandler,

    [updateProjectAct.success]: updateProjectHandler,
  },
  new PublicProject()
);
