import get from 'lodash/get';
import { createSelector } from 'reselect';

import { DownloadList } from '#/@store/@common/entities';

import { IState, IUser } from '@types';

const baseState = (state: IState): DownloadList<IUser> => get(state, ['authorized', 'users']);

export const usersIsLoaded = createSelector(
  [baseState],
  (state: DownloadList): boolean => state.isLoaded
);

export const usersIsLoading = createSelector(
  [baseState],
  (state: DownloadList): boolean => state.isLoading
);

export const userList = createSelector(
  [baseState],
  state => state.list
);

export const findUserById = createSelector(
  [userList],
  (state: IUser[]) => (id: number): IUser | undefined => state.find(el => el.id === id)
);
