import moment from 'moment';
import { Action, handleActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

import { setCurrentUserWorkId, tickUserWorkTimer } from './actions';
import { Timer } from './Timer';

type P = Partial<Timer>;

const tickUserWorkTimerHandler = (state: Timer) => {
  const time = state.start ? moment().diff(state.start, 'second') : 0;
  return { ...state, time };
};

const setCurrentUserWorkIdHandler = (state: Timer, { payload }: Action<Partial<Timer>>) => {
  if (!payload.projectId || !payload.taskId || !payload.userWorkId || !payload.start || !payload.timer) {
    console.error('Error', payload);
    throw new Error('Error setCurrentUserWorkIdHandler: payload must contain all required data!');
  }
  const time = state.start ? moment().diff(state.start, 'second') : 0;
  return { ...state, ...payload, time };
};

const logOutHandler = (state: Timer) => {
  if (state.timer) {
    clearTimeout(state.timer);
    // changeIco();
    document.title = 'Старт';
  }
  return new Timer();
};

export const timer: any = handleActions<Timer, P>(
  {
    [tickUserWorkTimer.toString()]: tickUserWorkTimerHandler,
    [setCurrentUserWorkId.toString()]: setCurrentUserWorkIdHandler,

    [PURGE]: logOutHandler,
  },
  new Timer()
);
