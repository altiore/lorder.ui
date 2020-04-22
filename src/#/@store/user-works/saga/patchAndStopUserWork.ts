import { getProjectById } from '#/@store/projects';
import { patchAndStopUserWork, startTimer, UserWork } from '#/@store/user-works';

import { put, select, takeLatest } from 'redux-saga/effects';

function* patchAndStopUserWorkSuccessHandler({ payload }: any) {
  try {
    const currentUserWork: Partial<UserWork> = payload.data.next;
    if (currentUserWork) {
      const project = (yield select(getProjectById))(currentUserWork.projectId);
      yield put(startTimer(currentUserWork, project) as any);
    }
  } catch (e) {
    throw new Error('patchAndStopUserWorkSuccessHandler.catch Error');
  }
}

export function* patchAndStopUserWorkSuccessSaga() {
  yield takeLatest(patchAndStopUserWork.success, patchAndStopUserWorkSuccessHandler);
}
