import { createSelector } from 'reselect';

import { IState, IUser } from '@types';
import { DownloadList } from '../@common/entities';
import { User } from './User';

const baseState = (state: IState) => state.users;

export const usersIsLoaded = createSelector(baseState, (state: DownloadList): boolean => state.isLoaded);

export const usersIsLoading = createSelector(baseState, (state: DownloadList): boolean => state.isLoading);

export const userList = createSelector(baseState, (state: DownloadList<User>): IUser[] => state.list);

export const findUserById = createSelector(userList, (state: User[]) => (id: number): IUser | undefined =>
  state.find(el => el.id === id)
);
