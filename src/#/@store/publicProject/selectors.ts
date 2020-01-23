// import { createSelector } from 'reselect';

import { IPublicProject, IState } from '@types';

export const publicProjectData = (state: IState): undefined | IPublicProject => state.publicProject;
