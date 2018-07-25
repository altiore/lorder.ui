import { AxiosResponse } from 'axios';
import { Action, handleActions } from 'redux-actions';

import { DownloadList } from '../@common/entities'
import { fetchUsers } from './actions';
import { User } from './User';

type S = DownloadList<User>;
type P = AxiosResponse;

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

export const users = handleActions<S, P>(
  {
    [fetchUsers.toString()]: fetchUsersHandler,
    [fetchUsers.success]: fetchUsersSuccessHandler,
    [fetchUsers.fail]: fetchUsersFailHandler,
  },
  new DownloadList()
);
