import { LOCATION_CHANGE } from 'connected-react-router';
import { handleActions } from 'redux-actions';

import { History } from 'history';

import getRouter from './getRouter';

const locationChangeHandler = (state: any, { payload }: any) => {
  const { location, action, isFirstRendering } = payload;
  return isFirstRendering
    ? { ...state, location: state.prevLocation || state.location }
    : { ...state, location, action, prevLocation: state.location };
};

export const routerReducer = (history: History): any =>
  handleActions<any, any>(
    {
      [LOCATION_CHANGE]: locationChangeHandler,
    },
    getRouter(history)
  );
