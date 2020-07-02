import { postRequestMembershipAction } from '../actions';

export const postRequestMembership = (id: number, role: string) => dispatch => {
  dispatch(postRequestMembershipAction(id, role));
};
