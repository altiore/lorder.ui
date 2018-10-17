import { Action, handleActions } from 'redux-actions';
import Timer = NodeJS.Timer;

import { covertSecondsToDuration } from 'src/store/@common/helpers';
import { setCurrentUserTaskId, tickUserTaskTimer } from './actions';

export interface ITimer {
  taskId?: number;
  time: number;
  timer?: Timer;
}
type P = Partial<ITimer>;

const tickUserTaskTimerHandler = (state: ITimer) => {
  const time = state.time + 1;
  document.title = covertSecondsToDuration(time);
  return { ...state, time };
};

const setCurrentUserTaskIdHandler = (state: ITimer, { payload }: Action<Partial<ITimer>>) => {
  if (!payload) {
    throw new Error('Error setCurrentUserTaskIdHandler: payload must not be empty!');
  }
  return { ...state, ...payload };
};

export const timer = handleActions<ITimer, P>(
  {
    [tickUserTaskTimer.toString()]: tickUserTaskTimerHandler,
    [setCurrentUserTaskId.toString()]: setCurrentUserTaskIdHandler,
  },
  {
    taskId: undefined,
    time: 0,
    timer: undefined,
  }
);
