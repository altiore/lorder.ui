import { createSelector } from 'reselect';

import { DownloadList } from '../@common/entities';
import { IState } from '../rootReducer';
import { User } from './User';

const baseState = (state: IState) => state.users;

export const usersIsLoaded = createSelector(baseState, (state: DownloadList): boolean => state.isLoaded);

export const usersIsLoading = createSelector(baseState, (state: DownloadList): boolean => state.isLoading);

export const userList = createSelector(baseState, (state: DownloadList<User>): User[] => state.list);

export const findUserById = createSelector(userList, (state: User[]) => (id: number) =>
  state && state.find(el => el.id === id)
);
