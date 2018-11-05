import get from 'lodash-es/get';
import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { changeIco, covertSecondsToDurationWithLocal } from 'src/store/@common/helpers';
import { setCurrentUserWorkId, tickUserWorkTimer } from './actions';
import { Timer } from './Timer';

type P = Partial<Timer>;

const tickUserWorkTimerHandler = (state: Timer, { payload }: Action<Partial<Timer>>) => {
  const time = state.time + 1;
  document.title =
    covertSecondsToDurationWithLocal(time) +
    ` | ${get(payload, 'project.title')} - ${get(payload, 'task.title') ||
      get(payload, 'userWork.task.title') ||
      get(payload, 'userWork.description') ||
      '...'}`;
  return { ...state, time };
};

const setCurrentUserWorkIdHandler = (state: Timer, { payload }: Action<Partial<Timer>>) => {
  if (!payload) {
    throw new Error('Error setCurrentUserWorkIdHandler: payload must not be empty!');
  }
  return { ...state, ...payload };
};

const logOutHandler = (state: Timer) => {
  if (state.timer) {
    clearTimeout(state.timer);
    changeIco();
    document.title = 'Старт';
  }
  return new Timer();
};

export const timer = handleActions<Timer, P>(
  {
    [tickUserWorkTimer.toString()]: tickUserWorkTimerHandler,
    [setCurrentUserWorkId.toString()]: setCurrentUserWorkIdHandler,

    [PURGE]: logOutHandler,
  },
  new Timer()
);
