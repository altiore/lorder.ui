import { AxiosResponse } from 'axios';
import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { DownloadList } from '../@common/entities';
import { fetchTaskLogsAction } from './actions';
import { ActiveTask } from './ActiveTask';
import { TaskLog } from './TaskLog';

type S = ActiveTask;
type P = AxiosResponse | any;
type Ac = Action<AxiosResponse>;

const fetchTaskLogsHandler = (state: S): S => {
  return new ActiveTask({
    ...state,
    taskLogs: state.taskLogs.startLoading(),
  });
};

const fetchTaskLogsSuccessHandler = (state: S, { payload }: Ac): S => {
  return new ActiveTask({
    ...state,
    taskLogs: state.taskLogs.finishLoading(payload),
  });
};

const fetchTaskLogsFailHandler = (state: S): S => {
  return new ActiveTask({
    ...state,
    taskLogs: state.taskLogs.stopLoading(),
  });
};

const logOutHandler = () => {
  return new ActiveTask({
    taskLogs: new DownloadList(TaskLog),
  });
};

export const taskActive = handleActions<S, P>(
  {
    [fetchTaskLogsAction.toString()]: fetchTaskLogsHandler,
    [fetchTaskLogsAction.success]: fetchTaskLogsSuccessHandler,
    [fetchTaskLogsAction.fail]: fetchTaskLogsFailHandler,

    [PURGE]: logOutHandler,
  },
  new ActiveTask()
);
