import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';

import { fetchAltiore } from './actions';
import { PublicProject } from '#/@store/publicProject/PublicProject';
import { IPublicProject } from '@types';

type S = IPublicProject;
type P = AxiosResponse;

const fetchAltioreHandler = () => {
  return new PublicProject({
    isLoading: true,
  });
};

const fetchAltioreSuccessHandler = (state: S, { payload }: any) => {
  return new PublicProject({ ...payload.data, isLoaded: true, isLoading: false });
};

const fetchAltioreFailHandler = () => {
  return new PublicProject({ isLoaded: false, isLoading: false });
};

export const publicAltiore: any = handleActions<S, P>(
  {
    [fetchAltiore.toString()]: fetchAltioreHandler,
    [fetchAltiore.success]: fetchAltioreSuccessHandler,
    [fetchAltiore.fail]: fetchAltioreFailHandler,
  },
  new PublicProject()
);
