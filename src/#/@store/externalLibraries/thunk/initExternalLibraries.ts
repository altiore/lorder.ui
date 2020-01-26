import { initExtLibrariesAction } from '../actions';
import initSentry from './sentry';

export const initExternalLibraries = () => dispatch => {
  dispatch(initExtLibrariesAction());
  // TODO: put param here in order be able translate Report modal
  initSentry();
};
