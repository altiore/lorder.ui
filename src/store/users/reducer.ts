import { AxiosResponse } from 'axios';
import { Action, ActionMeta, handleActions } from 'redux-actions';

import { IMeta } from 'src/@types';
import { DownloadList } from '../@common/entities';
import { deleteUser, fetchUsers, patchUser } from './actions';
import { User } from './User';

type S = DownloadList<User>;
interface IU {
  userId: number;
  role: string;
}
type P = AxiosResponse | IU;
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

const patchUserHandler = (state: S, { payload }: Action<P>): any => {
  const index = state.list.findIndex(el => el.id === (payload as IU).userId);
  return new DownloadList({
    ...state,
    list: [
      ...state.list.slice(0, index),
      new User({
        ...state.list[index],
        role: (payload as IU).role,
      }),
      ...state.list.slice(index + 1),
    ],
  });
};

export const users = handleActions<S, P, M>(
  {
    [fetchUsers.toString()]: fetchUsersHandler,
    [fetchUsers.success]: fetchUsersSuccessHandler,
    [fetchUsers.fail]: fetchUsersFailHandler,
    [deleteUser.toString()]: deleteUserHandler,
    [deleteUser.success]: deleteUserSuccessHandler,
    [patchUser.toString()]: patchUserHandler,
  },
  new DownloadList()
);
