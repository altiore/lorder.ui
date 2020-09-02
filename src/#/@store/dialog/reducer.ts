import { LOCATION_CHANGE } from 'connected-react-router';
import get from 'lodash/get';
import { ActionMeta, handleActions } from 'redux-actions';

import { DialogProps } from '@material-ui/core/Dialog';

import { closeDialog, openDialog } from './actions';
import { Dialog, IDialogState } from './Dialog';

type S = IDialogState;
type P = any;
type M = Partial<DialogProps>;

const closeDialogHandler = (state: S): S => {
  const lastIndex = state.dialogs.length - 1;
  if (lastIndex < 0) {
    return new Dialog();
  }
  return {
    counter: state.counter - 1,
    dialogs: state.dialogs.slice(0, lastIndex),
    lastProps: state.dialogs[lastIndex].dialogProps,
  };
};

const openDialogHandler = (state: S, { payload, meta }: ActionMeta<P, M>): S => {
  if (payload === undefined) {
    return state;
  }

  return new Dialog({
    counter: payload.index,
    dialogs: [
      ...state.dialogs,
      {
        dialogProps: meta,
        isOpened: true,
        props: payload.props,
      },
    ],
  });
};

const locationChangeHandler = (state: S, { payload }: any) => {
  const { location } = payload;
  const isModal = get(location, 'state.modal');
  const length = state?.dialogs?.length;
  if (length && state.dialogs[length - 1].isOpened && !isModal) {
    return new Dialog();
  }
  return state;
};

export const dialog = handleActions<S, P, M>(
  {
    [closeDialog.toString()]: closeDialogHandler,
    [openDialog.toString()]: openDialogHandler,

    [LOCATION_CHANGE]: locationChangeHandler,
  },
  new Dialog()
) as any;
