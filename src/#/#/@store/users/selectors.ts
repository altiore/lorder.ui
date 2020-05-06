import get from 'lodash/get';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { DownloadList } from '#/@store/@common/entities';

import { IState, IUser } from '@types';

const baseState = (state: IState): DownloadList<IUser> => get(state, ['authorized', 'users']);

export const usersIsLoaded = createDeepEqualSelector([baseState], (state: DownloadList): boolean => state.isLoaded);

export const usersIsLoading = createDeepEqualSelector([baseState], (state: DownloadList): boolean => state.isLoading);

export const userList = createDeepEqualSelector([baseState], state => state.list);

export const findUserById = createDeepEqualSelector([userList], (state: IUser[]) => (id: number): IUser | undefined =>
  state.find(el => el.id === id)
);
