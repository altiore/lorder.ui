import { createSelector } from 'reselect';

import { IState } from 'src/@types';
import { DownloadList } from '../@common/entities';
import { IUserTask } from './UserTask';

const baseState = (state: IState) => state.userTasks;

export const allUserTasks = createSelector(
  baseState,
  (userTasks: DownloadList<IUserTask>): IUserTask[] => userTasks.list
);
