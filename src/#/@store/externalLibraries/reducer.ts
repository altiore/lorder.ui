import { handleActions } from 'redux-actions';

import { initExtLibrariesAction } from './actions';
import { ExternalLibraries } from './ExternalLibraries';

import { IExternalLibraries } from '@types';

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
