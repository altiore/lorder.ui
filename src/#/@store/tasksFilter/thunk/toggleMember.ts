import { showError } from '#/@store/notifications';

import { toggleMemberA } from '../actions';
import { filteredMembers } from '../selectors';

export const toggleMember = (memberId: number) => (dispatch, getState) => {
  const members = filteredMembers(getState()) || [];
  if (members.indexOf(memberId) === -1 && members.length >= 7) {
    dispatch(
      showError({
        message: 'Максимум можно выбрать 7 пользователей!',
      })
    );
  } else {
    dispatch(toggleMemberA(memberId));
  }
};
