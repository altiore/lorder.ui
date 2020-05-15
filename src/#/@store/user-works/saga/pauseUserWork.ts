import { put, takeLatest } from 'redux-saga/effects';

import { pauseUserWork, startTimer, UserWork } from '#/@store/user-works';

function* pauseUserWorkSuccessHandler({ payload }: any) {
  try {
    const nextUserWork: Partial<UserWork> = payload.data.next;
    const prevUserWork: Partial<UserWork> = payload.data.previous;
    if (nextUserWork && prevUserWork) {
      yield put(startTimer(nextUserWork) as any);
    }
  } catch (e) {
    throw new Error('pauseUserWorkSuccessHandler.catch Error');
  }
}

export function* pauseUserWorkSuccessSaga() {
  yield takeLatest(pauseUserWork.success, pauseUserWorkSuccessHandler);
}
