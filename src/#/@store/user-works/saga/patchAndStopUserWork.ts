import { put, takeLatest } from 'redux-saga/effects';

import { patchAndStopUserWork, startTimer, UserWork } from '#/@store/user-works';

function* patchAndStopUserWorkSuccessHandler({ payload }: any) {
  try {
    const nextUserWork: Partial<UserWork> = payload.data.next;
    if (nextUserWork) {
      yield put(startTimer(nextUserWork) as any);
    }
  } catch (e) {
    throw new Error('patchAndStopUserWorkSuccessHandler.catch Error');
  }
}

export function* patchAndStopUserWorkSuccessSaga() {
  yield takeLatest(patchAndStopUserWork.success, patchAndStopUserWorkSuccessHandler);
}
