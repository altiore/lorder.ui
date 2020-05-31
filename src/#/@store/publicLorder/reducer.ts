import { handleActions } from 'redux-actions';

import { PublicProject } from '#/@store/publicProject/PublicProject';

import { AxiosResponse } from 'axios';

import { fetchLorder } from './actions';

import { IPublicProject } from '@types';

type S = IPublicProject;
type P = AxiosResponse;

const fetchLorderHandler = () => {
  return new PublicProject({
    isLoading: true,
  });
};

const fetchLorderSuccessHandler = (state: S, { payload }: any) => {
  return new PublicProject({ ...payload.data, isLoaded: true, isLoading: false });
};

const fetchLorderFailHandler = () => {
  return new PublicProject({ isLoaded: false, isLoading: false });
};

export const publicLorder: any = handleActions<S, P>(
  {
    [fetchLorder.toString()]: fetchLorderHandler,
    [fetchLorder.success]: fetchLorderSuccessHandler,
    [fetchLorder.fail]: fetchLorderFailHandler,
  },
  new PublicProject()
);
