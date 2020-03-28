import { Action, ActionMeta, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { DownloadList } from '#/@store/@common/entities';

import { AxiosResponse } from 'axios';

import { deleteUser, fetchUsers, patchUser } from './actions';
import { User } from './User';

import { IDownloadList, IMeta, IUser } from '@types';

type S = IDownloadList<IUser>;
interface IU {
  user: IUser;
  role: string;
}
type P = AxiosResponse | IU;
type M = IMeta<{ userId: number; user: IUser; role: string }>;

const fetchUsersHandler = (state: S): S => {
  return new DownloadList(User, {
    ...state,
    isLoading: true,
  });
};

const fetchUsersSuccessHandler = (state: S, { payload }: Action<AxiosResponse>): S => {
  return new DownloadList(User, {
    ...state,
    isLoaded: true,
    isLoading: false,
    list: payload && payload.data && payload.data.map((el: any) => new User(el)),
  });
};

const fetchUsersFailHandler = (state: S): S => {
  return new DownloadList(User);
};

const deleteUserHandler = (state: S): S => {
  return state;
};

const deleteUserSuccessHandler = (state: S, { meta }: ActionMeta<P, M>) => {
  const index = state.list.findIndex(el => el.id === meta.previousAction.payload.userId);
  return new DownloadList(User, {
    ...state,
    list: [...state.list.slice(0, index), ...state.list.slice(index + 1)],
  });
};

const patchUserHandler = (state: S, { payload }: Action<P>): any => {
  const index = state.list.findIndex(el => el.id === (payload as IU).user.id);
  return new DownloadList(User, {
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

const patchUserFailHandler = (state: S, { meta }: ActionMeta<P, M>) => {
  const index = state.list.findIndex(el => el.id === meta.previousAction.payload.user.id);
  return new DownloadList(User, {
    ...state,
    list: [
      ...state.list.slice(0, index),
      new User({
        ...state.list[index],
        role: meta.previousAction.payload.user.role,
      }),
      ...state.list.slice(index + 1),
    ],
  });
};

const logOutHandler = () => {
  return new DownloadList(User);
};

export const users = handleActions<S, any, any>(
  {
    [fetchUsers.toString()]: fetchUsersHandler,
    [fetchUsers.success]: fetchUsersSuccessHandler,
    [fetchUsers.fail]: fetchUsersFailHandler,
    [deleteUser.toString()]: deleteUserHandler,
    [deleteUser.success]: deleteUserSuccessHandler,
    [patchUser.toString()]: patchUserHandler,
    [patchUser.fail]: patchUserFailHandler,

    [PURGE]: logOutHandler,
  },
  new DownloadList(User)
);
