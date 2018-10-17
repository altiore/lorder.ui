import { Action, handleActions } from 'redux-actions';

import { selectProject } from './actions';

interface IS {
  selected?: number;
}
type P = number;

const selectProjectHandler = (state: IS, { payload }: Action<P>) => {
  return { selected: payload };
};

export const project = handleActions<IS, P>(
  {
    [selectProject.toString()]: selectProjectHandler,
  },
  {
    selected: undefined,
  }
);
