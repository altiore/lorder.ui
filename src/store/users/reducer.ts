import { AxiosResponse } from 'axios';
import { Action, ActionMeta, handleActions } from 'redux-actions';

import { IMeta } from 'src/@types';
import { DownloadList } from '../@common/entities';
import { deleteUser, fetchUsers } from './actions';
import { User } from './User';

type S = DownloadList<User>;
type P = AxiosResponse;
type M = IMeta<{ userId: number }>;

const fetchUsersHandler = (state: S): S => {
  return new DownloadList({
    ...state,
    isLoading: true,
  });
};

const fetchUsersSuccessHandler = (state: S, { payload }: Action<AxiosResponse>): S => {
  return new DownloadList({
    ...state,
    isLoaded: true,
    isLoading: false,
    list: payload && payload.data && payload.data.map((el: any) => new User(el)),
  });
};

const fetchUsersFailHandler = (state: S): S => {
  return new DownloadList();
};

const deleteUserHandler = (state: S): S => {
  return state;
};

const deleteUserSuccessHandler = (state: S, { meta }: ActionMeta<P, M>) => {
  const index = state.list.findIndex(el => el.id === meta.previousAction.payload.userId);
  return new DownloadList({
    ...state,
    list: [...state.list.slice(0, index), ...state.list.slice(index + 1)],
  });
};

export const users = handleActions<S, P, M>(
  {
    [fetchUsers.toString()]: fetchUsersHandler,
    [fetchUsers.success]: fetchUsersSuccessHandler,
    [fetchUsers.fail]: fetchUsersFailHandler,
    [deleteUser.toString()]: deleteUserHandler,
    [deleteUser.success]: deleteUserSuccessHandler,
  },
  new DownloadList()
);
