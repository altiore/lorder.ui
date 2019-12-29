import { updateProjectMemberAccessLevel } from '../actions';

export const updateMemberLevel = newLevel => dispatch => {
  console.log('new level is', {
    newLevel,
    updateProjectMemberAccessLevel,
  });
};
