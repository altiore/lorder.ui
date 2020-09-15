import { isTimerStarted } from '#/@store/timer';

import { getUserWorksAct } from '../actions';
import { UserWork } from '../UserWork';
import { startTimer, stopUserWork } from './actionUserWork';

export const fetchUserWorks = () => async (dispatch: any, getState: any) => {
  try {
    const res = await dispatch(getUserWorksAct());
    const userWorkList = res?.payload?.data;
    const currentUserWork: Partial<UserWork> | undefined =
      userWorkList && userWorkList.find((userWork: UserWork) => !userWork.finishAt);
    if (currentUserWork) {
      dispatch(startTimer(currentUserWork));
    } else {
      if (isTimerStarted(getState())) {
        dispatch(stopUserWork());
      }
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.log(e);
    }
  }
};
