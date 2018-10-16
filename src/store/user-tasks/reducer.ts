import { AxiosResponse } from 'axios';
import { handleActions } from 'redux-actions';

import { DownloadList } from '../@common/entities';
import { IRequestAction } from '../@common/requestActions';
import { startUserTask } from './actions';
import { UserTask } from './UserTask';

type S = DownloadList<UserTask>;
type ProjectRequest = IRequestAction<Partial<UserTask>>;
type P = ProjectRequest | AxiosResponse;

const startUserTaskHandler = (state: S) => {
  return state.stopLoading();
};

export const userTasks = handleActions<S, P>(
  {
    [startUserTask.toString()]: startUserTaskHandler,
  },
  new DownloadList(UserTask)
);
