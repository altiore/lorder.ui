import { fetchRoles, rolesIsLoaded } from '#/@store/roles';

import { fetchProjectRoles } from './fetchProjectRoles';

export const fetchProjectMembers = () => async (dispatch, getState) => {
  const isRolesLoaded = rolesIsLoaded(getState());
  if (!isRolesLoaded) {
    await dispatch(fetchRoles());
  }
  await fetchProjectRoles()(dispatch, getState);
};
