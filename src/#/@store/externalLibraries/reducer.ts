import { handleActions } from 'redux-actions';

import { IExternalLibraries } from '@types';
import { ExternalLibraries } from './ExternalLibraries';

import { initExtLibrariesAction } from './actions';

const initExtLibrariesHandler = (state: IExternalLibraries) => {
  return new ExternalLibraries({
    init: true,
  });
};

export const externalLibraries: any = handleActions<IExternalLibraries>(
  {
    [initExtLibrariesAction.toString()]: initExtLibrariesHandler,
  } as any,
  new ExternalLibraries()
);
