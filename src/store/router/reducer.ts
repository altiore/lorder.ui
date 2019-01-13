import { LOCATION_CHANGE } from 'connected-react-router';
import { History } from 'history';
import get from 'lodash-es/get';
import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist';

import { closeDialog } from 'src/store/dialog';

const rehydrateHandler = (state: any, { payload }: any) => {
  const isModal = get(payload, 'router.location.state.modal');
  if (isModal) {
    return { ...state, location: { ...state.location, state: undefined } };
  }
  return state;
};

const locationChangeHandler = (state: any, { payload }: any) => {
  const { location, action, isFirstRendering } = payload;
  const isModal = get(location, 'state.modal');
  if (isModal) {
    // MUST BE MUTATION HERE, because of this is the history object
    location.pathname = state.location.pathname;
  }
  return isFirstRendering
    ? { ...state, location: state.prevLocation || state.location }
    : { ...state, location, action, prevLocation: state.location };
};

const closeDialogHandler = (state: any, { payload }: any) => {
  if (get(state, 'location.state.modal')) {
    const location = {
      ...state.location,
      state: undefined,
    };
    return { ...state, location };
  }
  return state;
};

export const routerReducer = (history: History) =>
  handleActions<any, any>(
    {
      [REHYDRATE]: rehydrateHandler,
      [LOCATION_CHANGE]: locationChangeHandler,
      [closeDialog.toString()]: closeDialogHandler,
    },
    {
      action: history.action,
      location: history.location,
    }
  );
