import { handleActions } from 'redux-actions';

import { IExternalLibraries } from '@types';
import { ExternalLibraries } from './ExternalLibraries';

import { initExtLibrariesAction } from './actions';

const initExtLibrariesHandler = (state: IExternalLibraries) => {
  return new ExternalLibraries({
    init: true,
  });
};

export const externalLibraries = handleActions<IExternalLibraries>(
  {
    [initExtLibrariesAction.toString()]: initExtLibrariesHandler,
  } as any,
  new ExternalLibraries()
);
