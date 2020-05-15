import { put, select, takeLatest } from 'redux-saga/effects';

import { isTimerStarted } from '#/@store/timer';
import { startTimer, stopUserWork, UserWork } from '#/@store/user-works';

import { getUserWorks } from '../actions';

function* getUserWorksSuccessHandler({ payload }: any) {
  try {
    const userWorkList = payload.data;
    const currentUserWork: Partial<UserWork> | undefined = userWorkList.find(
      (userWork: UserWork) => !userWork.finishAt
    );
    if (currentUserWork) {
      yield put(startTimer(currentUserWork) as any);
    } else {
      if (yield select(isTimerStarted)) {
        yield put(stopUserWork() as any);
      }
    }
  } catch (e) {
    throw new Error('getUserWorksSuccessHandler.catch Error');
  }
}

export function* getUserWorksSuccessSaga() {
  yield takeLatest(getUserWorks.success, getUserWorksSuccessHandler);
}
