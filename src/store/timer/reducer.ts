import { Action, handleActions } from 'redux-actions';
import Timer = NodeJS.Timer;

import { covertSecondsToDuration } from 'src/store/@common/helpers';
import { setCurrentUserWorkId, tickUserWorkTimer } from './actions';

export interface ITimer {
  taskId?: number | string;
  time: number;
  timer?: Timer;
}
type P = Partial<ITimer>;

const tickUserWorkTimerHandler = (state: ITimer) => {
  const time = state.time + 1;
  document.title = covertSecondsToDuration(time);
  return { ...state, time };
};

const setCurrentUserWorkIdHandler = (state: ITimer, { payload }: Action<Partial<ITimer>>) => {
  if (!payload) {
    throw new Error('Error setCurrentUserWorkIdHandler: payload must not be empty!');
  }
  return { ...state, ...payload };
};

export const timer = handleActions<ITimer, P>(
  {
    [tickUserWorkTimer.toString()]: tickUserWorkTimerHandler,
    [setCurrentUserWorkId.toString()]: setCurrentUserWorkIdHandler,
  },
  {
    taskId: undefined,
    time: 0,
    timer: undefined,
  }
);
