// import { createSelector } from 'reselect';

import { IState } from '@types';
import { PublicProject } from './PublicProject';

export const publicProjectData = (state: IState): undefined | PublicProject => state.publicProject;
